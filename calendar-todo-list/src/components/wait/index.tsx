import { View } from '@tarojs/components';
import { FC } from 'react';

import styles from './index.module.less';

const Wait: FC<{ height?: number }> = ({ height }) => {
  return (
    <View
      className={styles.container}
      style={typeof height === 'number' ? { height } : {}}
    >
      更多功能正在迭代中，敬请期待
    </View>
  );
};

export default Wait;
