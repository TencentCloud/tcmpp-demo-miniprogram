import { Button, View } from '@tarojs/components';
import {
  atMessage,
  getCurrentInstance,
  reLaunch,
  useDidShow,
  useShareAppMessage,
} from '@tarojs/taro';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import {
  AtButton,
  AtInput,
  AtMessage,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
} from 'taro-ui';

import Action from '@/components/action';
import Icon from '@/components/icon';
import { Pages } from '@/constant';
import { getItem, patchItem } from '@/services/collaborationTable';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const initEditOption = () => ({
  id: '',
  name: '',
  isOpened: false,
});

const PeopleManagement = () => {
  const { tableId } = getCurrentInstance().router?.params || {};
  const { userInfo } = useAppSelector((state) => state.app);
  const [editModalOption, setEditModalOption] = useState(initEditOption);
  const [actionInfo, setActionInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });

  const { data, loading, run } = useRequest(() => getItem(tableId || ''), {
    manual: true,
    onSuccess: (res) => {
      if (!res?.users.find((item) => item.openid === userInfo?.openid)) {
        reLaunch({
          url: Pages.collaborationTableListPage,
        });
      }
    },
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => {
      setEditModalOption(initEditOption);
      setActionInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      run();
    },
  });

  const onEdit = () => {
    setEditModalOption({
      id: actionInfo.id,
      name: actionInfo.name,
      isOpened: true,
    });
    setActionInfo({ isOpened: false, id: '', name: '' });
  };

  const onDelete = () => {
    patchItemAsync({
      ...data,
      users: data?.users.filter((item) => item.openid !== actionInfo.id),
    });
  };

  const onSubmit = () => {
    if (!editModalOption.name) {
      atMessage({
        message: '备注名称必填',
        type: 'warning',
      });
    } else if ((editModalOption.name || '').length > 64) {
      atMessage({
        message: '备注名称字数不能超过24个字符',
        type: 'warning',
      });
    } else {
      patchItemAsync({
        ...data,
        users: data?.users.map((item) =>
          item.openid === editModalOption.id
            ? {
              ...item,
              name: editModalOption.name,
            }
            : item
        ),
      });
    }
  };

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      return {
        title: '邀请成员',
        path: `${Pages.authPage}?tableId=${data?._id}&tableName=${data?.name
          }&timestamp=${+new Date()}&page=collaborationJoinpage`,
      };
    } else {
      return {
        title: '邀请成员',
        path: Pages.collaborationTablePage,
      };
    }
  });
  useDidShow(() => {
    if (tableId) {
      run();
    }
  });

  useEffect(() => {
    if (tableId) {
      run();
    }
  }, [run, tableId]);

  useLoading(loading);

  return (
    <>
      <AtMessage />
      <View className={styles.content}>
        <View className={styles.title}>
          {t('成员人数')}：{data?.users.length || 0}
        </View>
        {data?.users.map((item) => (
          <View className={styles.li} key={item.openid}>
            <View className={styles.name}>{item.name}</View>
            {(item.openid === userInfo?.openid ||
              data.openid === userInfo?.openid) && (
                <Icon
                  className={styles.delete}
                  type="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionInfo({
                      isOpened: true,
                      id: item.openid,
                      name: item.name,
                    });
                  }}
                />
              )}
          </View>
        ))}
      </View>
      <View className={styles.footer}>
        <AtButton type="primary" openType="share">
          {t('邀请成员')}
        </AtButton>
      </View>
      <Action
        preTitle={t('成员信息')}
        deleteText={actionInfo.id === userInfo?.openid ? t('退出') : t('删除')}
        title={actionInfo.name}
        isOpened={actionInfo.isOpened}
        onClose={() => setActionInfo({ isOpened: false, id: '', name: '' })}
        onDelete={onDelete}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
      <AtModal
        isOpened={editModalOption.isOpened}
        className={styles.createModal}
        closeOnClickOverlay={false}
      >
        <AtModalHeader>{t('修改成员信息')}</AtModalHeader>
        <AtModalContent>
          <AtInput
            className={styles.input}
            name=""
            title=""
            type="text"
            placeholder={t('请输入')}
            value={editModalOption.name}
            onChange={(name: string) => {
              setEditModalOption((prev) => ({ ...prev, name }));
            }}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setEditModalOption(initEditOption)}>
            {t('取消')}
          </Button>
          <Button onClick={onSubmit} loading={patchLoading}>
            {t('确定')}
          </Button>
        </AtModalAction>
      </AtModal>
    </>
  );
};

export default PeopleManagement;
