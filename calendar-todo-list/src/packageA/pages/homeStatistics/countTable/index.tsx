import { View } from '@tarojs/components';
import classNames from 'classnames';
import i18next, { t } from 'i18next';
import { FC } from 'react';

import Icon from '@/components/icon';

import styles from './index.module.less';

export const genViewTypeOption = () => [t('数值'), t('时长'), t('收入')];

interface Props {
  value: {
    id: string;
    name: string;
    count: number;
    numSum: number;
    durations: number;
    money: number;
  }[];
  viewType: number;
  linkNames?: string[]; // 可以点击的名称
  setViewType: React.Dispatch<React.SetStateAction<number>>;
  onClick?: (v: {
    name: string;
    count: number;
    num: number;
    duration: string;
    money: number;
  }) => void;
  footerClick?: () => void;
}

const calcDuration = (v: number) => {
  const [dH, dM] = [Math.floor(v / 60) * (v < 0 ? -1 : 1), v % 60];

  return i18next.language === 'zh' ? (`${dH === 0 ? '' : `${dH}时`}${dM === 0 ? '' : `${dM}分`}` || 0) : v;
};

const CountTable: FC<Props> = ({
  value: propsValue,
  viewType,
  linkNames,
  setViewType,
  onClick,
  footerClick,
}) => {
  const viewTypeOption = genViewTypeOption();
  const argKey = ['numSum', 'durations', 'money'][viewType];
  const value = propsValue.sort((a, b) => b[argKey] - a[argKey]);

  const genFooter = () => {
    if (value.length > 1) {
      const total = [
        Number(value.reduce((prev, curV) => prev + curV.numSum, 0).toFixed(2)),
        calcDuration(value.reduce((prev, curV) => prev + curV.durations, 0)),
        Number(value.reduce((prev, curV) => prev + curV.money, 0).toFixed(2)),
      ][viewType];

      return (
        <View className={classNames(styles.tr, styles.tFooter)}>
          <View className={classNames(styles.td, styles.td1)}>{t('汇总')}</View>
          <View className={classNames(styles.td, styles.td2)}>
            {value.reduce((prev, curV) => prev + curV.count, 0)}
          </View>
          <View
            className={classNames(styles.td, styles.td3, {
              [styles.link]: Boolean(total),
            })}
            onClick={() => {
              if (total) {
                footerClick?.();
              }
            }}
          >
            {total}
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <View className={styles.table}>
        <View className={classNames(styles.tr, styles.th)}>
          <View className={classNames(styles.td, styles.td1)}>{t('名称')}</View>
          <View className={classNames(styles.td, styles.td2)}>{t('次数')}</View>
          <View className={classNames(styles.td, styles.td3)}>
            <View
              className={styles.button}
              onClick={() => {
                setViewType((prev) => {
                  return (prev + 1) % viewTypeOption.length;
                });
              }}
            >
              {viewTypeOption[viewType]}
              <Icon type="switch" className={styles.icon} size={16} />
            </View>
          </View>
        </View>
        <View className={styles.tableContent}>
          {value.length === 0 && (
            <View className={classNames(styles.tr, styles.empty)}>
              {t('暂无数据')}
            </View>
          )}
          {value.map((item) => {
            const valueList = [
              item.numSum,
              calcDuration(item.durations),
              item.money,
            ];

            return (
              <View
                className={classNames(styles.tr, {
                  [styles.link]: linkNames?.includes(item.name),
                })}
                key={item.id}
                onClick={() => {
                  onClick?.({
                    name: item.name,
                    count: item.count,
                    num: valueList[0] as number,
                    duration: valueList[1] as string,
                    money: valueList[2] as number,
                  });
                }}
              >
                <View className={classNames(styles.td, styles.td1)}>
                  <View className={styles.name}>{item.name}</View>
                </View>
                <View className={classNames(styles.td, styles.td2)}>
                  {item.count}
                </View>
                <View className={classNames(styles.td, styles.td3)}>
                  {valueList[viewType]}
                </View>
              </View>
            );
          })}
        </View>
        {genFooter()}
      </View>
    </>
  );
};

export default CountTable;
