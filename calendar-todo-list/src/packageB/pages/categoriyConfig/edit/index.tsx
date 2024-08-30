import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, navigateBack } from '@tarojs/taro';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';
import { Category } from 'types';

import ColorSelect from '@/components/colorSelect';
import Select from '@/components/select';
import {
  getCategoryById,
  patchCategory,
  postCategory,
} from '@/services/categorie';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { id, tableId } = getCurrentInstance().router?.params || {};
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);

  const [value, setValue] = useState<Partial<Category>>({});

  const { loading: getCategoryByIdLoading, run: getCategoryByIdAsync } =
    useRequest(getCategoryById, {
      manual: true,
      onSuccess: (res) => {
        if (res) setValue(res);
      },
    });

  const { run: updateAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
      },
    },
  );

  const todoColor = (color?: string) => {
    if (color && !(userInfo?.colors || []).includes(color)) {
      updateAsync({
        ...userInfo,
        colors: [...(userInfo?.colors || []), color],
      });
    }
  };

  const { run: postAsync, loading: postLoading } = useRequest(postCategory, {
    manual: true,
    onSuccess: (_, params) => {
      const color = params?.[0].color;

      todoColor(color);
      navigateBack();
    },
  });
  const { run: patchAsync, loading: patchLoading } = useRequest(patchCategory, {
    manual: true,
    onSuccess: (_, params) => {
      const color = params?.[0].color;

      todoColor(color);
      navigateBack();
    },
  });

  const timeChange = (time: string, type: 'beginTime' | 'endTime') => {
    setValue((prev) => ({ ...prev, [type]: time }));
  };

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({ ...prev, name: (name as string)?.trim() }));
  };

  const numChange = (num?: number | string) => {
    setValue((prev) => ({ ...prev, num }));
  };
  const colorChange = (color?: string) => {
    setValue((prev) => ({ ...prev, color }));
  };
  const incomeChange = (income?: number | string) => {
    setValue((prev) => ({ ...prev, income }));
  };
  const outlayChange = (outlay?: number | string) => {
    setValue((prev) => ({ ...prev, outlay }));
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: t('名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 64) {
      atMessage({
        message: t('名称字数不能超过64个字符'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.num as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.num as string)
    ) {
      atMessage({
        message: t('数值必须为数字'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.income as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.income as string)
    ) {
      atMessage({
        message: t('收入必须为数字'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.outlay as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.outlay as string)
    ) {
      atMessage({
        message: t('支出必须为数字'),
        type: 'warning',
      });
    } else if (
      (value.beginTime && !value.endTime) ||
      (!value.beginTime && value.endTime)
    ) {
      atMessage({
        message: t('开始时间和结束时间不能只出现一个'),
        type: 'warning',
      });
    } else if (value.color && !/^#[0-9a-fA-F]{6}$/.test(value.color)) {
      atMessage({
        message: t('颜色必须是#后面跟6位16进制的数字'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchAsync : postAsync;

      fn({ ...value, tableId });
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryByIdAsync(id);
    }
  }, [getCategoryByIdAsync, id]);

  useLoading(getCategoryByIdLoading || patchUserLoading);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.content}>
        <AtInput
          className={styles.input}
          name=""
          title={`${t('名称')}：`}
          type="text"
          placeholder="请输入（必填）"
          value={value.name}
          onChange={nameChange}
        />
        <AtInput
          name=""
          title={`${t('数值')}：`}
          placeholder="请输入（非必填）"
          value={value.num as string}
          onChange={numChange}
        />
        <AtInput
          name=""
          type="digit"
          title={`${t('收入')}：`}
          placeholder="请输入（非必填）"
          value={value.income as string}
          onChange={incomeChange}
        />
        <AtInput
          name=""
          type="digit"
          title={`${t('支出')}：`}
          placeholder="请输入（非必填）"
          value={value.outlay as string}
          onChange={outlayChange}
        />
        <Select
          allowClear
          title={`${t('开始时间')}：`}
          label={value.beginTime ?? ''}
          value={value.beginTime ?? ''}
          mode="time"
          onChange={({ detail: { value: v } }) => timeChange(v, 'beginTime')}
          onClear={() => timeChange('', 'beginTime')}
        />
        <Select
          allowClear
          title={`${t('结束时间')}：`}
          label={value.endTime ?? ''}
          value={value.endTime ?? ''}
          mode="time"
          onChange={({ detail: { value: v } }) => timeChange(v, 'endTime')}
          onClear={() => timeChange('', 'endTime')}
        />
        <View className={styles.tips}>
          {t('当配置了数值、收入、支出、开始时间、结束时间后，下次快速选择时会自动填充这些值。')}
        </View>
        <ColorSelect value={value.color} onChange={colorChange} />
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
