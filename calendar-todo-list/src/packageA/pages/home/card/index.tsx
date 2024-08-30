import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { FC } from 'react';
import { CollaborationTable, HomeRecord } from 'types';

import Icon from '@/components/icon';
import Img from '@/components/img';
import { getDateFormat } from '@/utils/common';
import { useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

interface Props {
  value: HomeRecord;
  tableInfo?: CollaborationTable;
  onDelete?: (v: HomeRecord) => void;
}

const Card: FC<Props> = ({ value, onDelete, tableInfo }) => {
  const { userInfo } = useAppSelector((state) => state.app);
  const { shareAttendanceMaps } = useAppSelector((state) => state.dictionary);
  const shareInfo = shareAttendanceMaps.reduce(
    (res, arg) => ({ ...res, [arg.shareId]: arg.shareName }),
    {}
  );
  const title = value.name;
  const startTime = `${value.beginDate} ${value.beginTime}`.trim() || 0;
  const endTime = `${value.endDate} ${value.endTime}`.trim() || 0;
  const duration = Math.abs(dayjs(endTime).diff(startTime, 'minutes'));
  const [dH, dM] = [
    Math.floor(duration / 60) * (duration < 0 ? -1 : 1),
    duration % 60,
  ];

  const isSameTime = startTime === endTime;
  const isOwn = value.openid === userInfo?.openid;

  const genCreator = () => {
    if (tableInfo) {
      return (
        <>
          <Text className={styles.name}>{t('创建人')}</Text>
          <Text
            className={classNames(styles.text, {
              [styles.highlight]: value.openid !== userInfo?.openid,
            })}
          >
            {tableInfo?.users?.find((item) => item.openid === value.openid)
              ?.name || value.openid}
          </Text>
        </>
      );
    } else if (value.openid !== userInfo?.openid) {
      return (
        <>
          <Text className={styles.name}>{t('创建人')}</Text>
          <Text className={classNames(styles.text, styles.highlight)}>
            {shareInfo[value.openid] || ''}
          </Text>
        </>
      );
    }
  };

  return (
    <View className={styles.container}>
      {onDelete &&
        (isOwn || (tableInfo && tableInfo.openid === userInfo?.openid)) && (
          <Icon
            className={styles.delete}
            type="edit"
            onClick={() => onDelete?.(value)}
          />
        )}
      <View className={styles.li}>
        <Text className={styles.name}>{t('名称')}</Text>
        <Text className={classNames(styles.flex1, styles.title)}>{title}</Text>
      </View>

      <View className={styles.li}>
        <Text className={styles.name}>{t('数值')}</Text>
        <Text
          className={classNames(styles.text, {
            [styles.highlight]: Boolean(value.num),
          })}
        >
          {value.num ?? t('无')}
        </Text>
      </View>
      <View className={styles.spaceBetween}>
        <View className={classNames(styles.li, styles.half)}>
          <Text className={styles.name}>{t('时间')}</Text>
          {value.time}
        </View>
        <View className={classNames(styles.li, styles.half)}>
          {genCreator()}
        </View>
      </View>

      {value.income && (
        <View className={classNames(styles.li)}>
          <Text className={styles.name}>{t('收入')}</Text>
          <Text className={styles.income}>{t('￥')}{value.income}</Text>
        </View>
      )}
      {value.outlay && (
        <View className={classNames(styles.li)}>
          <Text className={styles.name}>{t('支出')}</Text>
          <Text className={styles.outlay}>{t('￥')}{value.outlay}</Text>
        </View>
      )}
      {!isSameTime && (
        <>
          <View className={styles.li}>
            <Text className={styles.name}>{t('持续时长')}</Text>
            <Text className={classNames(styles.text, styles.highlight)}>{`${dH === 0 ? '' : `${dH}小时`
              }${dM === 0 ? '' : `${dM}${t('分钟')}`}`}</Text>
          </View>
          <View className={styles.li}>
            <Text className={styles.name}>{t('开始时间')}</Text>
            {startTime}
          </View>
          <View className={styles.li}>
            <Text className={styles.name}>{t('结束时间')}</Text>
            {endTime}
          </View>
        </>
      )}
      {(value.imgs?.length || 0) > 0 && (
        <View className={styles.li}>
          <Text className={styles.name}>{t('图片')}</Text>
          <View className={styles.imgList}>
            {value.imgs?.map((src) => (
              <View key={src} className={styles.img}>
                <Img src={src} disableDelete allSrc={value.imgs} />
              </View>
            ))}
          </View>
        </View>
      )}
      {value.desc && (
        <View className={styles.li}>
          <Text className={styles.name}>{t('备注')}</Text>
          <Text className={classNames(styles.flex1, styles.desc)}>
            {value.desc}
          </Text>
        </View>
      )}
      <View className={styles.timestamp}>
        {t('最后更新时间')}：{dayjs(value.updated).format(`${getDateFormat()} HH:mm:ss`)}
      </View>
    </View>
  );
};

export default Card;
