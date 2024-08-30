import { CommonEventFunction, Picker, Text, View } from '@tarojs/components';
import { PickerDateProps } from '@tarojs/components/types/Picker';
import { atMessage, getCurrentInstance } from '@tarojs/taro';
import classNames from 'classnames';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { intersection, unionBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AtMessage } from 'taro-ui';

import Empty from '@/components/empty';
import Icon from '@/components/icon';
import TagSelect from '@/components/tagSelect';
import * as attendanceService from '@/services/attendance';
import * as collaborationRecordService from '@/services/collaborationRecord';
import { useLoading, useRequest } from '@/utils/hooks';

import Card from '../card';
import BubbleCard from './bubbleCard';
import styles from './index.module.less';

export type DataType = 'year' | 'month';
const genCalendarLabel = (): Record<DataType, string> => ({
  month: t('月视图'),
  year: t('年视图'),
});
const Timeline = () => {
  const calendarLabel = genCalendarLabel();
  const { dateString, tableId } = getCurrentInstance().router?.params || {};
  const { getList } = tableId ? collaborationRecordService : attendanceService;
  const [tabCurrent, setTabCurrent] = useState<'tab1' | 'tab2'>('tab1');
  const [pickerValue, setPickerValue] = useState(
    dayjs(dateString).format('YYYY/MM')
  );
  const [calendarType, setCalendarType] = useState<DataType>('month');
  const [pY, pM] = pickerValue.split('/').map(Number);
  const [category, setCategory] = useState<string[]>([]);
  const [detailInfo, setDetailInfo] = useState<{
    ids: string[];
    open: boolean;
  }>({ ids: [], open: false });

  const {
    data: list = [],
    run: getListAsync,
    loading,
  } = useRequest(getList, {
    manual: true,
  });

  const names = useMemo(() => [...new Set(list.map((v) => v.name))], [list]);

  const pickChange: CommonEventFunction<PickerDateProps.ChangeEventDetail> = (
    e
  ) => {
    const [y, m = pM] = e.detail.value.split('-');

    setPickerValue(`${y}/${m}`);
  };

  const changeDate = (type: 'add' | 'subtract') => {
    if (type === 'add') {
      setPickerValue(dayjs(pickerValue).add(1, calendarType).format('YYYY/MM'));
    } else {
      setPickerValue(
        dayjs(pickerValue).subtract(1, calendarType).format('YYYY/MM')
      );
    }
  };

  const getData = useCallback(() => {
    const queryDay = dayjs(`${pY}-${pM}`);

    if (calendarType === 'year') {
      getListAsync(
        Object.assign(
          {
            startDate: +queryDay.startOf('year').format('YYYYMMDD'),
            endDate: +queryDay.endOf('year').format('YYYYMMDD'),
          },
          tableId ? { tableId } : {}
        )
      );
    } else {
      getListAsync(
        Object.assign(
          {
            startDate: +queryDay.startOf('month').format('YYYYMMDD'),
            endDate: +queryDay.endOf('month').format('YYYYMMDD'),
          },
          tableId ? { tableId } : {}
        )
      );
    }
  }, [calendarType, getListAsync, pM, pY, tableId]);

  const genBlockView = () => {
    if (category.length === 0 || names.length === 0) {
      return <Empty className={styles.empty} />;
    }
    if (tabCurrent === 'tab1') {
      return intersection(category, names).map((name) => {
        const dataNameList = list.filter((v) => v.name === name);
        const dataDayCount = unionBy(dataNameList, 'date').length;

        return (
          <View className={styles.nameBolck} key={name}>
            <View className={styles.bolckTitle}>
              <View className={styles.n}>{name}</View>
              <View
                className={styles.subN}
              >{t('{{dataDayCount}} 天共 {{recordCount}} 条记录', { dataDayCount, recordCount: dataNameList.length })}</View>
            </View>
            {Array.from(Array(12).keys()).map((mon) => {
              if (calendarType === 'month' && mon + 1 !== pM) {
                return null;
              }
              const dayCount = dayjs(`${pY}/${mon + 1}/01`).daysInMonth();

              return (
                <View
                  className={classNames(styles.month, {
                    [styles.yearMonth]: calendarType === 'year',
                  })}
                  key={mon}
                >
                  {Array.from(Array(31).keys()).map((d) => {
                    const cDay = dayjs(`${pY}/${mon + 1}/${d + 1}`);
                    const dayOfWeek = cDay.day();

                    const dataList = dataNameList.filter((v) => {
                      return `${v.date}` === cDay.format('YYYYMMDD');
                    });
                    let bg = '#dddddd';

                    if (d + 1 > dayCount) {
                      bg = '#fff';
                    } else if (dayOfWeek === 0 || dayOfWeek === 6) {
                      bg = '#eeeeee';
                    }
                    if (dataList.length === 1) {
                      bg = '#67d3cf';
                    } else if (dataList.length === 2) {
                      bg = '#3f827f';
                    } else if (dataList.length > 2) {
                      bg = '#1f3f3e';
                    }

                    return (
                      <View
                        key={d}
                        className={styles.day}
                        onClick={() => {
                          if (dataList.length > 0) {
                            setDetailInfo({
                              open: true,
                              ids: dataList.map((v) => v._id),
                            });
                          }
                        }}
                      >
                        <View
                          className={styles.dayInner}
                          style={{ background: bg }}
                        >
                          {calendarType === 'month' ? d + 1 : ''}
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        );
      });
    } else {
      return list
        .filter((item) => category.includes(item.name))
        .map((item, index) => (
          <BubbleCard
            key={item._id}
            value={item}
            direction={index % 2 === 0 ? 'left' : 'right'}
            onClick={() =>
              setDetailInfo({
                open: true,
                ids: [item._id],
              })
            }
          />
        ));
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (calendarType === 'year') {
      setCategory((prev) => {
        return prev.length ? prev.slice(0, 4) : names.slice(0, 1);
      });
    } else {
      setCategory((prev) => {
        const nextV = intersection(prev, names);

        return nextV.length ? nextV : names.slice(0, 1);
      });
    }
  }, [calendarType, names]);

  useLoading(loading);

  return (
    <>
      <AtMessage />
      <View className={styles.container}>
        <View className={styles.header}>
          <View className={styles.operate}>
            <Picker
              className={styles.typeSwitch}
              mode="selector"
              range={Object.values(calendarLabel)}
              value={Object.keys(calendarLabel).indexOf(calendarType)}
              onChange={(e) =>
                setCalendarType(Object.keys(calendarLabel)[e.detail.value])
              }
            >
              <Text className={styles.text}>{calendarLabel[calendarType]}</Text>
              <Icon value="bullet-list" size={18} className={styles.icon} />
            </Picker>
            <View className={styles.dateSwitch}>
              <Icon
                value="prev"
                className={styles.button}
                onClick={() => changeDate('subtract')}
              />
              <Picker
                mode="date"
                fields={calendarType}
                value={pickerValue.split('/').join('-')}
                onChange={pickChange}
              >
                <View className={styles.date}>
                {i18next.language === 'zh' ? `${pY} 年 ${calendarType === 'month' ? ` ${pM} 月` : ''}` : `${calendarType === 'month' ? `${pM} / ${pY} ` : pY}`}
                </View>
              </Picker>
              <Icon
                value="next"
                className={styles.button}
                onClick={() => changeDate('add')}
              />
            </View>
          </View>
          <TagSelect
            className={styles.tagSelect}
            title={t('点击记录名称筛选查询')}
            disabledEdit
            options={names.map((v) => ({ label: v, value: v }))}
            value={category}
            onClick={(v) => {
              const label = v?.label || '';

              setCategory((prev) => {
                const nextV = prev.includes(label)
                  ? prev.filter((i) => i !== label)
                  : [...prev, label];

                if (
                  tabCurrent === 'tab1' &&
                  calendarType === 'year' &&
                  nextV.length > 4
                ) {
                  atMessage({
                    message: t('年视图下最多同时选中4个选项'),
                    type: 'warning',
                  });
                  return prev;
                } else {
                  return nextV;
                }
              });
            }}
          />
        </View>
        <View className={styles.tabs}>
          <View
            className={classNames(styles.tab, {
              [styles.active]: tabCurrent === 'tab1',
            })}
            onClick={() => {
              setTabCurrent('tab1');
              setCategory((prev) => prev.slice(0, 4));
            }}
          >
            {t('热力图')}
          </View>
          <View
            className={classNames(styles.tab, {
              [styles.active]: tabCurrent === 'tab2',
            })}
            onClick={() => setTabCurrent('tab2')}
          >
            {t('时间线')}
          </View>
        </View>
        <View className={styles.content}>{genBlockView()}</View>
      </View>
      {detailInfo.open && (
        <View
          className={styles.modal}
          onClick={() => setDetailInfo({ ids: [], open: false })}
        >
          <View
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <View className={styles.title}>{t('数据详情')}</View>
            <View className={styles.body}>
              {list
                .filter((v) => detailInfo.ids.includes(v._id))
                .map((v) => (
                  <Card key={v._id} value={v} />
                ))}
            </View>
          </View>
          <View className={styles.footer}>
            <Icon value="close-circle" className={styles.close} size={48} />
          </View>
        </View>
      )}
    </>
  );
};

export default Timeline;
