import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { FC } from 'react';
import { Physiology } from 'types';

import Icon from '@/components/icon';
import { getDateFormat, showDateLabel } from '@/utils/common';

import styles from './index.module.less';

interface Props {
  value: Physiology;
  onDelete?: (v: Physiology) => void;
}

const Card: FC<Props> = ({ value, onDelete }) => {
  return (
    <View className={styles.container}>
      {onDelete && (
        <Icon
          className={styles.delete}
          type="edit"
          onClick={() => onDelete?.(value)}
        />
      )}

      <View className={styles.li}>
        <Text className={styles.name}>{t('周期')}</Text>
        <Text className={classNames(styles.text, styles.blue)}>
          {`${value.cycle}${t('天')}`}
        </Text>
      </View>
      <View className={styles.li}>
        <Text className={styles.name}>{t('开始日期')}</Text>
        <Text className={styles.text}>{showDateLabel(value.beginDate)}</Text>
      </View>
      <View className={styles.li}>
        <Text className={styles.name}>{t('结束日期')}</Text>
        <Text className={styles.text}>{showDateLabel(value.endDate)}</Text>
      </View>
      <View className={styles.li}>
        <Text className={styles.name}>{t('持续天数')}</Text>
        <Text className={classNames(styles.text, styles.red)}>
          {`${value.menstrualDays}${t('天')}`}
        </Text>
      </View>
      {value.desc && (
        <View className={styles.li}>
          <Text className={styles.name}>{t('备注')}</Text>
          <Text className={classNames(styles.flex1, styles.desc)}>
            {value.desc}
          </Text>
        </View>
      )}
      <View className={styles.timestamp}>
        {t('最后更新时间')}：{dayjs(value.updated).format(`${getDateFormat()} HH:mm:ss`)}
      </View>
    </View>
  );
};

export default Card;
