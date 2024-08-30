import { Image, View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React, { FC } from 'react';
import { AtButton } from 'taro-ui';
import { CollaborationTable } from 'types';

import Action from '@/components/action';
import Icon from '@/components/icon';
import { ImageHost, Pages } from '@/constant';
import { getDateFormat } from '@/utils/common';
import { useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

type Action = {
  isOpened: boolean;
  id: string;
  name: string;
};

interface Props {
  value: CollaborationTable;
  setActionInfo: React.Dispatch<React.SetStateAction<Action>>;
}
const Card: FC<Props> = ({ value, setActionInfo }) => {
  const { userInfo } = useAppSelector((state) => state.app);

  return (
    <View
      key={value._id}
      className={styles.card}
      onClick={() =>
        navigateTo({
          url: `${Pages.collaborationTablePage}?tableId=${value._id}`,
        })
      }
    >
      <View className={styles.img}>
        <Image mode="scaleToFill" src={`${ImageHost}/common/bg/card.jpg`} />
      </View>
      {userInfo?.openid === value.openid && (
        <Icon
          className={styles.delete}
          type="edit"
          onClick={(e) => {
            e.stopPropagation();
            setActionInfo({
              isOpened: true,
              id: value._id,
              name: value.name,
            });
          }}
        />
      )}
      <View className={styles.name}>{value.name}</View>
      <View className={styles.action}>
        <AtButton
          type="primary"
          openType="share"
          className={styles.share}
          onClick={(e) => {
            e.target.dataset.value = value;
            e.stopPropagation();
          }}
        >
          <View>{t('成员人数')}：{value.users.length}</View>
          <Icon value="share" size={12} className={styles.shareIcon} />
          {t('邀请好友')}
        </AtButton>
      </View>
      <View className={styles.bottom}>
        <View className={styles.time}>
          {dayjs(value.created).format(`${getDateFormat()} HH:mm:ss`)}
        </View>
        <View className={styles.enter}></View>
      </View>
    </View>
  );
};

export default Card;
