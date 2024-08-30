import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, navigateBack } from '@tarojs/taro';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';
import { ExercisePlanItem } from 'types';

import { getPlanList, patchPlanItem, postPlanItem } from '@/services/exercise';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const PlanEdit = () => {
  const { id } = getCurrentInstance().router?.params || {};
  const [value, setValue] = useState<Partial<ExercisePlanItem>>({});

  const { loading: recordLoading, run: getRecordListAsync } = useRequest(
    getPlanList,
    {
      manual: true,
      onSuccess: (res) => {
        const editData = res?.find((item) => item._id === id);

        if (editData) {
          setValue(editData);
        }
      },
    }
  );

  const { run: postItemAsync, loading: postLoading } = useRequest(
    postPlanItem,
    {
      manual: true,
      onSuccess: () => navigateBack(),
    }
  );

  const { run: patchItemAsync, loading: patchLoading } = useRequest(
    patchPlanItem,
    {
      manual: true,
      onSuccess: () => navigateBack(),
    }
  );

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({ ...prev, name: (name as string)?.trim() }));
  };

  const numChange = (
    property: 'count' | 'stepTime' | 'restTime',
    num?: number | string
  ) => {
    setValue((prev) => ({ ...prev, [property]: num }));
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: t('名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 24) {
      atMessage({
        message: t('名称字数不能超过24个字符'),
        type: 'warning',
      });
    } else if (!Number(value.count)) {
      atMessage({
        message: t('次数必填且不能为0'),
        type: 'warning',
      });
    } else if (!Number(value.stepTime)) {
      atMessage({
        message: t('每次用时必填且不能为0'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchItemAsync : postItemAsync;

      fn(value);
    }
  };

  useEffect(() => {
    getRecordListAsync();

    if (id) {
      getRecordListAsync();
    }
  }, [getRecordListAsync, id]);

  useLoading(postLoading || patchLoading || recordLoading);

  return (
    <View className={styles.container}>
      <AtMessage />

      <View className={styles.content}>
        <AtInput
          name=''
          title={`${t('名称')}：`}
          type='text'
          placeholder={t('请输入')}
          value={value.name}
          onChange={nameChange}
        />
        <AtInput
          name=''
          type='number'
          title={`${t('次数')}：`}
          placeholder={t('请输入')}
          value={value.count as string}
          onChange={(v) => numChange('count', v)}
        />
        <AtInput
          name=''
          type='number'
          title={`${t('每次用时(s)')}：`}
          placeholder={t('请输入')}
          value={value.stepTime as string}
          onChange={(v) => numChange('stepTime', v)}
        />
        <AtInput
          name=''
          type='number'
          title={`${t('休息时长(s)')}：`}
          placeholder={t('请输入')}
          value={value.restTime as string}
          onChange={(v) => numChange('restTime', v)}
        />
      </View>
      <View className={styles.footer}>
        <AtButton type='primary' onClick={onSubmit}>
          {t('保存')}
        </AtButton>
      </View>
    </View>
  );
};

export default PlanEdit;
