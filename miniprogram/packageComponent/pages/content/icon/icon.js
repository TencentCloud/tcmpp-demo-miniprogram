import { i18n,lang } from '../../../../i18n/lang'

Page({
  data: {
    t: i18n,
    lang,
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'icon',
      path: 'packageComponent/pages/content/icon/icon'
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
