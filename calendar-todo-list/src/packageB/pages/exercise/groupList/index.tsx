import { View } from '@tarojs/components';
import { navigateTo, useDidShow, useShareAppMessage } from '@tarojs/taro';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton } from 'taro-ui';
import { ExercisePlanGroupItem } from 'types';

import Action from '@/components/action';
import { Pages } from '@/constant';
import { deleteGroupItem, getGroupList } from '@/services/exercise';
import { useLoading, useRequest } from '@/utils/hooks';

import Card from './card';
import styles from './index.module.less';

const GroupList = () => {
  const [actionInfo, setActionInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });

  const {
    data: list = [],
    loading,
    run,
  } = useRequest(getGroupList, { manual: true });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(
    deleteGroupItem,
    {
      manual: true,
      onSuccess: () => {
        setActionInfo({
          isOpened: false,
          id: '',
          name: '',
        });
        run();
      },
    },
  );

  const onEdit = () => {
    navigateTo({ url: `${Pages.exerciseGroupEditPage}?id=${actionInfo.id}` });
    setActionInfo({ isOpened: false, id: '', name: '' });
  };

  const onCreate = () => {
    navigateTo({ url: Pages.exerciseGroupEditPage });
  };

  useShareAppMessage((res) => {
    const value = (res.target as { dataset: { value?: ExercisePlanGroupItem } })
      .dataset.value;

    if (res.from === 'button' && value) {
      return {
        title: t('运动计划'),
        path: `${Pages.authPage}?tableId=${value._id}&tableName=${value.name}&page=exercisePlanJoinpage`,
      };
    } else {
      return {
        title: t('运动计划'),
        path: Pages.exercisePlanJoinpage,
      };
    }
  });

  useDidShow(() => {
    run();
  });

  useLoading(loading || deleteLoading);

  return (
    <>
      <View className={styles.container}>
        {list.map((item) => (
          <Card
            value={item}
            key={item._id}
            onDelete={(v) => {
              setActionInfo({ isOpened: true, id: v._id, name: v.name });
            }}
          />
        ))}
        {list.length === 0 && <View className={styles.empty}>{t('暂无数据')}</View>}
        <View className={styles.footer}>
          <AtButton type="primary" onClick={onCreate}>
            {t('添加新计划')}
          </AtButton>
        </View>
        <Action
          preTitle={t('计划')}
          title={actionInfo.name}
          isOpened={actionInfo.isOpened}
          onClose={() => setActionInfo({ isOpened: false, id: '', name: '' })}
          onDelete={() => deleteAsync(actionInfo.id)}
          options={[{ name: t('编辑'), fn: onEdit }]}
        />
      </View>
    </>
  );
};

export default GroupList;
