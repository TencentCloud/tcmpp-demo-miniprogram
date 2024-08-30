import { CommonEventFunction, Text, View } from '@tarojs/components';
import classnames from 'classnames';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { chunk, uniq } from 'lodash';
import { FC } from 'react';
import { Category, HomeRecord } from 'types';

import {
  colorList,
  EPhysioType,
  genMonthOptions,
  genPhysioTypeOpt,
  genWeekOptions,
} from '@/constant/index';
import { getMonthSpace } from '@/utils/common';
import { useAppSelector } from '@/utils/hooks';
import Lunar from '@/utils/lunar';

import Icon from '../icon';
import styles from './index.module.less';

export type CalendarType = 'year' | 'month';

interface Props {
  type: CalendarType;
  year: number;
  month: number;
  list: HomeRecord[];
  searchValue?: string;
  categories?: Category[];
  physiology?: {
    beginDate: string;
    endDate: string;
    cycle: number;
    menstrualDays: number;
  };
  className?: string;
  onTouch?: CommonEventFunction<any>;
  onDayClick?: (y: number, m: number, d: number) => void;
  onLongPress?: (y: number, m: number, d: number) => void;
}

export const WeekHeader = () => {
  const weekOptions = genWeekOptions();
  const { userInfo } = useAppSelector((state) => state.app);

  return (
    <View className={styles.th}>
      {(userInfo?.isDayOfTheSun
        ? [...weekOptions, ...weekOptions].slice(6, 13)
        : weekOptions
      ).map((item) => (
        <View key={item.key} className={styles.td}>
          {item.view}
        </View>
      ))}
    </View>
  );
};

