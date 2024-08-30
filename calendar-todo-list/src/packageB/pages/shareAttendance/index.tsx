import { Text, View } from '@tarojs/components';
import { atMessage, setClipboardData } from '@tarojs/taro';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';

import Action from '@/components/action';
import Empty from '@/components/empty';
import Icon from '@/components/icon';
import {
  deleteItem,
  getCode,
  getList,
  getSharedList,
  postItem,
} from '@/services/shareAttendanceMap';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const ShareAttendance = () => {
  const [value, setValue] = useState({
    name: '',
    code: '',
  });

  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
    preTitle: '',
    openid: '',
  });

  const {
    data: sharedList,
    loading: sharedLoading,
    run: getSharedListAsync,
  } = useRequest(getSharedList);
  const {
    data: list,
    loading: listLoading,
    run: getListAsync,
  } = useRequest(getList);
  const { data, loading } = useRequest(getCode);
  const { run: postItemAsync, loading: postItemLoading } = useRequest(
    postItem,
    {
      manual: true,
      onError: (err) => {
        atMessage({
          message: err,
          type: 'error',
        });
      },
      onSuccess: () => {
        atMessage({
          message: '操作成功',
          type: 'success',
        });
        getListAsync();
        getSharedListAsync();
      },
    }
  );

  const { run: deleteItemAsync, loading: deleteItemLoading } = useRequest(
    deleteItem,
    {
      manual: true,
      onError: (err) => {
        atMessage({
          message: err,
          type: 'error',
        });
      },
      onSuccess: () => {
        getListAsync();
        getSharedListAsync();
        onActionClose();
      },
    }
  );

  const onActionClose = () => {
    setDeleteInfo({
      isOpened: false,
      id: '',
      name: '',
      preTitle: '',
      openid: '',
    });
  };

  const onSubmit = async () => {
    if (!value.code) {
      atMessage({
        message: t('共享码必填'),
        type: 'warning',
      });
    } else if (!value.name) {
      atMessage({
        message: t('备注名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 12) {
      atMessage({
        message: t('备注名字数不能超过12个字符'),
        type: 'warning',
      });
    } else {
      postItemAsync(value);
    }
  };

  useLoading(
    loading ||
    sharedLoading ||
    listLoading ||
    postItemLoading ||
    deleteItemLoading
  );
  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.myCode}>
        <Text user-select>{t('我的共享码')}：{data?.code}</Text>
        <Icon
          type='copy'
          size={15}
          className={styles.copy}
          onClick={() => {
            setClipboardData({ data: data?.code || '' });
          }}
        />
      </View>
      <AtInput
        name=''
        title={`${t('共享码')}：`}
        placeholder={t('请输入')}
        value={value.code}
        onChange={(code: string) => setValue((prev) => ({ ...prev, code }))}
      />
      <AtInput
        name=''
        title={`${t('备注名称')}：`}
        type='text'
        placeholder={t('请输入')}
        value={value.name}
        onChange={(name: string) => setValue((prev) => ({ ...prev, name }))}
      />
      <AtButton type='primary' className={styles.button} onClick={onSubmit}>
        {t('绑定')}
      </AtButton>
      <View className={styles.tips}>
        {t('在表单中输入对方共享码绑定后，可以在自己的打卡视图中使用对方的数据，但对方并不能使用自己的数据，可以交换绑定彼此的共享码实现双方数据共享。')}
      </View>
      <View className={styles.list}>
        <View className={styles.title}>{t('已被关联')}</View>
        {sharedList?.map((item) => (
          <View className={styles.li} key={item._id}>
            {item.openid}
            <Icon
              className={styles.edit}
              value='trash'
              size={16}
              onClick={() =>
                setDeleteInfo({
                  openid: item.openid,
                  isOpened: true,
                  id: item._id,
                  name: item.openid,
                  preTitle: t('取消分享'),
                })
              }
            />
          </View>
        ))}
        {!sharedList?.length && <Empty />}
        <View className={styles.title}>{t('已关联')}</View>
        {list?.map((item) => (
          <View className={styles.li} key={item._id}>
            <Text>{item.shareName}</Text>
            <Icon
              className={styles.edit}
              value='trash'
              size={16}
              onClick={() =>
                setDeleteInfo({
                  openid: item.openid,
                  isOpened: true,
                  id: item._id,
                  name: item.shareName,
                  preTitle: t('取消查看'),
                })
              }
            />
          </View>
        ))}
        {!list?.length && <Empty />}
      </View>
      <Action
        preTitle={deleteInfo.preTitle}
        title={deleteInfo.name}
        isOpened={deleteInfo.isOpened}
        onClose={onActionClose}
        onDelete={() => deleteItemAsync(deleteInfo.id)}
        deleteText={t('确定')}
      />
    </View>
  );
};

export default ShareAttendance;
