import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    shareData: {
      theme: 'light',
      title: i18n['share5'],
      desc: i18n['share6'],
      path: 'packageAPI/pages/api/share/share'
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Forward']
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

  onShareAppMessage() {
    return this.data.shareData
  }
})
