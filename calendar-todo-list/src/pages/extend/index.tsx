import { Image, Text, View } from '@tarojs/components';
import { navigateTo, navigateToMiniProgram, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';

import riliSrc from '@/assets/images/rili-white.png';
import Icon from '@/components/icon';
import Mask from '@/components/mask';
import { ERoles, Pages } from '@/constant';
import { getUserInfo } from '@/store/app';
import { getResourceUrl } from '@/utils/common';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

const Index = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const isManager = userInfo?.roles.includes(ERoles.manager);
  const menuOptions = [
    {
      icon: 'shengri',
      title: t('生日提醒'),
      url: Pages.birthdayReminderPage,
    },
    {
      icon: 'woman',
      title: t('生理期助手'),
      url: Pages.physiologyPage,
    },
    {
      icon: 'jishiqi',
      title: t('运动计时器'),
      url: Pages.exerciseGrroupListPage,
    },
    // {
    //  icon: 'paiban',
    //  title: '排班记工',
    //  onClick: () => navigateToMiniProgram({ appId: 'wxb87eb8206613337b' }),
    // },
    {
      icon: 'gongxiangrenwu',
      title: t('共享打卡视图'),
      url: Pages.shareAttendancePage,
    },
    // {
    //  icon: 'extend',
    //  title: '扩展功能',
    //  url: Pages.moreFeaturesPage,
    // },
    {
      icon: 'jiejiari',
      title: t('节假日安排'),
      url: Pages.holidayPage,
    },
    // {
    //   icon: 'shuomin',
    //   title: t('用户手册'),
    //   url: Pages.userManualPage,
    // },
    {
      icon: 'yijianfankui',
      title: t('功能建议或问题反馈'),
      url: Pages.suggestionPage,
    },
    {
      icon: 'gerenxinxi',
      title: t('个人信息'),
      url: Pages.userInfoPageEdit,
    },
    {
      hidden: false,
      icon: 'shezhi',
      title: t('设置'),
      url: Pages.settingPage,
    },
    {
      icon: 'renshu',
      title: t('管理员视图'),
      url: Pages.managerPage,
      role: ERoles.manager,
    },
  ];

  useDidShow(() => {
    dispatch(getUserInfo());
  });

  const useEdit =
    dayjs(userInfo?.created).add(7, 'day').isBefore(dayjs()) || true;

  return (
    <>
      <Mask />
      <View className={styles.header}>
        <Image
          src={getResourceUrl(userInfo?.avatarUrl) || riliSrc}
          onClick={() => useEdit && navigateTo({ url: Pages.userInfoPageEdit })}
        />
        <View
          className={styles.name}
          onClick={() => useEdit && navigateTo({ url: Pages.userInfoPageEdit })}
        >
          {userInfo?.nickName}
        </View>
      </View>
      <View className={styles.content}>
        {(menuOptions).map(({ icon, title, url, role, hidden, onClick }) => {
          if ((role === ERoles.manager && !isManager) || hidden) {
            return null;
          }
          return (
            <View
              key={title}
              className={styles.li}
              onClick={onClick ? onClick : () => navigateTo({ url })}
            >
              <View className={styles.title}>
                <Icon type={icon} className={styles.icon} />
                <Text className={styles.text}>{title}</Text>
              </View>
              <Icon value="chevron-right" size={16} />
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Index;
