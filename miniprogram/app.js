console.log('QAPM_DEVICE_ID', wx.getStorageSync("QAPM_DEVICE_ID"));
typeof __wxConfig.qapmSetField==="function" && __wxConfig.qapmSetField("logLevel",5)

import { i18n, lang } from './i18n/lang'
import { log } from './util/util'

const themeListeners = [];
global.isDemo = true;

App({
  onLaunch(opts, data) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // Callback after requesting new version information
      log('onCheckForUpdate--------', res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      log('onUpdateReady--------')
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['app0'],
        content: i18n['app1'],
        success: function (res) {
          if (res.confirm) {
            // The new version has been downloaded successfully, call applyUpdate to apply the new version and restart
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // New version download failed
      log('onUpdateFailed--------')
    })

    const canIUseSetBackgroundFetchToken = wx.canIUse('setBackgroundFetchToken')
    if (canIUseSetBackgroundFetchToken) {
      wx.setBackgroundFetchToken({
        token: 'getBackgroundFetchToken'
      })
    }

    log('App Launch', opts)
    log('App Launch getLaunchOptionsSync', wx.getLaunchOptionsSync())
    log('App Launch getEnterOptionsSync', wx.getEnterOptionsSync())

    if (data && data.path) {
      wx.navigateTo({
        url: data.path
      })
    }
    wx.onAppShow(this.appShowHandler);
    // wx.on
  },
  onShow(opts) {
    log('App Show', opts)
    log('App Show getEnterOptionsSync', wx.getEnterOptionsSync())
    this.addOnPageNotFound();
    // this.offPageNotFound();  // Verify if wx.offPageNotFound is effective, uncomment and recompile
    this.getShareInfo(opts.shareTicket)
  },
  onHide() {
    log('App Hide');
    this.offPageNotFound();
  },
  appShowHandler() {
    wx.showToast({
      title: i18n['app3'],
      icon: 'none'
    })
    log('Switched to the foreground');
  },
  appHideHandler() {
    log('Switched to the background');
    wx.showToast({
      title: i18n['app4'],
      icon: 'none'
    })
  },
  pageNotFoundCb(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['app5'],
      content: JSON.stringify(res)
    });
  },
  addOnPageNotFound() {
    wx.onPageNotFound(this.pageNotFoundCb);
  },
  offPageNotFound() {
    wx.offPageNotFound(this.pageNotFoundCb);
  },
  getShareInfo(shareTicket) {
    if (shareTicket) {
      wx.getShareInfo({
        shareTicket,
        success: (res) => {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'getShareInfo success',
            content: JSON.stringify(res)
          })
        },
        fail: (err) => {
          log('get share info fail', err)
        },
        complete: () => {
          log('get share info complete')
        }
      })
    } else {
      log('shareTicket is undefined')
    }
  },
  onError(err) {
    log('App Error--------', err)
  },
  onPageNotFound(opts) {
    log('Page Not Found--------', opts)
  },
  onUnhandledRejection(opts) {
    log('Unhandled Rejection--------', opts)
  },
  onThemeChange({ theme }) {
    this.globalData.theme = theme
    log('App.onThemeChange change--------', theme);;
    themeListeners.forEach((listener) => {
      listener(theme)
    })
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener)
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener)
    if (index > -1) {
      themeListeners.splice(index, 1)
    }
  },
  globalData: {
    theme: wx.getSystemInfoSync().theme,
    hasLogin: false,
    openid: null,
    iconTabbar: '/page/weui/example/images/icon_tabbar.png'
  },
})
