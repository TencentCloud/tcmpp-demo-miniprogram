import { View } from '@tarojs/components';
import classnames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { chunk } from 'lodash';
import { FC } from 'react';
import { Schedule } from 'types';

import { genWeekOptions } from '@/constant/index';
import { getMonthSpace } from '@/utils/common';
import { useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

interface Props {
  year: number;
  month: number;
  seletedDate?: Dayjs;
  setSeletedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  open?: boolean;
  list?: Schedule[];
}

export const WeekHeader = () => {
  const weekOptions = genWeekOptions();
  const { userInfo } = useAppSelector((state) => state.app);

  return (
    <View className={styles.header}>
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
  year,
  month,
  seletedDate = dayjs(),
  setSeletedDate,
  open,
  list = [],
}) => {
  const { userInfo } = useAppSelector((state) => state.app);
  const generateMonth = () => {
    const cDays = dayjs(`${year}/${month}`).daysInMonth();
    const [lSpace, rSpace] = getMonthSpace(
      year,
      month,
      userInfo?.isDayOfTheSun
    );

    const tds: string[] = [
      ...Array(lSpace).fill(''),
      ...Array.from(Array(cDays), (_, i) => i + 1),
      ...Array(rSpace).fill(''),
    ];

    return tds;
  };

  const generateWeek = (isEn?: boolean) => {
    const cDays = dayjs(`${year}/${month}`).daysInMonth();
    const cWeek = (seletedDate.day() + (isEn ? 1 : 0)) % 7 || 7;
    const cDate = seletedDate.date();

    const tds = Array.from(Array(7), (_, i) => i + 1).map((v) => {
      let d: number | string = v;

      if (v === cWeek) {
        d = cDate;
      } else if (v < cWeek) {
        d = cDate - (cWeek - v);
        d = d < 1 ? '' : d;
      } else {
        d = cDate + (v - cWeek);
        d = d > cDays ? '' : d;
      }

      return d;
    });

    if (!open && seletedDate.isSame(dayjs(`${year}/${month}`), 'month')) {
      return tds;
    } else {
      return generateMonth().slice(0, 7);
    }
  };

  const genContent = (tds: (string | number)[]) => {
    const listDate = list.map((item) => item.date);

    return tds.map((day, index) => {
      const dayObj = dayjs(`${year}/${month}/${day}`);
      const hasData = day && listDate.includes(+dayObj.format('YYYYMMDD'));

      return (
        <View
          key={`${day}-${index}`}
          className={styles.td}
          onClick={() => {
            if (day) {
              setSeletedDate(dayObj);
            }
          }}
        >
          <View
            className={classnames(styles.day, {
              [styles.selectedDay]: day && seletedDate.isSame(dayObj, 'day'),
              [styles.cDay]: day && dayjs().isSame(dayObj, 'day'),
              [styles.hasData]: hasData,
            })}
          >
            {day && dayjs().isSame(dayObj, 'day') ? day : day}
          </View>
        </View>
      );
    });
  };

  const mTds = generateMonth();
  const wTds = generateWeek(userInfo?.isDayOfTheSun);

  return (
    <View
      className={classnames(
        styles.animation,
        open ? styles.openTrue : styles.openFalse
      )}
      style={{ height: `${chunk(open ? mTds : wTds, 7).length * 96}rpx` }}
    >
      <View className={styles.month}>{genContent(mTds)}</View>
      <View className={styles.week}>{genContent(wTds)}</View>
    </View>
  );
};

export default Calendar;
