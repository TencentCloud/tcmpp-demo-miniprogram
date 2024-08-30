import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC } from 'react';
import { HomeRecord } from 'types';

import { getDateFormat } from '@/utils/common';

import styles from './index.module.less';

interface Props {
  direction?: 'left' | 'right';
  value: HomeRecord;
  onClick?: () => void;
}

const BubbleCard: FC<Props> = ({ direction = 'left', value, onClick }) => {
  return (
    <View
      className={classNames(styles.container, {
        [styles.right]: direction === 'right',
      })}
    >
      {direction === 'right' && <View className={styles.arrow} />}
      <View className={styles.content} onClick={onClick}>
        <View>
          <Text className={styles.title}>{value.name}</Text>
          {![undefined, null].includes(value.num as any) && (
            <Text>【{value.num}】</Text>
          )}
        </View>
        {value.desc && <Text className={styles.desc}>{value.desc}</Text>}
      </View>
      {direction === 'left' && <View className={styles.arrow} />}
      <View className={styles.point} />
      <View className={styles.time}>
        {dayjs(String(value.date)).format(getDateFormat())}
      </View>
    </View>
  );
};

export default BubbleCard;
