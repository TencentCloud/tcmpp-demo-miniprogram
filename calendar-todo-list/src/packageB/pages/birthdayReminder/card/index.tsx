import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { FC } from 'react';

import Icon from '@/components/icon';
import { getDateFormat } from '@/utils/common';
import Lunar from '@/utils/lunar';

import { shengxiaoMap, tipMap, xinzuoMap } from '../constant';
import { IBirthdayReminderInfo } from '../type';
import styles from './index.module.less';

interface Props {
  value: IBirthdayReminderInfo;
  onClick?: () => void;
  nextYearData: {
    date: string;
    lunar: string;
  }[]
}

const getAge = (date: string) => {

  const calcAge = (v: string, nextV?: string) => {
    const age = dayjs(nextV).diff(v, 'year');
    let nextAge = age;

    if (dayjs(nextV).format('MM/DD') !== dayjs(v).format('MM/DD')) {
      nextAge = age + 1;
    }
    return [age, nextAge];
  };
  let [age, nextAge] = calcAge(date);
  let [lAge, lNextAge] = calcAge(date);

  const cLunar = Lunar.solar2lunar(
    ...(dayjs().format('YYYY/MM/DD').split('/') as [
      string,
      string,
      string,
    ]),
  );
  const dateLunar = Lunar.solar2lunar(
    ...(date.split('/') as [
      string,
      string,
      string,
    ]),
  );

  if (cLunar !== -1 && dateLunar !== -1) {
    [lAge, lNextAge] = calcAge(dateLunar.lunarDate, cLunar.lunarDate);
  }
  return { age, nextAge, lAge, lNextAge };
};

const getDistance = (date: string, options: Props['nextYearData']) => {

  const calcDistance = (key: 'date' | 'lunar', v: string, nextV?: string) => {
    const vMD = dayjs(v).format('MM/DD');
    const nextMD = dayjs(nextV).format('MM/DD');

    if (vMD === nextMD) {
      return 0;
    } else {
      return options.findIndex(item => item[key] === vMD) + 1;
    }
  };

  const cLunar = Lunar.solar2lunar(
    ...(dayjs().format('YYYY/MM/DD').split('/') as [
      string,
      string,
      string,
    ]),
  );
  const dateLunar = Lunar.solar2lunar(
    ...(date.split('/') as [
      string,
      string,
      string,
    ]),
  );
  const distance = calcDistance('date', date);
  let lDistance = distance;

  if (dateLunar !== -1 && cLunar !== -1) {
    lDistance = calcDistance('lunar', dateLunar.lunarDate, cLunar.lunarDate);
  }

  return { distance, lDistance };
};


const Card: FC<Props> = ({
  value,
  onClick,
  nextYearData,
}) => {
  const lunar = Lunar.solar2lunar(
    ...(dayjs(value.date).format('YYYY/MM/DD').split('/') as [
      string,
      string,
      string,
    ]),
  );


  const { age, lAge, nextAge, lNextAge } = getAge(value.date);
  const { distance, lDistance } = getDistance(value.date, nextYearData);

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.name}>
          {`${value.name} ${Math.max(age, lAge)} ${t('岁')}`}
        </View>
        {lunar !== -1 && i18next.language === 'zh' && (
          <View className={styles.animal}>
            <Icon
              type={
                shengxiaoMap.find((item) => item.value === lunar.Animal)?.key
              }
              className={styles.icon}
              size={28}
            />
            <Text className={styles.text}>{lunar.Animal}</Text>
          </View>
        )}
      </View>
      <View className={styles.item}>
        <Text>{t('生日')}：{value.date}</Text>
        {lunar !== -1 && i18next.language === 'zh' && (
          <View>
            <Text>（</Text>
            <Icon
              size={14}
              type={xinzuoMap.find((item) => item.value === lunar.astro)?.key}
            />
            {lunar.astro}
            <Text>）</Text>
          </View>)}
      </View>
      <View
        className={
          classNames(styles.item,
            {
              [styles.orange]: true,
              [styles.green]: distance === 0,
            },
          )
        }
      >
        {!distance ? t('今天是 Ta {{nextAge}} 岁的生日', { nextAge }) : t('距离 {{nextAge}} 岁生日还有 {{distance}} 天', { nextAge, distance })}
      </View>
      {lunar !== -1 && i18next.language === 'zh' && (
        <View className={styles.item}>
          农历生日：{`${lunar.lYear}年${lunar.IMonthCn}${lunar.IDayCn}`}
        </View>
      )}
      {i18next.language === 'zh' && <View
        className={
          classNames(styles.item,
            {
              [styles.orange]: true,
              [styles.green]: lDistance === 0,
            },
          )
        }
      >
        {!lDistance ? `今天是 Ta ${lNextAge} 岁的生日（农历）` : `距离农历 ${lNextAge} 岁生日还有 ${lDistance} 天`}
      </View>}
      <View className={styles.item}>
        {t('提醒日期')}：
        {value.preDays
          .filter((v) => v !== null && v !== '')
          .map((item) => {
            if (+item === 0) {
              return dayjs(value.date).format(getDateFormat());
            } else {
              return dayjs(value.date).subtract(+item, 'day').format(getDateFormat());
            }
          })
          .join('，')}
        {i18next.language === 'zh' && `（${tipMap[value.type]}）`}
      </View>
      <View className={styles.item}>
        <Text>{t('提醒时间')}：{value.sendTime}:00</Text>
        <Icon value='trash' className={styles.operate} onClick={onClick} />
      </View>
    </View>
  );
};

export default Card;
