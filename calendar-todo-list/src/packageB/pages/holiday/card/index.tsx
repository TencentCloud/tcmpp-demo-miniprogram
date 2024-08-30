import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { FC } from 'react';
import { HolidayItem } from 'types';

import Icon from '@/components/icon';
import { getDateFormat } from '@/utils/common';
import { useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

interface Props {
  value: HolidayItem;
  onDelete?: (v: HolidayItem) => void;
}

const Card: FC<Props> = ({ value, onDelete }) => {
  const { userInfo } = useAppSelector((state) => state.app);

  const cDay = dayjs();
  const [beginDay, endDay] = [
    dayjs(value.date),
    dayjs(value.date).add(value.days - 1, 'day'),
  ];
  let status: '未休' | '已休' | '假期中' = t('未休');

  if (endDay.isBefore(cDay, 'day')) {
    status = t('已休');
  } else if (
    beginDay.isSame(cDay, 'day') ||
    endDay.isSame(cDay, 'day') ||
    (beginDay.isBefore(cDay, 'day') && endDay.isAfter(cDay, 'day'))
  ) {
    status = t('假期中');
  }

  return (
    <View
      className={styles.container}
      style={{ opacity: status === t('已休') ? 0.4 : 1 }}
    >
      {onDelete && userInfo?.openid === value.openid && (
        <Icon
          className={styles.delete}
          type="edit"
          onClick={() => onDelete?.(value)}
        />
      )}
      <View className={styles.li}>
        <Text className={styles.name}>{t('名称')}</Text>
        <Text className={classNames(styles.flex1, styles.title)}>
          {value.name}
        </Text>
      </View>

      {value.subName && (
        <View className={styles.li}>
          <Text className={styles.name}>{t('简称')}</Text>
          <Text className={styles.text}>{value.subName}</Text>
        </View>
      )}
      <View className={classNames(styles.li)}>
        <Text className={styles.name}>{t('状态')}</Text>
        <Text
          className={classNames(styles.text, {
            [styles.green]: status !== t('已休'),
          })}
        >
          {status}
        </Text>
      </View>
      {status === t('未休') && (
        <View className={classNames(styles.li)}>
          <Text className={styles.name}>{t('倒计时')}</Text>
          <Text className={classNames(styles.text, styles.green)}>
            {`${beginDay.diff(dayjs().startOf('day'), 'day')} ${t('天')}`}
          </Text>
        </View>
      )}
      <View className={styles.li}>
        <Text className={styles.name}>{t('日期')}</Text>
        <Text
          className={classNames(styles.text, {
            [styles.green]: status !== t('已休'),
          })}
        >{`${beginDay.format(getDateFormat())} ~ ${endDay.format(
          getDateFormat(),
        )}`}</Text>
      </View>
      <View className={styles.spaceBetween}>
        <View className={classNames(styles.li, styles.half)}>
          <Text className={styles.name}>{t('假期')}</Text>
          <Text
            className={classNames(styles.text, {
              [styles.green]: status !== t('已休'),
            })}
          >
            {value.days} {t('天')}
          </Text>
        </View>
        {Boolean(value.workDays?.length) && i18next.language === 'zh' && (
          <View className={classNames(styles.li, styles.half)}>
            <Text className={styles.name}>调休</Text>
            <Text
              className={classNames(styles.text, {
                [styles.red]: status !== t('已休'),
              })}
            >
              {`${value.workDays?.length} ${t('天')}`}
            </Text>
          </View>
        )}
      </View>
      {Boolean(value.workDays?.length) && i18next.language === 'zh' && (
        <View className={styles.li}>
          <Text className={styles.name}>调休</Text>
          <Text
            className={classNames(styles.text, {
              [styles.red]: status !== t('已休'),
            })}
          >
            {value.workDays?.join('、')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Card;
