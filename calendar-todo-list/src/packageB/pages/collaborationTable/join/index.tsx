import { View } from '@tarojs/components';
import {
  atMessage,
  getCurrentInstance,
  reLaunch,
  useDidShow,
} from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';

import { Pages } from '@/constant';
import { getItem, postUser } from '@/services/collaborationTable';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';
import dayjs from 'dayjs';

const PeopleManagement = () => {
  const { tableId, tableName, timestamp } =
    getCurrentInstance().router?.params || {};
  const dispatch = useAppDispatch();
  const { userInfo, loading: userLoading } = useAppSelector(
    (state) => state.app
  );
  const [editModalOption, setEditModalOption] = useState({ name: '' });

  const { data, loading, run } = useRequest(() => getItem(tableId || ''), {
    manual: true,
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(postUser, {
    manual: true,
    onSuccess: () => {
      atMessage({
        message: '加入成功',
        type: 'success',
      });
      run();
    },
  });

  const onSubmit = () => {
    if (timestamp && dayjs().isAfter(dayjs(Number(timestamp)).add(4, 'hour'))) {
      atMessage({
        message: '链接已失效，请重新获取链接',
        type: 'warning',
      });
    } else if (!editModalOption.name) {
      atMessage({
        message: '用户名称必填',
        type: 'warning',
      });
    } else if ((editModalOption.name || '').length > 64) {
      atMessage({
        message: '用户名称字数不能超过24个字符',
        type: 'warning',
      });
    } else {
      if (tableId && userInfo) {
        patchItemAsync({
          _id: tableId,
          user: {
            openid: userInfo.openid,
            name: editModalOption.name,
          },
        });
      } else {
        atMessage({
          message: '您还未登录，请登录后重试',
          type: 'warning',
        });
      }
    }
  };

  useDidShow(() => {
    dispatch(getUserInfo());
    if (tableId) {
      run();
    }
  });

  useEffect(() => {
    if (tableId) {
      run();
    }
  }, [run, tableId]);

  useLoading(loading || userLoading);

  const isUser = data?.users.find((item) => item.openid === userInfo?.openid);

  return (
    <>
      <AtMessage />
      <View className={styles.content}>
        <View className={styles.title}>{`共享日历：${tableName || ''}`}</View>
        {!isUser && (
          <>
            <AtInput
              name=""
              title="用户名称"
              type="text"
              placeholder="请输入用户名称"
              value={editModalOption.name}
              onChange={(name: string) => {
                setEditModalOption((prev) => ({ ...prev, name }));
              }}
            />
            <AtButton
              className={styles.button}
              type="primary"
              onClick={onSubmit}
              loading={patchLoading}
              disabled={Boolean(isUser)}
            >
              {isUser ? '您已经加入该共享日历' : '确认加入'}
            </AtButton>
          </>
        )}
        {isUser && (
          <>
            <View className={styles.text}>您已经加入该共享日历</View>
            <AtButton
              className={styles.button}
              type="primary"
              onClick={() => {
                reLaunch({ url: Pages.collaborationTableListPage });
              }}
              loading={patchLoading}
            >
              查看日历
            </AtButton>
          </>
        )}
      </View>
    </>
  );
};

export default PeopleManagement;
