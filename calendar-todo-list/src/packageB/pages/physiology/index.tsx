import { View } from '@tarojs/components';
import { atMessage, navigateTo, useDidShow } from '@tarojs/taro';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtMessage } from 'taro-ui';

import Action from '@/components/action';
import Icon from '@/components/icon';
import Switch from '@/components/switch';
import { EPhysioType, genPhysioTypeOpt,Pages } from '@/constant';
import { deleteItem, getList } from '@/services/physiology';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import Card from './card';
import styles from './index.module.less';

const Physiology = () => {
  const physioTypeOpt = genPhysioTypeOpt();
  const dispatch = useAppDispatch();
  const { userInfo, loading: appLoading } = useAppSelector(
    (state) => state.app,
  );
  const [operateInfo, setOperateInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });
  const { data, run, loading } = useRequest(getList, {
    manual: true,
    onSuccess: () => {
      dispatch(getUserInfo());
    },
  });
  const { run: patchUserAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
      },
    },
  );
  const { run: deleteAsync, loading: deleteLoading } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setOperateInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      run();
    },
  });
  const generateTips = () => {
    return (
      <View className={styles.physiologyTip}>
        <View className={styles.text}>
          {t('首页展示开启后将在首页通过不同颜色的日期来展示')}
        </View>
        <View className={styles.list}>
          {Object.values(physioTypeOpt).map(({ key, color, name }) => {
            return (
              key !== EPhysioType.other && (
                <View key={key} className={styles.li} style={{ color }}>
                  {key === EPhysioType.ovulationDay ? (
                    <Icon type="xibao" className={styles.icon} size={10} />
                  ) : (
                    <Icon type="dian" className={styles.icon} size={8} />
                  )}
                  <View className={styles.name}>{name}</View>
                </View>
              )
            );
          })}
        </View>
      </View>
    );
  };

  const onEdit = () => {
    navigateTo({
      url: `${Pages.physiologyEditPage}?id=${operateInfo.id}`,
    });
    setOperateInfo({ isOpened: false, id: '', name: '' });
  };

  const onCreate = () => {
    navigateTo({
      url: `${Pages.physiologyEditPage}`,
    });
  };

  const physioStatusChange = (status: boolean) => {
    if (status && !data?.length) {
      atMessage({
        message: '请先添加生理期数据',
        type: 'warning',
      });
    } else {
      patchUserAsync({
        ...userInfo,
        physiology: { ...userInfo?.physiology, status },
      });
    }
  };

  useDidShow(() => {
    run();
  });
  useLoading(appLoading || loading || deleteLoading || patchUserLoading);
  return (
    <>
      <AtMessage />
      <View className={styles.content}>
        <Switch
          title={`${t('首页展示')}：`}
          value={userInfo?.physiology?.status}
          onChange={physioStatusChange}
        />
        {generateTips()}
        {data?.map((v, index) => (
          <Card
            key={v._id}
            value={v}
            onDelete={(arg) => {
              setOperateInfo({
                isOpened: true,
                id: arg._id,
                name: `${index + 1}`,
              });
            }}
          />
        ))}
      </View>
      <View className={styles.footer}>
        <AtButton type="primary" onClick={onCreate}>
          {t('添加生理期数据')}
        </AtButton>
      </View>
      <Action
        preTitle={t('生理期数据')}
        title={operateInfo.name}
        isOpened={operateInfo.isOpened}
        onClose={() => setOperateInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => {
          deleteAsync(operateInfo.id);
        }}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
    </>
  );
};

export default Physiology;
