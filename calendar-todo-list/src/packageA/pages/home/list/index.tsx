import { Text, View } from '@tarojs/components';
import { getCurrentInstance, navigateTo, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { round, sum } from 'lodash';
import { useState } from 'react';
import { AtButton } from 'taro-ui';

import Action from '@/components/action';
import Empty from '@/components/empty';
import Icon from '@/components/icon';
import { Pages } from '@/constant';
import * as attendanceService from '@/services/attendance';
import * as collaborationRecordService from '@/services/collaborationRecord';
import { getItem as getTableInfo } from '@/services/collaborationTable';
import { getShareAttendanceMap } from '@/store/dictionary';
import { getDate, truncateString } from '@/utils/common';
import {
  useAppDispatch,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import PieChart from '../../../components/pieChart';
import Card from '../card';
import styles from './index.module.less';

const List = () => {
  const dispatch = useAppDispatch();
  const { dateString, tableId } = getCurrentInstance().router?.params || {};
  const { dateNum, title } = getDate(dateString);
  const [showChart, setShowChart] = useState(false); // 是否展示图表
  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });

  const { deleteItem, getList } = tableId
    ? collaborationRecordService
    : attendanceService;

  const {
    data: list = [],
    loading,
    run,
  } = useRequest(getList, { manual: true });

  const { data: tableInfo, run: getTableInfoAsync } = useRequest(getTableInfo, {
    manual: true,
  });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      run(Object.assign({ date: dateNum }, tableId ? { tableId } : {}));
    },
  });

  const onEdit = () => {
    const hasTableId = tableId ? `&tableId=${tableId}` : '';

    navigateTo({
      url: `${Pages.attendanceEditPage}?dateString=${dateString}&id=${deleteInfo.id}${hasTableId}`,
    });
    setDeleteInfo({ isOpened: false, id: '', name: '' });
  };

  const addRecord = () => {
    const hasTableId = tableId ? `&tableId=${tableId}` : '';

    navigateTo({
      url: `${Pages.attendanceEditPage}?dateString=${dateString}${hasTableId}`,
    });
  };

  const calcData = () => {
    const durationList = list.map((item) => {
      const startTime = `${item.beginDate} ${item.beginTime}`.trim() || 0;
      const endTime = `${item.endDate} ${item.endTime}`.trim() || 0;
      const duration = Math.abs(dayjs(endTime).diff(startTime, 'minutes'));

      return {
        ...item,
        duration,
      };
    });
    const names = [...new Set(list.map((item) => item.name))];

    const result = names.map((name) => {
      const nameList = durationList.filter((v) => v.name === name);
      const numSum = round(
        nameList.reduce((prev, v) => prev + Number(v.num ?? 0), 0),
        2
      );
      const durations = round(
        nameList.reduce((prev, v) => prev + Number(v.duration ?? 0), 0),
        2
      );
      const income = round(
        nameList.reduce((prev, v) => prev + Number(v.income ?? 0), 0),
        2
      );
      const outlay = round(
        nameList.reduce((prev, v) => prev + Number(v.outlay ?? 0), 0),
        2
      );

      return {
        name: truncateString(name, 12),
        count: nameList.length,
        numSum,
        durations,
        income,
        outlay,
      };
    });

    return {
      durations: result
        .filter((v) => v.durations)
        .map((v) => {
          return {
            name: v.name,
            value: v.durations,
          };
        }),
      numSum: result
        .filter((v) => v.numSum)
        .map((v) => {
          return {
            name: v.name,
            value: v.numSum,
          };
        }),
      income: result
        .filter((v) => v.income)
        .map((v) => {
          return {
            name: v.name,
            value: v.income,
          };
        }),
      outlay: result
        .filter((v) => v.outlay)
        .map((v) => {
          return {
            name: v.name,
            value: v.outlay,
          };
        }),
    };
  };

  useDidShow(() => {
    if (tableId) {
      run(Object.assign({ date: dateNum }, tableId ? { tableId } : {}));
      getTableInfoAsync(tableId);
    } else {
      dispatch(getShareAttendanceMap());
      run({ date: dateNum });
    }
  });
  useLoading(loading || deleteLoading);
  const [income, outlay] = list.reduce(
    (prev, curr) => [
      prev[0] + Number(curr.income || 0),
      prev[1] + Number(curr.outlay || 0),
    ],
    [0, 0]
  );

  const chartData = calcData();
  const hasChart =
    chartData.durations.length +
    chartData.numSum.length +
    chartData.income.length +
    chartData.outlay.length >
    0;

  return (
    <>
      <View
        className={styles.head}
        style={{
          position: showChart ? 'initial' : 'sticky',
          justifyContent: hasChart ? 'space-between' : 'center',
        }}
      >
        {title}
        {hasChart && (
          <View
            className={styles.operate}
            onClick={() => setShowChart((v) => !v)}
          >
            {t('统计分析')}
            <Icon type="tongjifenxi" className={styles.icon} size={18} />
          </View>
        )}
      </View>
      <View className={styles.content}>
        {(income !== 0 || outlay !== 0) && (
          <View className={styles.money}>
            <Text className={styles.income}>{t('收入')}：{round(income, 2)}</Text>
            <Text className={styles.sign}>-</Text>
            <Text className={styles.outlay}>{t('支出')}：{round(outlay, 2)}</Text>
            <Text className={styles.sign}>=</Text>
            <Text
              className={income - outlay > 0 ? styles.income : styles.outlay}
            >
              {round(income - outlay, 2)}
            </Text>
          </View>
        )}
        {showChart && (
          <>
            {chartData.durations.length > 0 && (
              <View className={styles.pieChart}>
                <PieChart
                  title={`${t('时长统计')}（${round(
                    sum(chartData.durations.map((c) => c.value))
                  )}${t('分钟')}）`}
                  id="durations"
                  data={chartData.durations}
                />
              </View>
            )}
            {chartData.numSum.length > 0 && (
              <View className={styles.pieChart}>
                <PieChart
                  title={`${t('数值统计')}（${round(
                    sum(chartData.numSum.map((c) => c.value)),
                    2
                  )}）`}
                  id="numSum"
                  data={chartData.numSum}
                />
              </View>
            )}
            {chartData.income.length > 0 && (
              <View className={styles.pieChart}>
                <PieChart
                  title={`${t('收入统计')}（${t('￥')}${round(
                    sum(chartData.income.map((c) => c.value)),
                    2
                  )}）`}
                  id="income"
                  data={chartData.income}
                />
              </View>
            )}
            {chartData.outlay.length > 0 && (
              <View className={styles.pieChart}>
                <PieChart
                  title={`${t('支出统计')}（${t('￥')}${round(
                    sum(chartData.outlay.map((c) => c.value)),
                    2
                  )}）`}
                  id="outlay"
                  data={chartData.outlay}
                />
              </View>
            )}
          </>
        )}
        {list.map((item) => (
          <Card
            key={item._id}
            value={item}
            onDelete={(v) => {
              setDeleteInfo({
                isOpened: true,
                id: v._id,
                name: v.name,
              });
            }}
            tableInfo={tableInfo}
          />
        ))}
        {!list.length && <Empty className={styles.empty} />}
      </View>
      <View
        className={styles.footer}
        style={{ position: showChart ? 'initial' : 'sticky' }}
      >
        <AtButton type="primary" onClick={addRecord}>
          {t('添加记录')}
        </AtButton>
      </View>
      <Action
        preTitle={t('记录')}
        title={deleteInfo.name}
        isOpened={deleteInfo.isOpened}
        onClose={() => setDeleteInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => {
          deleteAsync(
            deleteInfo.id,
            list.find((v) => v._id === deleteInfo.id)?.date as number
          );
        }}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
    </>
  );
};

export default List;
