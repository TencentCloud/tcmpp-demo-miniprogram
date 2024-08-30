import { View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import { useState } from 'react';
import { AtButton, AtInput, AtTextarea } from 'taro-ui';

import Modal from '@/components/modal';
import {
  deleteItem as deleteAnnouncement,
  getList as getAnnouncement,
  postItem as postAnnouncement,
} from '@/services/publicData';
import { getStatistics as getUserStatistics } from '@/services/user';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const Manager = () => {
  const [editModalOption, setEditModalOption] = useState({
    open: false,
    name: '',
    desc: '',
  });
  const {
    data: userStatistics,
    run: getUserAsync,
    loading: userLoading,
  } = useRequest(getUserStatistics, { manual: true });

  const {
    run: getAnnouncementAsync,
    data: announcement,
    loading: getAnnouncementLoading,
  } = useRequest(() => getAnnouncement('announcement'), {
    manual: true,
  });

  const { run: postAnnouncementAsync, loading: postAnnouncementLoading } =
    useRequest(postAnnouncement, {
      manual: true,
      onSuccess: () => {
        setEditModalOption({
          open: false,
          name: '',
          desc: '',
        });
        getAnnouncementAsync();
      },
    });
  const { run: deleteAnnouncementAsync, loading: deleteAnnouncementLoading } =
    useRequest(deleteAnnouncement, {
      manual: true,
      onSuccess: () => {
        setEditModalOption({
          open: false,
          name: '',
          desc: '',
        });
        getAnnouncementAsync();
      },
    });

  const onSubmit = async () => {
    if (announcement) {
      await deleteAnnouncementAsync(announcement._id);
      postAnnouncementAsync(
        [{ desc: editModalOption.desc, name: editModalOption.name }],
        'announcement'
      );
    } else {
      postAnnouncementAsync(
        [{ desc: editModalOption.desc, name: editModalOption.name }],
        'announcement'
      );
    }
  };

  useDidShow(() => {
    getUserAsync();
    getAnnouncementAsync();
  });

  useLoading(
    userLoading ||
      getAnnouncementLoading ||
      postAnnouncementLoading ||
      deleteAnnouncementLoading
  );

  return (
    <>
      {userStatistics?.lastWeekCount.map((item) => (
        <View className={styles.li} key={item.date}>
          <View>{item.date}注册人数</View>
          <View>{item.count}</View>
        </View>
      ))}
      <View className={styles.li}>
        <View>邮箱注册人数</View>
        <View>{userStatistics?.emailCount}</View>
      </View>

      <View className={classNames(styles.li)}>
        <View>当前注册人数</View>
        <View>{userStatistics?.count}</View>
      </View>
      <View
        className={styles.announcement}
        onClick={() => {
          setEditModalOption({
            open: true,
            desc: announcement?.data[0].desc || '',
            name: announcement?.data[0].name || '',
          });
        }}
      >
        公告：
        {announcement?.data[0].desc || announcement?.data[0].name || '暂无'}
      </View>
      <Modal
        isOpened={editModalOption.open}
        onCancel={() => setEditModalOption({ open: false, name: '', desc: '' })}
        okText="发布公告"
        onOk={onSubmit}
      >
        <AtInput
          name=""
          title=""
          type="text"
          placeholder="请输入公告标题"
          value={editModalOption.name}
          onChange={(name: string) => {
            setEditModalOption((prev) => ({ ...prev, name }));
          }}
        />
        <AtTextarea
          value={editModalOption.desc || ''}
          placeholder="请输入公告内容"
          maxLength={1000}
          height={300}
          onChange={(desc) => {
            setEditModalOption((prev) => ({ ...prev, desc }));
          }}
          count
        />
        <AtButton
          className={styles.marginTop}
          onClick={() => {
            if (announcement) {
              deleteAnnouncementAsync(announcement?._id);
            }
          }}
        >
          删除
        </AtButton>
      </Modal>
    </>
  );
};

export default Manager;
