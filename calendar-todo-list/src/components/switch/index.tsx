import { View } from '@tarojs/components';
import classNames from 'classnames';
import { t } from 'i18next';
import { FC } from 'react';

import { SelectForm } from '../select';
import styles from './index.module.less';

type Props = {
  title?: string;
  label?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;
  trueText?: string
  falseText?: string
};
const Switch: FC<Props> = ({ title, label, value, trueText, falseText, onChange }) => {
  return (
    <SelectForm
      title={title}
      placeholder=' '
      value={label ?? (value ? (trueText ?? t('开启')) : (falseText ?? t('关闭')))}
    >
      <View className={styles.content}>
        <View
          className={classNames(styles.wrapper, { [styles.checked]: value })}
          onClick={() => onChange?.(!value)}
        >
          <View className={styles.inner} />
        </View>
      </View>
    </SelectForm>
  );
};

export default Switch;
