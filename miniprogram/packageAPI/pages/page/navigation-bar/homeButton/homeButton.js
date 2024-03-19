import { i18n,lang } from '../../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['homeButton0'],
      path: 'packageAPI/pages/page/toast/toast'
    }
  },

  hideHomeButton() {
    wx.hideHomeButton();
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['homeButton0']
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
