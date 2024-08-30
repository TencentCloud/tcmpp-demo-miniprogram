import { Text, View } from '@tarojs/components';
import { getCurrentInstance, navigateTo, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import { t } from 'i18next';
import { useState } from 'react';
import { AtButton } from 'taro-ui';

import Action from '@/components/action';
import Icon from '@/components/icon';
import { Pages } from '@/constant';
import { deleteCategory, getCategory } from '@/services/categorie';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const CategorieEdit = () => {
  const { tableId } = getCurrentInstance().router?.params || {};

  const [editInfo, setEditInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });

  const {
    data: categoryData = [],
    loading: categoryLoading,
    run: getCategoryAsync,
  } = useRequest(getCategory, { manual: true });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(
    deleteCategory,
    {
      manual: true,
      onSuccess: () => {
        setEditInfo({
          isOpened: false,
          id: '',
          name: '',
        });
        getCategoryAsync(tableId);
      },
    },
  );

  const onEdit = () => {
    navigateTo({
      url: `${Pages.categoriyConfigEditPage}?id=${editInfo.id}`,
    });
    setEditInfo({ isOpened: false, id: '', name: '' });
  };

  const addName = () => {
    navigateTo({
      url: tableId
        ? `${Pages.categoriyConfigEditPage}?tableId=${tableId}`
        : `${Pages.categoriyConfigEditPage}`,
    });
  };

  useDidShow(() => {
    getCategoryAsync(tableId);
  });

  useLoading(categoryLoading || deleteLoading);

  return (
    <>
      <View className={styles.content}>
        {categoryData.map((v) => (
          <View key={v._id} className={styles.card}>
            <Icon
              className={styles.edit}
              type="edit"
              onClick={() => {
                setEditInfo({ isOpened: true, name: v.name, id: v._id });
              }}
            />
            <View className={styles.li}>
              <Text className={styles.name}>{t('名称')}</Text>
              <Text className={classNames(styles.text, styles.title)}>
                {v.name}
              </Text>
            </View>
            <View className={styles.li}>{t('数值')}：{v.num ?? '--'}</View>
            <View className={styles.li}>
              <Text className={styles.name}>{t('颜色')}</Text>
              <Text
                className={styles.color}
                style={{
                  background: v.color,
                  color: v.color ? '#ffffff' : 'initial',
                }}
              >
                {v.color ?? '--'}
              </Text>
            </View>
            <View className={classNames(styles.li, styles.income)}>
              <Text className={styles.name}>{t('收入')}</Text>
              <Text className={styles.text}>{v.income ?? '--'}</Text>
            </View>
            <View className={classNames(styles.li, styles.outlay)}>
              <Text className={styles.name}>{t('支出')}</Text>
              <Text className={styles.text}>{v.outlay ?? '--'}</Text>
            </View>
            <View className={styles.li}>
              <Text className={styles.name}>{t('开始时间')}</Text>
              <Text className={styles.text}>{v.beginTime || '--'}</Text>
            </View>
            <View className={styles.li}>
              <Text className={styles.name}>{t('结束时间')}</Text>
              <Text className={styles.text}>{v.endTime || '--'}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className={styles.footer}>
        <AtButton type="primary" onClick={addName}>
          {t('添加名称')}
        </AtButton>
      </View>

      <Action
        preTitle={t('名称')}
        title={editInfo.name}
        isOpened={editInfo.isOpened}
        onClose={() => setEditInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => {
          deleteAsync(editInfo.id);
        }}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
    </>
  );
};

export default CategorieEdit;
