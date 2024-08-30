import { View } from '@tarojs/components';
import { navigateToMiniProgram } from '@tarojs/taro';

import Icon from '@/components/icon';

import styles from './index.module.less';

const MoreFeatures = () => {
  return (
    <View className={styles.container}>
      <View className={styles.title}>简云系列</View>
      <View
        className={styles.content}
        onClick={() => {
          navigateToMiniProgram({ appId: 'wxb87eb8206613337b' });
        }}
      >
        <View className={styles.header}>
          <View>简云排班</View>
          <Icon type='sijipaiban' size={60} className={styles.icon} />
        </View>
        <View className={styles.desc}>
          记录工时、工天，为个人和团队解决频繁变更的排班需求，支持多规则排班配置的独立切换和相互组合，支持多人员共享查看。
        </View>
        <View className={styles.time}>2023年12月18日</View>
      </View>
      <View className={styles.clickInfo}>点击卡片即可跳转</View>
    </View>
  );
};

export default MoreFeatures;
