import { View } from '@tarojs/components';
import { atMessage } from '@tarojs/taro';
import classNames from 'classnames';
import { FC } from 'react';
import { AtMessage } from 'taro-ui';

import Icon from '@/components/icon';

import styles from './index.module.less';

interface IProps {
  value?: number;
  className?: string;
  onChange?: (v?: number) => void;
}

const NumSelect: FC<IProps> = ({ className, value, onChange }) => {
  const numClick = (v: number) => {
    const nextV = `${value || ''}${v}`;

    if (nextV.length < 15) {
      onChange?.(+nextV);
    } else {
      atMessage({
        message: '数值过大',
        type: 'warning',
      });
    }
  };

  const restClick = () => {
    onChange?.();
  };

  const deleteClick = () => {
    const valueArr = `${+(value || '')}`.split('');

    valueArr.pop();
    const nextV = valueArr.join('');

    if (nextV) {
      onChange?.(+nextV);
    } else {
      restClick();
    }
  };

  return (
    <View className={classNames(styles.container, className)}>
      <AtMessage />
      <View className={styles.title}>
        请输入数值（<text className={styles.unit}>单位保存在你的大脑里</text>）
      </View>
      <View className={styles.content}>
        <View className={styles.input}>
          <View>{value}</View>
        </View>
        <View className={styles.num}>
          <View className={styles.key} onClick={deleteClick}>
            <Icon type='tuige' />
          </View>
        </View>
        <View className={styles.num}>
          <View className={styles.key} onClick={restClick}>
            <Icon type='chongzhi' />
          </View>
        </View>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
          <View className={styles.num} key={key}>
            <View className={styles.key} onClick={() => numClick(key)}>
              {key}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NumSelect;
