import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['copy Link']
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
  copyUrl() {
    wx.onCopyUrl(() => {
      console.log('=== Detected copy link operation ===');
      return { query: 'a=1&b=2' }
    })
  },
  offCopyUrl() {
    wx.offCopyUrl()
  }
})
