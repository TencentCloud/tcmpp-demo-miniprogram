import { View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtActivityIndicator } from 'taro-ui';

import CollaborationTablePage from '@/components/collaborationTablePage';
import { getList } from '@/services/collaborationTable';
import { getHolidayList } from '@/store/dictionary';
import { useAppDispatch, useAppSelector, useRequest } from '@/utils/hooks';

import Home from '../home';
import styles from './index.module.less';

const MixHome = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const [isReady, setIsReady] = useState(false);

  const { data: list = [], run: getListAsync } = useRequest(getList, {
    manual: true,
    onSuccess: () => setIsReady(true),
  });

  useEffect(() => {
    getListAsync();
  }, [getListAsync]);

  useDidShow(() => {
    dispatch(getHolidayList());
  });

  if (
    isReady &&
    userInfo?.activeTableId &&
    list.find((v) => v._id === userInfo?.activeTableId)
  ) {
    return <CollaborationTablePage tableId={userInfo.activeTableId} />;
  } else if (isReady) {
    return <Home />;
  } else {
    return (
      <View className={styles.container}>
        <View className={styles.content}>
          <View className={styles.text}>
            {t('页面初始化')}
            <AtActivityIndicator className={styles.loading} size={22} />
          </View>
        </View>
      </View>
    );
  }
};

export default MixHome;
