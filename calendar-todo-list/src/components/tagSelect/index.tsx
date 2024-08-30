import { Text, View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import classNames from 'classnames';
import { t } from 'i18next';
import { FC, useState } from 'react';
import { Category } from 'types';

import Empty from '@/components/empty';
import { Pages } from '@/constant';

import Icon from '../icon';
import styles from './index.module.less';

type Option = Partial<Category> & {
  label: string;
  value: string;
  disable?: boolean;
};

interface Props {
  options: Option[];
  title: string;
  value?: string | string[];
  tableId?: string;
  className?: string;
  onClick?: (v?: Option) => void;
  disabledEdit?: boolean;
}

const TagSelect: FC<Props> = ({
  title,
  tableId,
  options,
  className,
  value,
  onClick,
  disabledEdit,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(true);

  const findTag = (label: string) => {
    if (Array.isArray(value)) {
      return label;
    } else {
      const labelIndex = label.indexOf(value || '');

      if (value && labelIndex !== -1) {
        return (
          <>
            <Text>{label.slice(0, labelIndex)}</Text>
            <Text className={styles.findTrue}>{value}</Text>
            <Text>{label.slice(labelIndex + value.length)}</Text>
          </>
        );
      } else {
        return label;
      }
    }
  };

  const editTags = options.filter((item) => !item.disable);

  return (
    <View className={classNames(styles.container, className)}>
      <View
        className={classNames(styles.title, { [styles.close]: !calendarOpen })}
      >
        <View
          className={styles.name}
          onClick={() => setCalendarOpen(!calendarOpen)}
        >
          {title}
          <Icon
            value={calendarOpen ? 'chevron-down' : 'chevron-right'}
            size={14}
            className={styles.icon}
          />
        </View>
        {editTags.length > 0 && !disabledEdit && (
          <View
            className={styles.operate}
            onClick={() =>
              navigateTo({
                url: tableId
                  ? `${Pages.categoriyConfigPage}?tableId=${tableId}`
                  : Pages.categoriyConfigPage,
              })
            }
          >
            <Icon value="settings" className={styles.icon} size={14} />
            {t('配置')}
          </View>
        )}
      </View>
      {calendarOpen && (
        <View className={styles.content}>
          {options.map((item) => (
            <View
              className={classNames(styles.td, {
                [styles.selected]: Array.isArray(value)
                  ? value.includes(item.label)
                  : value === item.label,
              })}
              key={item.value}
              onClick={() => onClick?.(item)}
            >
              {findTag(item.label)}
            </View>
          ))}
          {/* <View className={styles.space} />*/}
          {!options.length && <Empty className={styles.empty} />}
        </View>
      )}
    </View>
  );
};

export default TagSelect;
