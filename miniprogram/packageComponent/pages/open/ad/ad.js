import{ i18n, lang } from '../../../../i18n/lang';

const info = wx.getSystemInfoSync()

Page({
  onShareAppMessage() {
    return {
      title: 'ad',
      path: 'packageComponent/pages/open/ad/ad'
    }
  },

  data: {
    theme: 'light',
    platform: info.platform
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  }
})
