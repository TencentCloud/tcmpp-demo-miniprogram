import { View } from '@tarojs/components';
import { navigateTo, useDidShow } from '@tarojs/taro';
import { t } from 'i18next';
import { FC, useEffect, useState } from 'react';
import { ExercisePlanItem } from 'types';

import Action from '@/components/action';
import Icon from '@/components/icon';
import { Pages } from '@/constant';
import { deletePlanItem, getPlanList } from '@/services/exercise';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

interface Props {
  onClose?: () => void;
  onCreate?: (v: ExercisePlanItem) => void;
  count?: number;
}

const PlanList: FC<Props> = ({ onClose, onCreate, count }) => {
  const [actionInfo, setActionInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });
  const {
    data: list = [],
    loading: getPlanListLoading,
    run: getPlanListAsync,
  } = useRequest(getPlanList, { manual: true });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(
    deletePlanItem,
    {
      manual: true,
      onSuccess: () => {
        setActionInfo({
          isOpened: false,
          id: '',
          name: '',
        });
        getPlanListAsync();
      },
    },
  );

  const onEdit = () => {
    navigateTo({ url: `${Pages.exercisePlanEditPage}?id=${actionInfo.id}` });
    setActionInfo({ isOpened: false, id: '', name: '' });
  };

  useEffect(() => {
    getPlanListAsync();
  }, [getPlanListAsync]);

  useDidShow(() => getPlanListAsync());

  useLoading(getPlanListLoading || deleteLoading);
  return (
    <>
      <View className={styles.modal} onClick={onClose}>
        <View
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <View className={styles.title}>{t('执行子项列表')}</View>
          <View className={styles.list}>
            {list.length === 0 && (
              <View className={styles.empty}>{t('暂无子项，请点击底部按钮新增')}</View>
            )}
            {list.map((item) => (
              <View
                className={styles.li}
                key={item._id}
                onClick={() => onCreate?.(item)}
              >
                <Icon
                  type="edit"
                  className={styles.icon}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActionInfo({
                      id: item._id,
                      name: item.name,
                      isOpened: true,
                    });
                  }}
                />
                <View className={styles.name}>{item.name}：</View>
                <View className={styles.text}>
                  {t('重复动作{{stepCount}}次，每次间隔{{stepTime}}秒，全部完成后休息{{restTime}}秒', {
                    stepCount: item.count,
                    stepTime: item.stepTime,
                    restTime: item.restTime,
                  })}
                </View>
              </View>
            ))}
          </View>
          <View
            className={styles.add}
            onClick={() => navigateTo({ url: Pages.exercisePlanEditPage })}
          >
            {t('新增子项')}
          </View>
        </View>
        <View className={styles.footer}>
          <Icon value="close-circle" className={styles.close} size={48} />
        </View>
      </View>
      <Action
        preTitle={t('子项')}
        title={actionInfo.name}
        isOpened={actionInfo.isOpened}
        onClose={() => setActionInfo({ isOpened: false, id: '', name: '' })}
        onDelete={() => deleteAsync(actionInfo.id)}
        options={[{ name: t('编辑'), fn: onEdit }]}
      />
    </>
  );
};

export default PlanList;
