import 'dayjs/locale/zh-cn';

import { View } from '@tarojs/components';
import Taro, {
  atMessage,
  downloadFile,
  getCurrentInstance,
  getStorageSync,
} from '@tarojs/taro';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { round, sum } from 'lodash';
import { stringify } from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { AtInput, AtMessage } from 'taro-ui';
import { HomeRecord } from 'types';

import Icon from '@/components/icon';
import Select from '@/components/select';
import Switch from '@/components/switch';
import { ServerUrl } from '@/constant';
import { getList } from '@/services/attendance';
import { getList as getCollaborationList } from '@/services/collaborationRecord';
import { showDateLabel, uuid } from '@/utils/common';
import { useAppSelector, useRequest } from '@/utils/hooks';

import LineChart from '../../components/lineChart';
import CountTable, { genViewTypeOption } from './countTable';
import styles from './index.module.less';

dayjs.locale('zh-cn');

type TCycle = 'year' | 'month' | 'week' | 'other';


const HomeStatistics = () => {
  const cycleOptions: { key: TCycle; label: string }[] = [
    { key: 'week', label: t('周') },
    { key: 'month', label: t('月') },
    { key: 'year', label: t('年') },
  ];
  const viewTypeOption = genViewTypeOption();
  const { userInfo } = useAppSelector((state) => state.app);

  dayjs.locale(userInfo?.isDayOfTheSun ? 'en' : 'zh-cn');
  const {
    tableId = '',
    year,
    month,
    type,
  } = getCurrentInstance().router?.params || {};
  const [search, setSearch] = useState('');
  const [option, setOption] = useState<{ start: string; end: string }>();
  const [viewType, setViewType] = useState(0);
  const [cycle, setCycle] = useState<TCycle>('other');
  const [isList, setIsList] = useState(false); // 是否列表展示统计图
  const [modalOptions, setModalOptions] = useState<
    Partial<{
      name: string;
      count: number;
      num: number;
      duration: string;
      money: number;
      isSummary: boolean; // 是否点击的是汇总
    }>
  >();

  const { data: list = [], run: getListAsync } = useRequest(
    tableId
      ? (req: Omit<Parameters<typeof getList>[0], 'tableId'>) =>
        getCollaborationList({ ...req, tableId: tableId })
      : getList,
    {
      manual: true,
    }
  );

  const getData = useCallback(() => {
    if (option) {
      getListAsync({
        startDate: +dayjs(option.start).format('YYYYMMDD'),
        endDate: +dayjs(option.end).format('YYYYMMDD'),
      });
    }
  }, [getListAsync, option]);

  const calcData = (values: HomeRecord[]) => {
    const durationList = list.map((item) => {
      const startTime = `${item.beginDate} ${item.beginTime}`.trim() || 0;
      const endTime = `${item.endDate} ${item.endTime}`.trim() || 0;
      const duration = Math.abs(dayjs(endTime).diff(startTime, 'minutes'));

      return {
        ...item,
        duration,
      };
    });
    const names = [...new Set(values.map((item) => item.name))].sort((a, b) => {
      return a.localeCompare(b);
    });
    const dates = Array.from(new Set(list.map((item) => item.date))).sort(
      (a, b) => a - b
    );

    return {
      table: names.map((name) => {
        const nameList = durationList.filter((v) => v.name === name);
        const numSum = round(
          nameList.reduce((prev, v) => prev + Number(v.num ?? 0), 0),
          2
        );
        const durations = round(
          nameList.reduce((prev, v) => prev + Number(v.duration ?? 0), 0),
          2
        );
        const money = round(
          nameList.reduce(
            (prev, v) => prev + Number(v.income ?? 0) - Number(v.outlay ?? 0),
            0
          ),
          2
        );

        return {
          id: uuid(),
          name,
          count: nameList.length,
          numSum,
          durations,
          money,
        };
      }),
      numLines: names
        .map((name) => {
          const nameList = list
            .filter((v) => v.name === name)
            .filter((v) => ![undefined, null, ''].includes(v.num as string));
          const dateList = Array.from(
            new Set(nameList.map((item) => item.date))
          ).sort((a, b) => a - b);

          return {
            id: uuid(),
            name,
            unit: '',
            xData: dateList.map((v) => dayjs(`${v}`).format('YYYY/MM/DD')),
            yData: dateList.map((date) => {
              return round(
                sum(
                  nameList
                    .filter((li) => li.date === date)
                    .map((li) => li.num || 0)
                ),
                2
              );
            }),
          };
        })
        .filter((v) => v.yData.some((yv) => yv !== 0)),
      durationLines: names
        .map((name) => {
          const nameList = durationList
            .filter((v) => v.name === name)
            .filter((v) => v.duration);
          const dateList = Array.from(
            new Set(nameList.map((item) => item.date))
          ).sort((a, b) => a - b);

          return {
            id: uuid(),
            name,
            unit: '分钟',
            xData: dateList.map((v) => dayjs(`${v}`).format('YYYY/MM/DD')),
            yData: dateList.map((date) => {
              return round(
                sum(
                  nameList
                    .filter((li) => li.date === date)
                    .map((li) => li.duration || 0)
                ),
                2
              );
            }),
          };
        })
        .filter((v) => v.yData.some((yv) => yv !== 0)),

      moneyLines: names
        .map((name) => {
          const nameList = list
            .filter((v) => v.name === name)
            .filter((v) => {
              return (
                ![undefined, null, ''].includes(v.income as string) ||
                ![undefined, null, ''].includes(v.outlay as string)
              );
            });
          const dateList = Array.from(
            new Set(nameList.map((item) => item.date))
          ).sort((a, b) => a - b);

          return {
            id: uuid(),
            name,
            unit: '',
            xData: dateList.map((v) => dayjs(`${v}`).format('YYYY/MM/DD')),
            yData: dateList.map((date) => {
              return round(
                sum(
                  nameList
                    .filter((li) => li.date === date)
                    .map(
                      (li) => Number(li.income || 0) - Number(li.outlay || 0)
                    )
                ),
                2
              );
            }),
          };
        })
        .filter((v) => v.yData.some((yv) => yv !== 0)),
      summary: dates.map((d) => {
        return {
          date: d,
          num: round(
            sum(durationList.filter((c) => c.date === d).map((c) => c.num)),
            2
          ),
          duration: round(
            sum(
              durationList.filter((c) => c.date === d).map((c) => c.duration)
            ),
            2
          ),
          money: round(
            sum(
              durationList
                .filter((c) => c.date === d)
                .map((c) => Number(c.income || 0) - Number(c.outlay || 0))
            ),
            2
          ),
        };
      }),
    };
  };

  const getChartInfo = (data: ReturnType<typeof calcData>) => {
    if (modalOptions) {
      if (modalOptions.isSummary) {
        const totalKey = ['num', 'duration', 'money'][viewType];
        const totalData = data.summary.filter((c) => c[totalKey]);

        return {
          xData: totalData.map((c) => `${c.date}`),
          yData: totalData.map((c) => Number(c[totalKey])),
          unit: ['', t('分钟'), ''][viewType],
          id: `summary-${viewType}`,
          title: `${viewTypeOption[viewType]}`,
        };
      } else {
        const chartItem = [data.numLines, data.durationLines, data.moneyLines][
          viewType
        ].find((v) => v.name === modalOptions['name']);

        if (chartItem) {
          return {
            xData: chartItem.xData,
            yData: chartItem.yData,
            unit: chartItem.unit,
            id: chartItem.id,
            title: `${viewTypeOption[viewType]}`,
          };
        }
      }
    }
  };

  const onDateChange = (v: string, dateType: 'start' | 'end') => {
    setCycle('other');
    const res = { ...option, [dateType]: v.split('-').join('/') };

    if (dayjs(res.end).diff(dayjs(res.start), 'day') > 366) {
      atMessage({ message: t('查询时间超过一年'), type: 'warning' });
    } else {
      setOption((prev: { start: string; end: string }) => ({
        ...prev,
        [dateType]: v.split('-').join('/'),
      }));
    }
  };

  const onCycleChange = (v: TCycle) => {
    if (v === cycle) {
      return;
    }
    setCycle(v);
    const queryDay = dayjs(`${year}-${month}-${dayjs().date()}`);

    switch (v) {
      case 'month':
      case 'year':
      case 'week':
        setOption({
          start: queryDay.startOf(v).format('YYYY/MM/DD'),
          end: queryDay.endOf(v).format('YYYY/MM/DD'),
        });
        break;
      default:
        setOption((prev) => prev);
        break;
    }
  };

  const onPrevNextChange = (v: 'prev' | 'next') => {
    const fn = { prev: 'subtract', next: 'add' }[v];

    switch (cycle) {
      case 'month': {
        setOption((prev) => ({
          start: dayjs(prev?.start)
          [fn](1, cycle)
            .startOf(cycle)
            .format('YYYY/MM/DD'),
          end: dayjs(prev?.start)
          [fn](1, cycle)
            .endOf(cycle)
            .format('YYYY/MM/DD'),
        }));
        break;
      }
      case 'year': {
        setOption((prev) => ({
          start: dayjs(prev?.start)
          [fn](1, cycle)
            .startOf(cycle)
            .format('YYYY/MM/DD'),
          end: dayjs(prev?.start)
          [fn](1, cycle)
            .endOf(cycle)
            .format('YYYY/MM/DD'),
        }));
        break;
      }
      case 'week': {
        setOption((prev) => ({
          start: dayjs(prev?.start)[fn](7, 'day').format('YYYY/MM/DD'),
          end: dayjs(prev?.end)[fn](7, 'day').format('YYYY/MM/DD'),
        }));
        break;
      }
      default: {
        setOption((prev) => prev);
        break;
      }
    }
  };

  const download = () => {
    if (option) {
      const req = {
        startDate: +dayjs(option.start).format('YYYYMMDD'),
        endDate: +dayjs(option.end).format('YYYYMMDD'),
      };
      let url = '';

      if (tableId) {
        url = `${ServerUrl}/api/collaborationRecords/export?${stringify({
          tableId,
          ...req,
        })}`;
      } else {
        url = `${ServerUrl}/api/attendances/export?${stringify(req)}`;
      }

      downloadFile({
        url,
        header: {
          Authorization: `Bearer ${getStorageSync('token')}`,
          'Content-type': 'application/json',
        },
        success: (res) => {
          const manage = Taro.getFileSystemManager();

          if (res.statusCode === 200) {
            const fileName = `${Taro.env.USER_DATA_PATH}/${req.startDate}-${req.endDate}.xlsx`;

            manage.saveFile({
              tempFilePath: res.tempFilePath,
              filePath: fileName,
              complete: () => {
                Taro.openDocument({
                  filePath: fileName,
                  fileType: 'xlsx',
                  showMenu: true,
                });
              },
            });
          }
        },
      });
    }
  };

  const calcOverflow = () => {
    if (isList && modalOptions) {
      return 'hidden';
    } else if (isList) {
      return 'initial';
    } else {
      return 'auto';
    }
  };

  useEffect(() => {
    const queryDay = dayjs(`${year}-${month}`);

    setOption({
      start: queryDay
        .startOf(type === 'month' ? 'month' : 'year')
        .format('YYYY/MM/DD'),
      end: queryDay
        .endOf(type === 'month' ? 'month' : 'year')
        .format('YYYY/MM/DD'),
    });
    setCycle(type as TCycle);
  }, [month, setOption, year, type]);

  useEffect(() => {
    getData();
  }, [getData]);

  const data = calcData(list);
  const chartData = getChartInfo(data);
  const typeChartList = [data.numLines, data.durationLines, data.moneyLines][
    viewType
  ].filter((v) => v.name.includes(search.trim()));
  const tableList = data.table.filter((v) => v.name.includes(search.trim()));

  return (
    <>
      <View className={styles.content} style={{ overflow: calcOverflow() }}>
        <AtMessage />
        <View className={styles.haderAction}>
          <View className={styles.header}>
            {cycleOptions.map((v) => (
              <View
                key={v.key}
                className={classNames(styles.bt, {
                  [styles.selected]: cycle === v.key,
                })}
                onClick={() => onCycleChange(v.key)}
              >
                {cycle === v.key && (
                  <Icon
                    value="prev"
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrevNextChange('prev');
                    }}
                  />
                )}
                <View className={styles.label}>{v.label}</View>
                {cycle === v.key && (
                  <Icon
                    value="next"
                    className={styles.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrevNextChange('next');
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <Select
            title={`${t('开始时间')}：`}
            label={showDateLabel(`${option?.start}`)}
            mode="date"
            value={option?.start.split('/').join('-') || ''}
            onChange={(v) => onDateChange(v.detail.value, 'start')}
          />
          <Select
            title={`${t('结束时间')}：`}
            label={showDateLabel(`${option?.end}`)}
            mode="date"
            value={option?.end.split('/').join('-') || ''}
            onChange={(v) => onDateChange(v.detail.value, 'end')}
          />
          <AtInput
            name=""
            title={`${t('查找名称')}：`}
            type="text"
            placeholder={t('请输入')}
            value={search}
            onChange={(v) => setSearch(v as string)}
            clear
          />
          <Switch
            title={`${t('显示图表')}：`} value={isList} onChange={setIsList} />
        </View>
        {/* <View className={styles.download}>
          <View className={styles.bt} onClick={download}>
            数据导出
            <Icon value="download-cloud" size={14} className={styles.icon} />
          </View>
        </View>*/}
        <View className={styles.tips}>
          <View>{t('点击下方高亮的[累计数值]可以切换统计数据。')}</View>
          <View>
            {t('数值是根据记录中的[数值]字段汇总而得出；时长通过记录中的“开始日期、开始时间，结束日期，结束时间”计算得到。')}
          </View>
        </View>
        <CountTable
          value={tableList}
          viewType={viewType}
          setViewType={setViewType}
          onClick={(v) => {
            if (!isList) setModalOptions(v);
          }}
          footerClick={() => setModalOptions({ isSummary: true })}
          linkNames={isList ? [] : typeChartList.map((v) => v.name)}
        />
        <View>
          {isList &&
            typeChartList.map((v) => (
              <View className={styles.lineChart} key={v.id}>
                <LineChart
                  id={`list-${v.id}`}
                  title={v.name}
                  xAxisData={v.xData}
                  seriesData={v.yData}
                  unit={v.unit}
                  isList
                />
              </View>
            ))}
        </View>
      </View>
      {modalOptions && (
        <View className={styles.modalMask}>
          <View className={styles.modalContent}>
            <Icon
              value="close-circle"
              className={styles.close}
              size={24}
              onClick={() => setModalOptions(undefined)}
            />
            <View className={styles.modalInfo}>
              <View className={styles.title}>{chartData?.title || t('详情')}</View>
              {!modalOptions.isSummary && (
                <>
                  <View className={styles.li}>{modalOptions?.['name']}</View>
                  <View className={styles.li}>
                    <View>{t('次数')}：{modalOptions?.count}</View>
                    <View>{t('数值')}：{modalOptions?.num}</View>
                  </View>
                  <View className={styles.li}>
                    <View>{t('时长')}：{modalOptions?.duration}</View>
                    <View>
                      {t('收入')}：
                      {modalOptions?.money}
                    </View>
                  </View>
                </>
              )}
            </View>
            {((chartData && !isList) ||
              (chartData && isList && modalOptions.isSummary)) && (
                <View className={styles.canvasCard}>
                  <LineChart
                    id={chartData.id}
                    xAxisData={chartData.xData}
                    seriesData={chartData.yData}
                    unit={chartData.unit}
                  />
                </View>
              )}
          </View>
        </View>
      )}
    </>
  );
};

export default HomeStatistics;
