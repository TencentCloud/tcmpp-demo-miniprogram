import { i18n, lang } from '../../../../i18n/lang'

Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'navigator',
      path: 'packageComponent/pages/nav/navigator/navigator'
    }
  },
  onLoad() {
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
