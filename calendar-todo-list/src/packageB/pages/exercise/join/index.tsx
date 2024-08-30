import { View } from '@tarojs/components';
import {
  atMessage,
  getCurrentInstance,
  reLaunch,
  useDidShow,
} from '@tarojs/taro';
import { AtButton, AtMessage } from 'taro-ui';

import { Pages } from '@/constant';
import { getGroupItem, postGroupItem } from '@/services/exercise';
import {
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';

const ExerciseJoin = () => {
  const { tableId } = getCurrentInstance().router?.params || {};

  const { data, loading, run: getGroupItemAsync } = useRequest(getGroupItem, { manual: true });
  const { loading: postGroupItemLoading, run: postGroupItemAsync } = useRequest(postGroupItem, {
    manual: true, onSuccess: () => {

      atMessage({
        message: '加入成功',
        type: 'success',
      });

      reLaunch({ url: Pages.exerciseGrroupListPage });
    }
  });

  const onSubmit = () => {

    if (data) {
      const { _id, ...req } = data;

      postGroupItemAsync(req);
    }
  };

  useDidShow(() => {
    if (tableId) {
      getGroupItemAsync(tableId);
    }
  });

  useLoading(loading);

  return (
    <>
      <AtMessage />
      <View className={styles.content}>
        <View className={styles.container}>
          <View className={styles.title}>{data?.name}</View>
          {data?.desc && (<View className={styles.desc}>
            计划描述：{data.desc}
          </View>)}
          {data?.planList?.map((item, index) => (
            <View className={styles.li} key={item._id}>
              <View className={styles.name}>{`${index + 1}、${item.name}`}</View>
              <View className={styles.text}>
                {`重复动作 ${item.count}次，每次间隔 ${item.stepTime} 秒，全部完成后休息 ${item.restTime} 秒`}
              </View>
            </View>
          ))}
        </View>
        <View className={styles.footer}>
          <AtButton
            type='primary'
            onClick={onSubmit}
            loading={postGroupItemLoading}
          >
            导入该运动计划
          </AtButton></View>
      </View>
    </>
  );
};

export default ExerciseJoin;
