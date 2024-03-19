import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['onCompass0'],
      path: 'packageAPI/pages/device/on-compass-change/on-compass-change'
    }
  },

  data: {
    theme: 'light',
    enabled: false,
    direction: 0
  },

  cb(res) {
    console.log('====res', res)
    this.setData({
      direction: parseInt(res.direction, 10)
    })
  },

  onCompassChange() {
    this.setData({
      enabled: true
    })
    wx.onCompassChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['onCompass1']
    })
  },

  offCompassChange() {
    wx.offCompassChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['onCompass2']
    })
  },

  startCompass() {
    if (this.data.enabled) {
      return
    }
    const that = this
    wx.startCompass({
      success() {
        that.setData({
          enabled: true
        })
      }
    })
  },

  stopCompass() {
    if (!this.data.enabled) {
      return
    }
    const that = this
    wx.stopCompass({
      success() {
        that.setData({
          enabled: false
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['onCompass0']
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