const Calendar: FC<Props> = ({
  type,
  year,
  month,
  categories = [],
  list: propsList,
  className,
  searchValue,
  physiology,
  onTouch,
  onDayClick,
  onLongPress,
}) => {
  const physioTypeOpt = genPhysioTypeOpt();
  const addTagName = t('添加');
  const monthOptions = genMonthOptions();
  const { userInfo } = useAppSelector((state) => state.app);
  const { holidays: holidaysString } = useAppSelector(
    (state) => state.dictionary
  );
  const holidays = holidaysString.map((v) => ({ ...v, date: dayjs(v.date) }));

  const list = propsList.concat(
    propsList.length === 0 && !searchValue
      ? ({
        name: addTagName,
        date: +dayjs().format('YYYYMMDD'),
        _id: '',
      } as (typeof propsList)[number])
      : []
  );

  const randomColors = uniq(
    categories.concat(list).map((item) => item.name)
  ).map((v, index) => ({
    name: v,
    color: colorList[index % colorList.length],
  }));

  const getPhysiologyType = (day: string) => {
    if (physiology) {
      const { beginDate, cycle, menstrualDays } = physiology;

      // 当是年视图或者日期在经期开始日期之前，不做预测
      if (type === 'year' || dayjs(day).isBefore(beginDate)) {
        return EPhysioType.other;
      }
      const deviation = dayjs(day).diff(beginDate, 'day');
      let dayIndex = 1;

      if (dayjs(day).isBefore(beginDate)) {
        dayIndex =
          ((deviation + cycle * Math.ceil(-deviation / cycle)) % cycle) + 1;
      } else {
        dayIndex = (deviation % cycle) + 1;
      }
      const centerDay = cycle + 1 - 14; // 包括下次周期的第一天

      if (dayIndex <= menstrualDays) {
        return EPhysioType.menstrual;
      } else if (dayIndex === centerDay) {
        return EPhysioType.ovulationDay;
      } else if (dayIndex >= centerDay - 5 && dayIndex <= centerDay + 4) {
        return EPhysioType.pregnancy;
      } else if (
        (dayIndex > menstrualDays && dayIndex < centerDay - 5) ||
        (dayIndex > centerDay + 4 && dayIndex <= cycle)
      ) {
        return EPhysioType.safety;
      } else {
        return EPhysioType.other;
      }
    } else {
      return EPhysioType.other;
    }
  };

  const generateMonth = (y: number, m: number) => {
    const cDays = dayjs(`${y}-${m}`).daysInMonth();
    const [lSpace, rSpace] = getMonthSpace(y, m, userInfo?.isDayOfTheSun);

    return chunk(
      [
        ...Array(lSpace).fill(''),
        ...Array.from(Array(cDays).keys()),
        ...Array(rSpace).fill(''),
      ],
      7
    ).map((tr, trIndex) => {
      return (
        <View key={trIndex} className={styles.tr}>
          {tr.map((v, tdIndex) => {
            const d = v + 1;
            const ymd = `${y}/${m}/${d}`;
            const l = Lunar.solar2lunar(
              ...(ymd.split('/') as [string, string, string])
            );
            let IDayCn = '';

            if (l !== -1) {
              IDayCn = l.IDayCn === '初一' ? l.IMonthCn : l.IDayCn;
            }
            const dayList = list.filter((item) => {
              return item.date === +dayjs(ymd).format('YYYYMMDD');
            });

            if (v === '') {
              return <View key={`space-${tdIndex}`} className={styles.td} />;
            } else {
              const currentDay = dayjs(ymd);
              const physioV = physioTypeOpt[getPhysiologyType(ymd)];
              const holiday = holidays.find((h) => {
                return h.date.isSame(currentDay, 'day');
              });

              return (
                <View
                  key={d}
                  className={classnames(styles.td, {
                    [styles.allowActive]: true,
                    [styles.taskTd]: dayList.length !== 0,
                    [styles.selected]: dayjs().isSame(currentDay, 'day'),
                  })}
                  onClick={() => onDayClick?.(y, m, d)}
                  onLongPress={() => onLongPress?.(y, m, d)}
                >
                  <View
                    className={classnames(styles.day, {
                      [styles.red]: holiday?.type === 0,
                      [styles.green]: holiday?.type === 1,
                    })}
                    style={
                      dayList[0]?.name === addTagName
                        ? { position: 'absolute', top: 0 }
                        : {}
                    }
                  >
                    <View
                      className={styles.physio}
                      style={{ color: physioV.color }}
                    >
                      {physiology &&
                        physioV.key === EPhysioType.ovulationDay && (
                          <Icon
                            type="xibao"
                            className={styles.icon}
                            size={10}
                          />
                        )}
                      <View
                        className={classnames(styles.text, {
                          [styles.holiday]: holiday?.name,
                        })}
                      >
                        {holiday?.name ?? `${d}`}
                        {!holiday?.name && i18next.language === 'zh' && (
                          <View className={styles.cn}>{IDayCn}</View>
                        )}
                      </View>
                    </View>
                  </View>
                  {dayList.length > 0 && (
                    <View
                      className={styles.task}
                      style={
                        dayList[0]?.name === addTagName
                          ? { justifyContent: 'center' }
                          : {}
                      }
                    >
                      {dayList.map(({ name = '', openid, color }) => {
                        let bgColor = colorList[0];
                        let categoryColor = categories.find(
                          (c) => c.name === name
                        )?.color;
                        let randomColor = randomColors.find(
                          (c) => c.name === name
                        )?.color;

                        if (name === addTagName) {
                          bgColor = colorList[0];
                        } else {
                          bgColor =
                            categoryColor || color || randomColor || bgColor;
                        }
                        return (
                          <Text
                            key={v}
                            className={styles.tag}
                            style={{ background: bgColor }}
                          >
                            {openid && userInfo?.openid !== openid && (
                              <Text className={styles.otherId} />
                            )}
                            {name}
                          </Text>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            }
          })}
        </View>
      );
    });
  };

  const generateYear = (tp: CalendarType, y: number, m: number) => {
    if (tp === 'year') {
      return Array.from(Array(12).keys()).map((v) => (
        <View key={v} className={styles.month}>
          {generateMonth(y, v + 1)}
          <View className={styles.monthTag}>{monthOptions[v].view}</View>
        </View>
      ));
    } else {
      return <View className={styles.month}>{generateMonth(y, m)}</View>;
    }
  };

  return (
    <View
      className={className}
      key={year}
      onTouchMove={onTouch}
      onTouchStart={onTouch}
      onTouchEnd={onTouch}
    >
      {generateYear(type, year, month)}
    </View>
  );
};

export default Calendar;
