import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { AtButton, AtToast } from 'taro-ui';

// import { AtButton } from 'taro-ui';
import Icon from '@/components/icon';
import { Pages } from '@/constant';
import { register } from '@/services/user';
import { checkUser, getUserInfo } from '@/store/app';
import { useAppDispatch, useAppSelector, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const Auth = () => {
  const { tableId, tableName, timestamp, page } =
    getCurrentInstance().router?.params || {};
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { run: registerAsync } = useRequest(register, {
    manual: true,
    onSuccess: res => {
      if (res.data) {
        // 用于IDE获取不到用户信息时的默认值
        const resDataDefault = {
          userName: 'tcmpp8',
          account: 'tcmpp8',
        };

        console.log('userName', res.data);
        setLoginSuccess(true);
        dispatch(
          checkUser({
            userInfo: {
              nickName: res.data.userName || resDataDefault.userName,
              openid: res.data.account || resDataDefault.account,
            },
          }),
        );
      }
    },
    onError: () => setLoading(false),
  });

  const login = useCallback(() => {
    setLoading(true);
    const { query: { noServer } } = Taro.getEnterOptionsSync();

    if (`${noServer}` === '1') {
      // 不需要走服务端获取用户
      setLoginSuccess(true);
      dispatch(
        checkUser({
          userInfo: {
            nickName: 'admin',
            openid: 'admin-tcmpp',
          },
        }),
      );
    } else {
      Taro.login({
        success: ({ code }) => {
          console.log('code', code);
          registerAsync(code);
        },
        fail: () => setLoading(false),
      });
    }
  }, [dispatch, registerAsync]);

  const onGetUserInfo = (res: { detail: { errMsg: string } }) => {
    if (res.detail.errMsg === 'getUserInfo:ok') {
      login();
    }
  };

  const reload = () => {
    Taro.removeStorage({
      key: 'token',
      success: () => {
        login();
      },
    });
  };

  useEffect(() => {
    if (!Taro.getStorageSync('token')) {
      // login();
    } else if (!userInfo?.openid) {
      dispatch(getUserInfo());
    } else {
      setLoading(false);
      const url =
        page && tableId
          ? `${Pages[page]}?tableId=${tableId}&tableName=${tableName}&timestamp=${timestamp}`
          : Pages.homePage;

      Taro.reLaunch({ url });
    }
  }, [dispatch, login, page, tableId, tableName, timestamp, userInfo]);

  return (
    <View className={styles.container}>
      <View className={styles.content}>
        <Icon type="rili" className={styles.icon} onClick={reload} />
        <View>{t('日历清单')}</View>
        {!Taro.getStorageSync('token') && <AtButton
          type="primary"
          size="small"
          // openType="getUserInfo"
          // onGetUserInfo={onGetUserInfo}
          onClick={login}
          className={styles.button}
          loading={loading}
        >
          {t('点击授权登陆')}
        </AtButton>}
      </View>
      <AtToast isOpened={loginSuccess} text={t('登录成功')} icon='check' />
    </View>
  );
};

export default Auth;
