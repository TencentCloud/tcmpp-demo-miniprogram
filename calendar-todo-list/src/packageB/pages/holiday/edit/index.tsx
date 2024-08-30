import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, navigateBack } from '@tarojs/taro';
import i18next, { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { HolidayItem } from 'types';

import DateSelect from '@/components/dateSelect';
import Select from '@/components/select';
import Switch from '@/components/switch';
import { ERoles } from '@/constant';
import { getItem, patchItem, postItem } from '@/services/holiday';
import { getHolidayList } from '@/store/dictionary';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const { id } = getCurrentInstance().router?.params || {};
  const [value, setValue] = useState<Partial<HolidayItem>>({});
  const dispatch = useAppDispatch();

  const { loading: recordLoading, run: getRecordListAsync } = useRequest(
    getItem,
    {
      manual: true,
      onSuccess: (res) => {
        if (res) setValue(res);
      },
    },
  );

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => {
      dispatch(getHolidayList());
      navigateBack();
    },
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => {
      dispatch(getHolidayList());
      navigateBack();
    },
  });

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
  };

  const dateChange = (date: string) => {
    setValue((prev) => ({ ...prev, date: date.split('-').join('/') }));
  };

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({ ...prev, name: (name as string)?.trim() }));
  };
  const subNameChange = (subName?: string | number) => {
    setValue((prev) => ({ ...prev, subName: (subName as string)?.trim() }));
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: t('节日名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 64) {
      atMessage({
        message: t('节日名称名称字数不能超过64个字符'),
        type: 'warning',
      });
    } else if ((value.subName || '').length > 4) {
      atMessage({
        message: t('节日简称字数不能超过4个字符'),
        type: 'warning',
      });
    } else if (!value.date) {
      atMessage({
        message: t('开始日期必填'),
        type: 'warning',
      });
    } else if (value.days === undefined) {
      atMessage({
        message: t('持续天数必填'),
        type: 'warning',
      });
    } else if ((value.desc || '').length > 1024) {
      atMessage({
        message: t('备注字数不能超过1024个字符'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchItemAsync : postItemAsync;

      fn(value);
    }
  };

  useEffect(() => {
    if (id) {
      getRecordListAsync(id);
    }
  }, [getRecordListAsync, id]);

  useLoading(recordLoading);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.content}>
        <AtInput
          className={styles.input}
          name=""
          title={`${t('节日名称')}：`}
          type="text"
          placeholder={t('请输入')}
          value={value.name}
          onChange={nameChange}
        />
        <AtInput
          className={styles.input}
          name=""
          title={`${t('节日简称')}：`}
          type="text"
          placeholder={t('请输入')}
          value={value.subName}
          onChange={subNameChange}
        />
        <View className={styles.tips}>
          {t('节日简称不超过4个字符，该简称会展示在首页日历中，如果未配置简称，首页日历展示时会对过长的节日名称做截取。')}
        </View>
        <Select
          title={`${t('开始日期')}：`}
          label={value.date ?? ''}
          value={value.date?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => dateChange(v)}
        />
        <AtInput
          name=""
          title={`${t('持续天数')}：`}
          placeholder={t('请输入')}
          type="number"
          value={value.days as unknown as string}
          onChange={(days) => {
            setValue((prev) => ({ ...prev, days: days as number }));
          }}
        />
        {i18next.language === 'zh' && <DateSelect
          title="补班日期："
          label={
            value.workDays?.length ? `${value.workDays.length}个日期` : '无'
          }
          value={value.workDays}
          onChange={(v) => setValue((prev) => ({ ...prev, workDays: v }))}
        />}
        {userInfo?.roles.includes(ERoles.manager) && (
          <Switch
            title={`${t('法定假期')}：`}
            value={value.createdRole === ERoles.manager}
            onChange={(v) =>
              setValue((prev) => ({
                ...prev,
                createdRole: v ? ERoles.manager : ERoles.default,
              }))
            }
          />
        )}
        <AtTextarea
          className={styles.marginTop}
          value={value.desc ?? ''}
          placeholder={t('请输入备注')}
          maxLength={200}
          height={200}
          onChange={descChange}
          count
        />
        <View className={styles.tips}>
          {t('该节日仅展示在个人的日历中，其他用户并不可见。')}
        </View>
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
