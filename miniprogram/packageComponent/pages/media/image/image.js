import { i18n, lang } from '../../../../i18n/lang'

Page({
  onShareAppMessage() {
    return {
      title: 'image',
      path: 'packageComponent/pages/media/image/image'
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
  },
  data: {
    t: i18n,
    lang,
    theme: 'light',
  }
})
