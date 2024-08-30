import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { FC } from 'react';
import { Schedule } from 'types';

import Icon from '@/components/icon';
import { getDateFormat } from '@/utils/common';

import styles from './index.module.less';

interface Props {
  value: Schedule;
  onDelete?: (v: Schedule) => void;
  onChange?: (v: Partial<Schedule>) => void;
  isOverdue?: boolean;
}

const Card: FC<Props> = ({ value, onDelete, onChange, isOverdue }) => {
  const onFinishChange = () => {
    const finish = !value.finish;

    onChange?.({
      ...value,
      finishTime: finish ? dayjs().valueOf() : undefined,
      finish,
    });
  };

  const duration = dayjs(value.time).diff(dayjs(), 'minutes');
  const [dD, dH, dM] = [
    Math.floor(duration / 60 / 24),
    Math.floor(duration / 60),
    duration % 60,
  ];

  return (
    <View className={styles.container}>
      <View
        className={classNames(styles.content, { [styles.gray]: isOverdue })}
      >
        <View className={styles.title} onClick={onFinishChange}>
          <View className={styles.checkbox}>
            {value.finish && <Icon type='gou' size={10} />}
          </View>
          <View className={styles.text}>{value.title}</View>
        </View>
        {value.desc && <Text className={styles.subTitle}>{value.desc}</Text>}
        <View className={styles.timestamp}>
          <View className={styles.success}>
            {value.finishTime &&
              value.finish &&
              dayjs(value.finishTime).format(`${getDateFormat()} HH:mm:ss`)}
          </View>
          {dayjs(value.created).format(`${getDateFormat()} HH:mm:ss`)}
        </View>
        {/* {value.finish && (
          <Icon type='yiwancheng' className={styles.finish} size={48} />
        )} */}
      </View>
      <View className={styles.action}>
        <View
          className={classNames(styles.time, {
            [styles.success]: value.remindStatus && !isOverdue,
          })}
        >
          <Text>{dayjs(value.time).format('HH:mm')}</Text>
          <Icon
            type={value.remindStatus ? 'tixing' : 'quxiaotixing'}
            className={styles.icon}
          />
          {/* <View className={styles.text}>
            {value.remindStatus ? t('提醒已打开') : t('提醒已关闭')}
          </View> */}
        </View>
        <Icon
          className={styles.delete}
          type='edit'
          onClick={() => onDelete?.(value)}
        />
      </View>
      <View
        className={classNames(
          styles.tip,
          isOverdue
            ? value.finish
              ? styles.overdueTrue
              : styles.overdueFalse
            : styles.expected
        )}
      >
        {isOverdue
          ? t('日程已过期')
          : t('{{dD}}天{{dH}}小时{{dM}}分钟', { dD, dH, dM })}
      </View>
    </View>
  );
};

export default Card;
