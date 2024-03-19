import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['updateManager2'],
      path: 'packageAPI/pages/page/updateManafer/updateManafer',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    updateManager: null,
    updateInfo: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['updateManager2']
    })
    this.setData({
      t: i18n,
      lang
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  check() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // Callback after requesting new version information
      console.log('Version update', res);
      this.setData({
        updateInfo: `${i18n['updateManager3']} ${JSON.stringify(res)}`
      })
    });
    updateManager.onUpdateReady(() => {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['updateManager4'],
        content: i18n['updateManager5'],
        success: (res) => {
          this.setData({
            updateInfo: JSON.stringify(res)
          })
          if (res.confirm) {
            // New version has been downloaded successfully, call applyUpdate to apply the new version and restart
            updateManager.applyUpdate()
          }
        }
      })
    });
    console.log('=====updateManager', updateManager)
    updateManager.onUpdateFailed((err) => {
      // New version download failed
      this.setData({
        updateInfo: `${i18n['updateManager6']} ${JSON.stringify(err)}`
      })
      console.log('===== New version update failed');
    });
  }
})
