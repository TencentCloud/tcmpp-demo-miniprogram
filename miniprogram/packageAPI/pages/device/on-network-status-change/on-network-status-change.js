import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['onNetwork0'],
      path: 'packageAPI/pages/device/on-network-status-change/on-network-status-change'
    }
  },

  data: {
    theme: 'light',
    isConnected: false,
    isListenStatusChange: false,
    networkType: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['onNetwork0']
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

  cb(res) {
    console.log('======wifi Variety', res)
    this.setData({
      isConnected: res.isConnected,
      networkType: res.networkType
    })
  },

  onNetworkStatusChange() {
    if (this.data.isListenStatusChange) {
      wx.offNetworkStatusChange(this.cb);
      wx.showToast({
        icon: 'none',
        title: i18n['onNetwork1']
      });
    } else {
      wx.onNetworkStatusChange(this.cb);
      wx.showToast({
        icon: 'none',
        title: i18n['onNetwork2']
      })
    }
    this.setData({
      isListenStatusChange: !this.data.isListenStatusChange
    })
  },

  onShow() {
    const that = this
    wx.getNetworkType({
      success(res) {
        console.log('===getNetworkType===', res)
        that.setData({
          isConnected: res.networkType !== 'none',
          networkType: res.networkType
        })
      }
    })
  }
})
