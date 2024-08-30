import { View } from '@tarojs/components';
import { navigateTo, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton } from 'taro-ui';

import Action from '@/components/action';
import Empty from '@/components/empty';
import { ERoles, Pages } from '@/constant';
import { deleteItem, getList } from '@/services/holiday';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';

import Card from './card';
import styles from './index.module.less';

const Holiday = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const isManager = userInfo?.roles.includes(ERoles.manager);

  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });

  const {
    data: list = [],
    loading,
    run,
  } = useRequest(getList, { manual: true });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      run();
    },
  });

  const jumpEditPage = () => {
    navigateTo({ url: `${Pages.holidayEditPage}` });
  };

  const onEdit = () => {
    navigateTo({
      url: `${Pages.holidayEditPage}?id=${deleteInfo.id}`,
    });
    setDeleteInfo({ isOpened: false, id: '', name: '' });
  };

  const addRecord = () => {
    jumpEditPage();
  };

  useDidShow(() => {
    run();
  });
  useLoading(loading || deleteLoading);
  const dayArr = list.sort((a, b) => {
    return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1;
  });
  const cDay = dayjs();

  return (
    <>
      <View
        className={styles.content}
        style={isManager ? { height: 'auto' } : {}}
      >
        {[
          ...dayArr.filter((v) => {
            return !dayjs(v.date)
              .add(v.days - 1, 'day')
              .isBefore(cDay, 'day');
          }),
          ...dayArr.filter((v) => {
            return dayjs(v.date)
              .add(v.days - 1, 'day')
              .isBefore(cDay, 'day');
          }),
        ].map((v) => {
          return (
            <Card
              key={v._id}
              value={v}
              onDelete={(item) =>
                setDeleteInfo({
                  isOpened: true,
                  id: item._id,
                  name: item.name,
                })
              }
            />
          );
        })}
        {!list.length && <Empty className={styles.empty} />}
      </View>
      <View className={styles.footer}>
        <AtButton type="primary" onClick={addRecord}>
          {t('添加节假日')}
        </AtButton>
      </View>
      <Action
        preTitle={t('节假日')}
        title={deleteInfo.name}
        isOpened={deleteInfo.isOpened}
        onClose={() => setDeleteInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => deleteAsync(deleteInfo.id)}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
    </>
  );
};

export default Holiday;
