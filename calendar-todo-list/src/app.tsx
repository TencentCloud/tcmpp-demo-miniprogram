import '@/assets/fonts/iconfont.css';
import './app.scss';
import './app.less';
import './utils/i18n';

import Taro from '@tarojs/taro';
import { t } from 'i18next';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import store from './store';

const App: FC<PropsWithChildren> = ({ children }) => {
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(() => {
    // 请求完新版本信息的回调
  });

  updateManager.onUpdateReady(() => {
    Taro.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res) => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
  });
  Taro.showShareMenu({
    withShareTicket: true,
    // @ts-ignore
    menus: ['shareAppMessage', 'shareTimeline'],
    showShareItems: ['shareAppMessage', 'shareTimeline'],
  });

  const setTabBar = () => {
    Taro.setTabBarItem({
      index: 0,
      text: t('首页'),
    });
    Taro.setTabBarItem({
      index: 1,
      text: t('日程'),
    });
    Taro.setTabBarItem({
      index: 2,
      text: t('共享日历'),
    });
    Taro.setTabBarItem({
      index: 3,
      text: t('我的'),
    });
  };

  setTabBar();

  return <Provider store={store}>{children}</Provider>;
};

export default App;
