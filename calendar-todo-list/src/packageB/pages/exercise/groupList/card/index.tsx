import { View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { t } from 'i18next';
import { FC, useState } from 'react';
import { AtButton } from 'taro-ui';
import { ExercisePlanGroupItem, ExercisePlanItem } from 'types';

import Icon from '@/components/icon';
import { Pages } from '@/constant';

import styles from './index.module.less';

interface Props {
  value: ExercisePlanGroupItem;
  onCreatePlan?: () => void;
  onDeletePlan?: (v: { groupId: string; plan: ExercisePlanItem }) => void;
  onDelete?: (v: ExercisePlanGroupItem) => void;
}

const Card: FC<Props> = ({ value, onDelete }) => {
  const title = value.name;
  const [open, setOpen] = useState(value._id === '' ? true : false);

  return (
    <>
      <View className={styles.container}>
        {value._id !== '' && (
          <Icon
            className={styles.action}
            type="edit"
            onClick={() => onDelete?.(value)}
          />
        )}
        <View className={styles.title}>{title}</View>
        <View className={styles.subTitle}>
          {t('当前计划共{{num}}组动作', { num: value.planList?.length || 0 })}
          <View className={styles.info} onClick={() => setOpen(!open)}>
            {open ? t('收起') : t('展开')}
          </View>
        </View>
        {value.desc && (
          <View className={styles.desc}>{t('计划描述')}：{value.desc}</View>
        )}
        <View className={!open ? styles.hidden : ''}>
          {value?.planList?.map((item, index) => (
            <View className={styles.li} key={item._id}>
              <View
                className={styles.name}
              >{`${index + 1}、${item.name}`}</View>
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

        <View className={styles.exec}>
          {value._id !== '' && (
            <AtButton
              className={styles.share}
              openType="share"
              onClick={(e) => {
                e.target.dataset.value = value;
                e.stopPropagation();
              }}
            >
              <Icon className={styles.icon} value="share" size={14} />
              {t('分享该计划')}
            </AtButton>
          )}
          <View
            className={styles.bt}
            onClick={() => {
              navigateTo({
                url: `${Pages.exerciseExecPage}?id=${value._id}`,
              });
            }}
          >
            <Icon value="play" size={24} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Card;
