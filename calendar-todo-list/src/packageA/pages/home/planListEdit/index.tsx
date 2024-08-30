import { View } from '@tarojs/components';
import {
  atMessage,
  getCurrentInstance,
  navigateBack,
  useDidShow,
} from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { useState } from 'react';
import { AtButton, AtInput, AtMessage } from 'taro-ui';
import { HomeRecord } from 'types';

import TagSelect from '@/components/tagSelect';
import { ERoles } from '@/constant';
import { getCategory, postCategory } from '@/services/categorie';
import { postItem } from '@/services/plan';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { dateString } = getCurrentInstance().router?.params || {};
  const { userInfo } = useAppSelector((state) => state.app);
  const [value, setValue] = useState<Partial<HomeRecord>>({
    date: +dayjs(dateString).format('YYYYMM'),
  });

  const {
    data: categoriesAll = [],
    run: getCategoryAsync,
    loading: getCategoryLoading,
  } = useRequest(getCategory, { manual: true });
  const categories = categoriesAll.filter((item) => {
    // 不包括共享日历中的分类，互相共享
    return !item.tableId && (item.openid === userInfo?.openid || !item.openid);
  });

  const { run: postCategoryAsync, loading: postCategoryLoading } = useRequest(
    postCategory,
    {
      manual: true,
    },
  );

  const { run: postItemAsync, loading } = useRequest(postItem, {
    manual: true,
    onSuccess: (_, params) => {
      const name = params?.[0].name;

      if (name && categories.findIndex((item) => item.name === name) === -1) {
        postCategoryAsync({ name });
      }
      navigateBack();
    },
  });

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({ ...prev, name: (name as string)?.trim() }));
  };

  const numChange = (num?: number | string) => {
    setValue((prev) => ({ ...prev, num }));
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: t('计划名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 64) {
      atMessage({
        message: t('计划名称字数不能超过64个字符'),
        type: 'warning',
      });
    } else if (!Number(value.num)) {
      atMessage({
        message: t('计划次数必填且必须大于0'),
        type: 'warning',
      });
    } else {
      postItemAsync(value);
    }
  };

  useDidShow(() => {
    getCategoryAsync();
  });

  useLoading(loading || postCategoryLoading || getCategoryLoading);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.head}>
        <View>{dayjs(dateString).format(i18next.language === 'zh' ? 'YYYY年MM月' : 'MM/YYYY')}</View>
      </View>
      <View className={styles.content}>
        <TagSelect
          title={t('快速选择名称')}
          className={styles.marginTop}
          options={categories.map((item) => ({
            ...item,
            label: item.name,
            value: item._id,
            disable: item.createdRole === ERoles.manager,
          }))}
          value={value.name}
          onClick={(v) => nameChange(v?.label)}
        />
        <View className={styles.tips}>
          {t('表示本月准备完成“xx”计划多少次，打卡时应该使用该计划名称，这样每一次打卡之后才会更新该计划的进度')}
        </View>
        <AtInput
          name=""
          title={`${t('计划名称')}：`}
          type="text"
          placeholder={t('请输入计划的名称')}
          value={value.name}
          onChange={nameChange}
        />
        <AtInput
          name=""
          title={`${t('计划次数')}：`}
          type="number"
          placeholder={t('请输入计划的次数')}
          value={value.num as string}
          onChange={numChange}
        />
      </View>
      <View className={styles.footer}>
        <AtButton type="primary" onClick={onSubmit} loading={loading}>
          {t('保存')}
        </AtButton>
      </View>
    </View>
  );
};

export default Edit;
