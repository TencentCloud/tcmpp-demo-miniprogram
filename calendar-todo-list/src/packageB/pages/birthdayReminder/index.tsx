import { View } from '@tarojs/components';
import { navigateTo, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtModal } from 'taro-ui';

import Action from '@/components/action';
import Empty from '@/components/empty';
import { Pages } from '@/constant';
import { deleteItem, getList } from '@/services/birthdayReminder';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';
import Lunar from '@/utils/lunar';

import Card from './card';
import styles from './index.module.less';

const BirthdayReminder = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    title: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { data: list = [], run, loading } = useRequest(getList, { manual: true });
  const { run: deleteAsync, loading: deleteLoading } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({
        isOpened: false,
        id: '',
        title: '',
      });
      run();
    },
  });

  const jumpEditPage = (url: string) => {
    setModalOpen(false);
    navigateTo({ url });
  };

  const addData = () => {
    if (!userInfo?.email) {
      setModalOpen(true);
    } else {
      jumpEditPage(Pages.birthdayReminderEditPage);
    }
  };

  useDidShow(run);

  useLoading(loading || deleteLoading);

  const nextYearData = Array.from(Array(400).keys(), v => {
    const currentDayStr = dayjs().format('MM/DD');
    const day = dayjs().add(v + 1, 'day');
    const lunar = Lunar.solar2lunar(...(day.format('YYYY/MM/DD').split('/') as [string, string, string]));

    if (lunar !== -1) {
      return {
        date: day.format('MM/DD'),
        lunar: dayjs(lunar.lunarDate).format('MM/DD'),
      };
    } else {
      return { date: currentDayStr, lunar: currentDayStr };
    }
  });

  return (
    <>
      <View className={styles.content}>
        {list.map((item) => (
          <Card
            key={item._id}
            value={item}
            onClick={() =>
              setDeleteInfo({
                isOpened: true,
                id: item._id,
                title: item.name,
              })
            }
            nextYearData={nextYearData}
          />
        ))}
        {!list.length && <Empty className={styles.empty} />}
      </View>
      <View className={styles.footer}>
        <AtButton
          type='primary'
          onClick={addData}
        >
          {t('新增提醒')}
        </AtButton>
      </View>
      <Action
        preTitle={t('姓名')}
        title={deleteInfo.title}
        isOpened={deleteInfo.isOpened}
        onClose={() => setDeleteInfo({ isOpened: false, id: '', title: '' })}
        onDelete={() => deleteAsync(deleteInfo.id)}
      />
      <AtModal
        isOpened={modalOpen}
        title={t('操作提示')}
        cancelText={t('取消')}
        confirmText={t('配置邮箱')}
        onClose={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => jumpEditPage(`${Pages.userInfoPageEdit}?type=birthday`)}
        content={t('由于你还没配置接受生日提醒的邮件地址，请先在个人信息中配置好邮箱地址后再进行该操作')}
      />
    </>
  );
};

export default BirthdayReminder;
