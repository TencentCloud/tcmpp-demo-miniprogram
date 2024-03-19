import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'navigatePage',
      path: 'packageComponent/pages/nav/navigator/navigate'
    }
  },
  onUnload() {
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad(options) {
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
