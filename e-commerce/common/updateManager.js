import i18n from '../i18n/index';

export default () => {
  if (!wx.canIUse('getUpdateManager')) {
    return;
  }

  const updateManager = wx.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(i18n.t('Version information'), res);
  });

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: i18n.t('Update prompt'),
      content: i18n.t('The new version is ready. Do you want to restart the application?'),
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
  });
};
