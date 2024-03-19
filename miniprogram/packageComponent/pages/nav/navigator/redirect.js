import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'redirectPage',
      path: 'packageComponent/pages/nav/navigator/redirect'
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
    console.log(options)
    this.setData({
      title: options.title
    })
  }
})
