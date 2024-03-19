import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['background'],
      path: 'packageAPI/pages/page/background/background'
    }
  },

  setBackgroundTextStyle() {
    wx.setBackgroundTextStyle({
      textStyle: 'light' // Pull-down background font, loading icon style is dark
    })
  },

  setBackgroundColor() {
    wx.setBackgroundColor({
      backgroundColorTop: '#ff0000', // Top window background color is red
      backgroundColorBottom: '#ff0000' // Bottom window background color is red
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['background']
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

  onReachBottom() {
    console.log('onReachBottom')
  }
})
