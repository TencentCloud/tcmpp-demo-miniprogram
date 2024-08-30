import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, getSetting, navigateBack, openSetting, requestSubscribeMessage } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { Schedule } from 'types';

import Select from '@/components/select';
import Switch from '@/components/switch';
import { getList, patchItem, postItem } from '@/services/schedule';
import { getDate } from '@/utils/common';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { dateString, id } = getCurrentInstance().router?.params || {};
  const { dateNum } = getDate(dateString);
  const [value, setValue] = useState<Partial<Omit<Schedule, 'time'> & { time: string }>>({
    date: dateNum,
    remindStatus: false,
  });


  const {
    loading: recordLoading,
    run: getRecordListAsync,
  } = useRequest(getList, {
    manual: true, onSuccess: res => {
      const editData = res?.find(item => item._id === id);

      if (editData) {
        const { time, ...rest } = editData;

        setValue({ ...rest, time: dayjs(time).format('HH:mm'), remindStatus: false });
      }
    }
  });

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => navigateBack(),
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => navigateBack(),
  });

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
  };

  const timeChange = (time?: string) => {
    setValue((prev) => ({ ...prev, time }));
  };

  const remindStatusChange = (remindStatus?: boolean) => {
    const tmplId = 'T0zTVhXypN05SAEK14OuYIW56xbwmfv-rjTziPR-YQc';

    if (remindStatus) {
      getSetting({
        withSubscriptions: true,
        success: function (settingRes) {
          if (!settingRes['subscriptionsSetting']['mainSwitch'] || settingRes['subscriptionsSetting'][tmplId] === 'reject') {
            atMessage({
              message: '请在当前小程序设置中允许接受订阅消息',
              type: 'warning',
            });
            openSetting();
          } else {
            requestSubscribeMessage({
              tmplIds: [tmplId],
              success: res => {
                if (res[tmplId] === 'accept') {
                  setValue((prev) => ({ ...prev, remindStatus }));
                }
              }
            });
          }
        }
      });
    } else {
      setValue((prev) => ({ ...prev, remindStatus }));
    }
  };


  const nameChange = (title?: string | number) => {
    setValue((prev) => ({ ...prev, title: (title as string)?.trim() }));
  };

  const onSubmit = () => {
    if (!value.title) {
      atMessage({
        message: t('事件标题必填'),
        type: 'warning',
      });
    } else if ((value.title || '').length > 12) {
      atMessage({
        message: t('事件标题字数不能超过12个字符'),
        type: 'warning',
      });
    } else if (!value.time) {
      atMessage({
        message: t('事件时间必填'),
        type: 'warning',
      });
    } else if ((value.desc || '').length > 200) {
      atMessage({
        message: t('备注字数不能超过200个字符'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchItemAsync : postItemAsync;
      const { time, ...rest } = value;
      const [hour = 0, minute = 0] = time.split(':');

      fn({ ...rest, time: dayjs(dateString).hour(+hour).minute(+minute).valueOf() });
    }
  };

  useEffect(() => {
    if (id) {
      getRecordListAsync({ date: dateNum });
    }
  }, [dateNum, getRecordListAsync, id]);

  useLoading(postLoading || patchLoading || recordLoading);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.head}>
        <View>{getDate(dateString).title}</View>
      </View>
      <View className={styles.content}>
        <AtInput
          name=''
          title={`${t('事件标题')}：`}
          type='text'
          placeholder={t('请输入事件标题')}
          value={value.title}
          onChange={nameChange}
        />
        <Select
          title={`${t('事件时间')}：`}
          label={value.time ?? ''}
          value={value.time ?? ''}
          mode='time'
          onChange={({ detail: { value: v } }) => timeChange(v)}
        />
        {/* <Switch
          title='微信提醒：'
          value={value.remindStatus}
          onChange={remindStatusChange}
        />
        <View className={styles.tips}>
          {'请确保小程序中 “设置 -> 通知管理 -> 接受通知” 开启，且允许简云日历发送“日程提醒”通知。点击开启时因需要查询微信通知设置信息，稍有延时请耐心等待'}
        </View>*/}
        <AtTextarea
          className={styles.marginTop}
          value={value.desc ?? ''}
          placeholder={t('请输入备注')}
          maxLength={200}
          height={200}
          onChange={descChange}
          count
        />
      </View>
      <View className={styles.footer}>
        <AtButton
          type='primary'
          onClick={onSubmit}
        >
          {t('保存')}
        </AtButton>
      </View>
    </View >
  );
};

export default Edit;
