import { View } from '@tarojs/components';
import { reLaunch, removeStorageSync, setStorageSync, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { changeLanguage, t } from 'i18next';
import { useState } from 'react';
import { AtButton } from 'taro-ui';

import Select from '@/components/select';
import Switch from '@/components/switch';
import { Pages } from '@/constant';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';

const languageOptions = [
  { key: 'zh-CN', label: '简体中文' },
  { key: 'en', label: 'English' },
  { key: 'id', label: 'Bahasa Indonesia' },
];

const Setting = () => {
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState(i18next.language);
  const { userInfo, loading: appLoading } = useAppSelector(
    (state) => state.app
  );
  const { run: patchUserAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
      },
    }
  );

  const dayOfTheSunChange = (isDayOfTheSun: boolean) => {
    patchUserAsync({
      ...userInfo,
      isDayOfTheSun,
    });
  };
  const maskChange = (closeMask: boolean) => {
    patchUserAsync({
      ...userInfo,
      closeMask: !closeMask,
    });
  };

  const languageChange = (lang: string) => {
    setStorageSync('language', lang);
    dayjs.locale(lang === 'zh' ? 'zh-cn' : 'en');
    changeLanguage(lang, () => {
      setLanguage(i18next.language);
    });
  };

  useDidShow(() => {
    dispatch(getUserInfo());
  });
  useLoading(appLoading || patchUserLoading);
  return (
    <>
      <View className={styles.content}>
        <Switch
          title={`${t('当周开始')}：`}
          value={userInfo?.isDayOfTheSun}
          onChange={dayOfTheSunChange}
          label={userInfo?.isDayOfTheSun ? t('周日') : t('周一')}
        />
        {/* <Switch
          title="节日主题："
          value={!userInfo?.closeMask}
          onChange={maskChange}
        />*/}
        <Select
          title={`${t('切换语言')}：`}
          label={languageOptions.find(v => v.key === language)?.label}
          value={languageOptions.findIndex(v => v.key === language)}
          range={languageOptions.map(v => v.label)}
          onChange={e => languageChange(languageOptions[e.detail.value].key)}
        />
        <View className={styles.button}>
          <AtButton
            type="secondary"
            onClick={() => {
              removeStorageSync('token');
              reLaunch({ url: Pages.authPage });
            }}
          >
            {t('注销登录')}
          </AtButton>
        </View>
      </View>
    </>
  );
};

export default Setting;
