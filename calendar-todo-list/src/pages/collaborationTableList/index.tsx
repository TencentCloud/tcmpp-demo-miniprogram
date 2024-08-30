import { View } from '@tarojs/components';
import {
  atMessage,
  useDidHide,
  useDidShow,
  useShareAppMessage,
} from '@tarojs/taro';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';
import { CollaborationTable as TCollaborationTable } from 'types';

import Action from '@/components/action';
import Empty from '@/components/empty';
import Mask from '@/components/mask';
import Modal from '@/components/modal';
import { Pages } from '@/constant';
import {
  deleteItem,
  getList,
  patchItem,
  postItem,
} from '@/services/collaborationTable';
import { getUserInfo } from '@/store/app';
import { useAppDispatch, useLoading, useRequest } from '@/utils/hooks';

import Card from './card';
import styles from './index.module.less';

const initCreateTable = () => ({
  id: '',
  name: '',
  isOpened: false,
});

const CollaborationTable = () => {
  const dispatch = useAppDispatch();
  const didMount = useRef({ list: false });
  const [editModalOption, setEditModalOption] = useState(initCreateTable);
  const [actionInfo, setActionInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });
  const {
    data: list = [],
    run: getListAsync,
    loading,
  } = useRequest(getList, {
    manual: true,
    onSuccess: () => setEditModalOption(initCreateTable),
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => getListAsync(),
  });

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => getListAsync(),
  });

  const { run: deleteAsync } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setActionInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      getListAsync();
    },
  });

  const onEdit = () => {
    setActionInfo({ isOpened: false, id: '', name: '' });
    setEditModalOption({
      id: actionInfo.id,
      name: actionInfo.name,
      isOpened: true,
    });
  };

  const onSubmit = () => {
    if (!editModalOption.name) {
      atMessage({
        message: t('日历名称必填'),
        type: 'warning',
      });
    } else if ((editModalOption.name || '').length > 64) {
      atMessage({
        message: t('日历名称字数不能超过64个字符'),
        type: 'warning',
      });
    } else {
      const fn = editModalOption.id ? patchItemAsync : postItemAsync;

      fn({ _id: editModalOption.id, name: editModalOption.name });
    }
  };

  useShareAppMessage((res) => {
    const value = (res.target as { dataset: { value?: TCollaborationTable } })
      .dataset.value;

    if (res.from === 'button' && value) {
      return {
        title: t('邀请成员'),
        path: `${Pages.authPage}?tableId=${value._id}&tableName=${value.name
          }&timestamp=${+new Date()}&page=collaborationJoinpage`,
      };
    } else {
      return {
        title: t('邀请成员'),
        path: Pages.collaborationJoinpage,
      };
    }
  });

  useDidShow(() => {
    getListAsync();
    dispatch(getUserInfo());
  });

  useEffect(() => {
    if (didMount.current.list) {
      getListAsync();
    } else {
      didMount.current.list = true;
    }
  }, [getListAsync]);

  useDidHide(() => {
    setEditModalOption(initCreateTable);
  });

  useLoading(loading);
  return (
    <>
      <Mask />
      <AtMessage />
      <View className={styles.content}>
        <View className={styles.header}>
          
          {t('您可以在此创建一个共享日历，该日历的数据会独立于首页的日历保存，在这个日历中你可以邀请其他用户共同维护数据，常用于多员工客房预订记录、会议室预定记录、其他多用户协同数据记录等。')}
        </View>
        {list.map((item) => (
          <Card key={item._id} value={item} setActionInfo={setActionInfo} />
        ))}
        {!list.length && <Empty className={styles.empty} desc={t('共享日历')} />}
      </View>
      <View className={styles.footer}>
        <AtButton
          type="primary"
          onClick={() => {
            setEditModalOption({ ...initCreateTable(), isOpened: true });
          }}
        >
          {t('添加日历')}
        </AtButton>
      </View>
      <Action
        preTitle={t('共享表格')}
        title={actionInfo.name}
        isOpened={actionInfo.isOpened}
        onClose={() => setActionInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => deleteAsync(actionInfo.id)}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
      {editModalOption.isOpened && (
        <Modal
          isOpened={editModalOption.isOpened}
          onCancel={() => setEditModalOption(initCreateTable)}
          onOk={onSubmit}
          loading={postLoading || patchLoading}
          title={t('添加日历')}
        >
          <AtInput
            className={styles.input}
            name=""
            title=""
            type="text"
            placeholder={t('请输入日历名称')}
            value={editModalOption.name}
            onChange={(name: string) =>
              setEditModalOption((prev) => ({ ...prev, name }))
            }
          />
        </Modal>
      )}
    </>
  );
};

export default CollaborationTable;
