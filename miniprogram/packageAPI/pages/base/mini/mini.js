import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['mini13'],
      path: 'packageAPI/pages/base/common/common',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    envInfo: '',
    canIUseInfo: '',
    base64: '5L2g5aW977yMVE1G',
    base64ToArrayBuffer: '',
    arrayBufferToBase64: '',
    isListenPromise: false,
    isListenTheme: false,
    isListenError: false,
    isListenShow: false,
    isListenHide: false
  },
  onPageNotFound(res) {
    console.log('=====res', res)
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['mini0']
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

  launchOpt() {
    const o = wx.getLaunchOptionsSync();
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'getLaunchOptionsSync',
      content: JSON.stringify(o)
    });
  },

  showOpt() {
    const o = wx.getEnterOptionsSync();
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'getEnterOptionsSync',
      content: JSON.stringify(o)
    });
  },

  clickError() {
    console.log('aaa', aaa);
  },

  clickPromiseError() {
    setTimeout(() => {
      Promise.reject('111')
    }, 1000);
    // throw Error('222')
  },

  unhandledRejectionHandler(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['mini14'],
      content: JSON.stringify(res)
    })
    console.log('unhandledRejectionEvent===', res)
  },

  onUnhandledRejection() {
    if (this.data.isListenPromise) {
      wx.offUnhandledRejection(this.unhandledRejectionHandler)
    } else {
      wx.onUnhandledRejection(this.unhandledRejectionHandler)
    }
    this.setData({
      isListenPromise: !this.data.isListenPromise
    })
  },

  clickApiError() {
    wx.navigateTo2({
      url: 'aaa'
    });
  },

  errorHandler(result) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['mini15'],
      content: result
    })
  },

  onError() {
    if (this.data.isListenError) {
      wx.offError(this.errorHandler);
      wx.showToast({
        icon: 'none',
        title: i18n['mini16']
      });
    } else {
      wx.onError(this.errorHandler);
      wx.showToast({
        icon: 'none',
        title: i18n['mini17']
      })
    }
    this.setData({
      isListenError: !this.data.isListenError
    })
  },

  appShowHide() {
    wx.previewImage({
      current: 'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont2.24edf9d4.png',
      urls: [
        'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont2.24edf9d4.png',
        'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont.ea816829.png',
        'https://res.wx.qq.com/wxdoc/dist/assets/img/2flow.dont.7300d84e.png'
      ]
    });
  },

  appShowHandler() {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['mini18'],
      content: i18n['mini19']
    })
    console.log('Switch to the foreground')
  },

  onAppShow() {
    if (this.data.isListenShow) {
      wx.offAppShow(this.appShowHandler)
      wx.showToast({
        icon: 'none',
        title: i18n['mini20']
      });
    } else {
      wx.onAppShow(this.appShowHandler)
      wx.showToast({
        icon: 'none',
        title: i18n['mini21']
      });
    }
    this.setData({
      isListenShow: !this.data.isListenShow
    })
  },

  appHideHandler() {
    console.log('Switch to the background')
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['mini22'],
      content: i18n['mini23']
    })
  },

  onAppHide() {
    if (this.data.isListenHide) {
      wx.offAppHide(this.appHideHandler)
      wx.showToast({
        icon: 'none',
        title: i18n['mini24']
      });
    } else {
      wx.onAppHide(this.appHideHandler)
      wx.showToast({
        icon: 'none',
        title: i18n['mini25']
      });
    }
    this.setData({
      isListenHide: !this.data.isListenHide
    })
  },

  cb(res) {
    console.log('===== Theme change detected =====', res);

    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['mini26'],
      content: JSON.stringify(res)
    });
  },

  onThemeChange() {
    if (this.data.isListenTheme) {
      wx.offThemeChange(this.cb);
      wx.showToast({
        icon: 'none',
        title: i18n['mini27']
      })
    } else {
      wx.onThemeChange(this.cb);
      wx.showToast({
        icon: 'none',
        title: i18n['mini28']
      })
    }
    this.setData({
      isListenTheme: !this.data.isListenTheme
    })
  }
})
