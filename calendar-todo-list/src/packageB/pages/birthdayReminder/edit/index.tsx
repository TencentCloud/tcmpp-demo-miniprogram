import { View } from '@tarojs/components';
import { atMessage, navigateBack } from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';

import DatePicker from '@/components/datePicker';
import Select, { SelectChild, SelectForm } from '@/components/select';
import { postItem } from '@/services/birthdayReminder';
import { showDateLabel } from '@/utils/common';
import { useRequest } from '@/utils/hooks';
import Lunar from '@/utils/lunar';

import { tipMap } from '../constant';
import { IBirthdayReminderInfo } from '../type';
import styles from './index.module.less';

const Edit = () => {
  const [value, setValue] = useState<
    Partial<IBirthdayReminderInfo> & { preDays: string[] }
  >({
    preDays: ['', '', '', '0'],
    sendTime: 8,
    type: 'new',
  });
  const lunar = Lunar.solar2lunar(...dayjs(value.date).format('YYYY/MM/DD').split('/') as [string, string, string]);

  const { run, loading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => navigateBack(),
  });

  const validate = () => {
    const message = (msg: string) => {
      atMessage({
        message: msg,
        type: 'warning',
      });
    };
    const { name, date, sendTime, type } = value;

    if (!name) {
      message(t('姓名必填'));
      return false;
    } else if (!date) {
      message(t('生日未选择'));
      return false;
    } else if (sendTime === undefined) {
      message(t('提醒时间未选择'));
      return false;
    } else if (!type) {
      message('请选择在公历提醒还是农历提醒');
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    if (validate()) {
      run(value);
    }
  };

  return (
    <View className={styles.container}>
      <AtMessage />
      <AtInput
        name=''
        
        title={`${t('姓名')}：`}
        maxlength={10}
        placeholder={t('请输入')}
        value={value.name}
        onChange={(name) =>
          setValue((prev) => ({ ...prev, name: name as string }))
        }
      />

      <Select

        title={`${t('生日')}：`}
        label={showDateLabel(value.date)}
        value={value.date?.split('/').join('-') ?? ''}
        mode="date"
        onChange={({ detail: { value: v } }) => setValue((prev) => ({ ...prev, date: v.split('-').join('/') }))}
      />
      {lunar !== -1 && i18next.language === 'zh' && (
        <AtInput
          name=''
          type='number'
          title='农历生日：'
          value={`${lunar.lYear}年${lunar.IMonthCn}${lunar.IDayCn}`}
          onChange={() => false}
          disabled
        />
      )}
      <Select

        title={`${t('提醒时间')}：`}
        label={String(value.sendTime ?? '') ? `${value.sendTime}:00` : ''}
        mode='selector'
        value={value.sendTime}
        range={new Array(24).fill(0).map((v, index) => `${v + index}:00`)}
        onChange={({ detail: { value: sendTime } }) =>
          setValue((prev) => ({ ...prev, sendTime: +sendTime }))
        }
      />
      {i18next.language === 'zh' && <Select
        title='历法：'
        label={value.type && tipMap[value.type]}
        mode='selector'
        value={value.type ? Object.keys(tipMap).indexOf(value.type) : 0}
        range={Object.values(tipMap)}
        onChange={({ detail: { value: v } }) =>
          setValue((prev) => ({ ...prev, type: Object.keys(tipMap)[v] }))
        }
      />}
      <AtInput
        name=''
        type='number'
        maxlength={2}

        title={`${t('提醒1')}：`}
        placeholder={t('天')}
        value={value.preDays?.[0]}
        onChange={(v) =>
          setValue((prev) => {
            prev.preDays[0] = v as string;
            return prev;
          })
        }
      />
      <AtInput
        name=''
        type='number'
        maxlength={2}

        title={`${t('提醒2')}：`}
        placeholder={t('天')}
        value={value.preDays?.[1]}
        onChange={(v) =>
          setValue((prev) => {
            prev.preDays[1] = v as string;
            return prev;
          })
        }
      />
      <AtInput
        name=''
        type='number'
        maxlength={2}

        title={`${t('提醒3')}：`}
        placeholder={t('天')}
        value={value.preDays?.[2]}
        onChange={(v) =>
          setValue((prev) => {
            prev.preDays[2] = v as string;
            return prev;
          })
        }
      />
      <View className={styles.tip}>{t('默认生日当天会提醒')}</View>
      {/* <AtTextarea
        value=""
        placeholder="请输入描述"
        onChange={(desc) => setValue((prev) => ({ ...prev, desc }))}
      /> */}
      <AtButton type='primary' onClick={onSubmit} loading={loading}>
        {t('保存')}
      </AtButton>
    </View>
  );
};

export default Edit;
