import { View } from '@tarojs/components';
import classNames from 'classnames';
import { t } from 'i18next';
import { FC } from 'react';

import styles from './index.module.less';

interface Props {
  className?: string;
  desc?: string;
}

const Empty: FC<Props> = ({ className, desc }) => {
  return (
    <View className={classNames(styles.empty, className)}>
      {desc ? t('暂无{{desc}}', { desc }) : t('暂无数据')}
    </View>
  );
};

export default Empty;
