import { View } from '@tarojs/components';
import { CommonEventFunction } from '@tarojs/components/types/common';
import classNames from 'classnames';
import { CSSProperties, FC } from 'react';

import styles from './index.module.less';

interface IProps {
  type?: string;
  value?: string;
  className?: string;
  style?: CSSProperties;
  size?: number;
  color?: string;
  onClick?: CommonEventFunction;
}

const Icon: FC<IProps> = ({
  type,
  value,
  className,
  style,
  size,
  color,
  onClick,
}) => {
  if (type) {
    return (
      <View
        className={classNames(`iconfont icon-${type}`, styles.icon, className)}
        style={{
          ...(style || {}),
          fontSize: `${(size || 20) / 16}rem`,
          color,
        }}
        onClick={onClick}
      />
    );
  } else if (value) {
    return (
      <View
        className={classNames(
          `at-icon at-icon-${value}`,
          styles.icon,
          className,
        )}
        style={{
          ...(style || {}),
          fontSize: `${(size || 20) * 1.8}rpx`,
          color,
        }}
        onClick={onClick}
      />
    );
  } else {
    return null;
  }
};

export default Icon;
