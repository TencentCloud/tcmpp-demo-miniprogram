import { Picker, View } from '@tarojs/components';
import classNames from 'classnames';
import { t } from 'i18next';
import { ComponentProps, FC, ReactNode } from 'react';
import { AtInput } from 'taro-ui';

import Icon from '@/components/icon';

import styles from './index.module.less';

type Props = ComponentProps<typeof Picker> & {
  title?: string;
  label?: string;
  allowClear?: boolean;
  placeholder?: string;
  pickerClassName?: string;
  onClear?: () => void;
};
export const SelectChild = () => {
  return (
    <View className={styles.content}>
      <Icon value="chevron-right" size={12} />
    </View>
  );
};

export const SelectForm: FC<{
  title?: string;
  children?: ReactNode;
  value?: string;
  placeholder?: string;
}> = ({ title, children, placeholder, value }) => {
  return (
    <View className={styles.select}>
      <AtInput
        name=""
        title={title}
        onChange={() => null}
        className={styles.input}
        value={value}
        placeholder={placeholder || '请选择'}
      />
      <View className={styles.mask}>{children}</View>
    </View>
  );
};

const Select: FC<Props> = ({
  title,
  label,
  allowClear,
  placeholder,
  className,
  pickerClassName,
  onClear,
  ...pickerProps
}) => {
  return (
    <View className={classNames(styles.select, className)}>
      <AtInput
        name=""
        title={title}
        value={label}
        onChange={() => null}
        className={styles.input}
        placeholder={placeholder || t('请选择')}
      />
      <View className={styles.mask}>
        <Picker className={pickerClassName} {...pickerProps}>
          <SelectChild />
        </Picker>
      </View>
      {allowClear && pickerProps.value && (
        <Icon
          className={styles.clear}
          value="close-circle"
          size={16}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClear?.();
          }}
        />
      )}
    </View>
  );
};

export default Select;
