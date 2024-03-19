// miniprogram/packageAPI/pages/framework/resizable/resizable.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Screen rotation',
      path: 'packageAPI/pages/framework/resizable/resizable'
    }
  },
  data: {
    theme: 'light',
    status: 'lock'
  },
  handleStatusChange(e) {
    this.setData({
      status: e.currentTarget.dataset.status
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
