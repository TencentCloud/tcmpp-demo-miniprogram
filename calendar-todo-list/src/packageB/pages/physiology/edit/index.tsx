import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, navigateBack } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { Physiology } from 'types';

import Select from '@/components/select';
import { getItem, patchItem, postItem } from '@/services/physiology';
import { showDateLabel } from '@/utils/common';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const initValue = () => {
  const beginDate = dayjs().format('YYYY/MM/DD');
  const endDate = dayjs().format('YYYY/MM/DD');
  const menstrualDays = dayjs(endDate).diff(beginDate, 'day') + 1;

  return {
    cycle: 28,
    beginDate,
    endDate,
    menstrualDays,
    desc: '',
  };
};

const Edit = () => {
  const { id } = getCurrentInstance().router?.params || {};

  const [value, setValue] = useState<Partial<Physiology>>(initValue);
  const [cycleOpt, setCycleOpt] = useState({ beginDate: '', endDate: '' });

  const { loading: getItemLoading, run: getItemAsync } = useRequest(getItem, {
    manual: true,
    onSuccess: (res) => {
      if (res) {
        setValue(res);
      }
    },
  });

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => {
      navigateBack();
    },
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => {
      navigateBack();
    },
  });

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
  };

  const dateChange = (date: string, type: 'beginDate' | 'endDate') => {
    setValue((prev) => {
      const nextV = { ...prev, [type]: date.split('-').join('/') };

      return {
        ...nextV,
        menstrualDays:
          dayjs(nextV['endDate']).diff(nextV['beginDate'], 'day') + 1,
      };
    });
  };

  const cycleOptChange = (date: string, type: 'beginDate' | 'endDate') => {
    setCycleOpt((prev) => {
      const nextV = { ...prev, [type]: date.split('-').join('/') };
      const cycle = dayjs(nextV['endDate']).diff(nextV['beginDate'], 'day') + 1;

      if (nextV.beginDate && nextV.endDate && cycle >= 1 && cycle <= 90) {
        setValue((p) => ({ ...p, cycle }));
      }
      return nextV;
    });
  };

  const onSubmit = () => {
    if (!value.cycle) {
      atMessage({
        message: t('间隔周期必填'),
        type: 'warning',
      });
    } else if (!value.beginDate) {
      atMessage({
        message: t('开始日期必填'),
        type: 'warning',
      });
    } else if (!value.endDate) {
      atMessage({
        message: t('结束日期必填'),
        type: 'warning',
      });
    } else if (dayjs(value.endDate).isBefore(value.beginDate, 'day')) {
      atMessage({
        message: t('结束日期必须大于等于开始日期'),
        type: 'warning',
      });
    } else if ((value.desc || '').length > 2000) {
      atMessage({
        message: t('备注字数不能超过2000个字符'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchItemAsync : postItemAsync;

      fn(value);
    }
  };

  useEffect(() => {
    if (id) {
      getItemAsync(id);
    }
  }, [getItemAsync, id]);

  useLoading(getItemLoading);
  const cycleOptions = Array.from(Array(76).keys(), (v) => v + 15);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.content}>
        <Select
          title={`${t('1次开始')}：`}
          label={showDateLabel(cycleOpt.beginDate)}
          value={cycleOpt.beginDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) =>
            cycleOptChange(v, 'beginDate')
          }
          placeholder={t('辅助计算')}
        />
        <Select
          title={`${t('2次开始')}：`}
          label={showDateLabel(cycleOpt.endDate)}
          value={cycleOpt.endDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => cycleOptChange(v, 'endDate')}
          placeholder={t('辅助计算')}
        />
        <View className={styles.tips}>
          {t('间隔周期指两次开始时间的间隔天数，比如第一次是1月1日开始，第二次是1月29日开始，那么间隔周期为28天；“1次开始”和“2次开始”仅为了辅助计算“间隔周期”，如果知道具体天数可以直接填写“间隔周期”。')}
        </View>
        <Select
          title={`${t('间隔周期')}：`}
          label={`${value.cycle}${t('天')}`}
          value={cycleOptions.findIndex((v) => v === value.cycle)}
          range={cycleOptions}
          onChange={({ detail: { value: v } }) =>
            setValue?.((prev) => ({ ...prev, cycle: cycleOptions[v] }))
          }
        />
        <Select
          title={`${t('开始日期')}：`}
          label={showDateLabel(value.beginDate)}
          value={value.beginDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => dateChange(v, 'beginDate')}
        />
        <Select
          title={`${t('结束日期')}：`}
          label={showDateLabel(value.endDate)}
          value={value.endDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => dateChange(v, 'endDate')}
        />
        <AtInput
          name=""
          title={`${t('持续天数')}：`}
          disabled
          value={`${value.menstrualDays}`}
          onChange={(v) => {
            setValue((prev) => ({ ...prev, menstrualDays: v as number }));
          }}
        />
        <AtTextarea
          className={styles.marginTop}
          value={value.desc ?? ''}
          placeholder={t('请输入备注')}
          maxLength={2000}
          height={200}
          onChange={descChange}
          count
        />
      </View>
      <View className={styles.footer}>
        <AtButton
          type="primary"
          onClick={onSubmit}
          loading={patchLoading || postLoading}
        >
          {t('保存')}
        </AtButton>
      </View>
    </View>
  );
};

export default Edit;
