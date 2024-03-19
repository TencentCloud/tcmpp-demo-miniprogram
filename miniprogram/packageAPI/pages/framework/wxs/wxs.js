// miniprogram/page/API/pages/wxs/wxs.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'wxs',
      path: 'packageAPI/pages/framework/wxs/wxs'
    }
  },
  handleNavChange(e) {
    console.log(e)
    wx.navigateTo({
      url: `/packageAPI/pages/framework/framework/wxs/${e.currentTarget.dataset.nav}`
    })
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
