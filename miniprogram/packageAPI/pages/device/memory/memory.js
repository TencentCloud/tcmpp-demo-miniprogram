import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['memory0'],
      path: 'packageAPI/pages/device/memory/memory'
    }
  },

  data: {
    theme: 'light'
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['memory0']
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
    this.listener = function (res) {
      console.log('===onMemoryWarningReceive===', res)
    }
  },

  onMemoryWarning() {
    wx.onMemoryWarning(this.listener)
  },

  offMemoryWarning() {
    wx.offMemoryWarning(this.listener)
  }
})
