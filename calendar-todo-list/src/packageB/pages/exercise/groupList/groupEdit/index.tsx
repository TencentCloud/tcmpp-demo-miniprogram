import { View } from '@tarojs/components';
import { atMessage, getCurrentInstance, navigateBack } from '@tarojs/taro';
import { t } from 'i18next';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { ExercisePlanGroupItem } from 'types';

import Empty from '@/components/empty';
import Icon from '@/components/icon';
import {
  getGroupList,
  patchGroupItem,
  postGroupItem,
} from '@/services/exercise';
import { useLoading, useRequest } from '@/utils/hooks';

import PlanList from '../planList';
import styles from './index.module.less';

const GroupEdit = () => {
  const { id } = getCurrentInstance().router?.params || {};
  const [value, setValue] = useState<Partial<ExercisePlanGroupItem>>({});
  const [modalOpen, setModalOpen] = useState(false); // 执行子项

  const { loading: recordLoading, run: getRecordListAsync } = useRequest(
    getGroupList,
    {
      manual: true,
      onSuccess: (res) => {
        const editData = res?.find((item) => item._id === id);

        if (editData) {
          setValue(editData);
        }
      },
    },
  );

  const { run: postItemAsync, loading: postLoading } = useRequest(
    postGroupItem,
    {
      manual: true,
      onSuccess: () => navigateBack(),
    },
  );

  const { run: patchItemAsync, loading: patchLoading } = useRequest(
    patchGroupItem,
    {
      manual: true,
      onSuccess: () => navigateBack(),
    },
  );

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({ ...prev, name: (name as string)?.trim() }));
  };

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
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
    } else if (!value.planList?.length) {
      atMessage({
        message: t('请添加至少一个执行子项'),
        type: 'warning',
      });
    } else if ((value.desc || '').length > 500) {
      atMessage({
        message: t('备注字数不能超过500个字符'),
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
    <>
      <View className={modalOpen ? styles.container : ''}>
        <AtMessage />

        <View className={styles.content}>
          <AtInput
            name=""
            title={`${t('名称')}：`}
            type="text"
            placeholder={t('请输入')}
            value={value.name}
            onChange={nameChange}
          />
          <View className={styles.list}>
            {!value?.planList?.length && <Empty desc={t('执行子项数据')} />}
            {value?.planList?.map((item, index) => (
              <View className={styles.li} key={item._id}>
                <View
                  className={styles.name}
                >{`${t('第{{num}}组', { num: index + 1 })}：${item.name}`}</View>
                <View className={styles.text}>
                  {t('重复动作{{stepCount}}次，每次间隔{{stepTime}}秒，全部完成后休息{{restTime}}秒', {
                    stepCount: item.count,
                    stepTime: item.stepTime,
                    restTime: item.restTime,
                  })}
                </View>
                <Icon
                  value="trash"
                  className={styles.delete}
                  size={18}
                  onClick={() => {
                    setValue((prev) => ({
                      ...prev,
                      planList: (prev.planList || []).filter(
                        (v) => v._id !== item._id,
                      ),
                    }));
                  }}
                />
              </View>
            ))}
          </View>
          <AtTextarea
            className={styles.marginTop}
            value={value.desc ?? ''}
            placeholder={t('请输入备注')}
            maxLength={500}
            height={150}
            onChange={descChange}
            count
          />
        </View>
        <View className={styles.footer}>
          <AtButton onClick={() => setModalOpen(true)} className={styles.bt}>
            {t('添加执行子项')}
          </AtButton>
          <AtButton type="primary" onClick={onSubmit} className={styles.bt}>
            {t('保存')}
          </AtButton>
        </View>
      </View>
      {modalOpen && (
        <PlanList
          onClose={() => setModalOpen(false)}
          onCreate={(v) => {
            setValue((prev) => ({
              ...prev,
              planList: [
                ...(prev.planList || []),
                { ...v, _id: uniqueId(v._id) },
              ],
            }));
          }}
          count={value.planList?.length}
        />
      )}
    </>
  );
};

export default GroupEdit;
