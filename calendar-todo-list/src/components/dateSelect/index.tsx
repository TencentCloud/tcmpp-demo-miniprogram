import { View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { AtCalendar } from 'taro-ui';

import Empty from '../empty';
import Icon from '../icon';
import { SelectChild, SelectForm } from '../select';
import styles from './index.module.less';

type Props = {
  title?: string;
  label?: string;
  value?: string[];
  onChange?: (v: string[]) => void;
};
const DateSelect: FC<Props> = ({ title, label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<string[]>([]);

  const onOK = () => {
    onChange?.(list);
    setOpen(false);
  };

  useEffect(() => {
    if (open && value) {
      setList(value);
    } else {
      setList([]);
    }
  }, [open, value]);
  return (
    <>
      <SelectForm title={title} placeholder=' ' value={label ?? ''}>
        <View onClick={() => setOpen(true)}>
          <SelectChild />
        </View>
      </SelectForm>
      {open && (
        <View className={styles.modal}>
          <View
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <View className={styles.title}>日期选择（已选{list.length}）</View>
            <View className={styles.list}>
              {list.length > 0 ? (
                list.map((v) => (
                  <View className={styles.cell} key={v}>
                    <View className={styles.text}>
                      {dayjs(v).format('YYYY/MM/DD')}
                      <Icon
                        className={styles.delRowIcon}
                        size={14}
                        value='trash'
                        onClick={() =>
                          setList((prev) => prev.filter((i) => i !== v))
                        }
                      />
                    </View>
                  </View>
                ))
              ) : (
                <Empty />
              )}
            </View>
            <AtCalendar
              currentDate=''
              onSelectDate={(v: { value: { start: string } }) => {
                setList((prev) => [...new Set([v.value.start, ...prev])]);
              }}
            />
            <View className={styles.footer}>
              <View className={styles.bt} onClick={() => setOpen(false)}>
                取消
              </View>
              <View
                className={classNames(styles.bt, styles.primary)}
                onClick={onOK}
              >
                确定
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default DateSelect;
