import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['getNetwork0'],
      path: 'packageAPI/pages/device/get-network-type/get-network-type'
    }
  },

  data: {
    theme: 'light',
    hasNetworkType: false
  },

  getNetworkType() {
    const that = this
    wx.getNetworkType({
      success(res) {
        console.log(res)
        that.setData({
          hasNetworkType: true,
          networkType: res.subtype || res.networkType
        })
      }
    })
  },

  clear() {
    this.setData({
      hasNetworkType: false,
      networkType: ''
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['getNetwork0']
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
  }
})
