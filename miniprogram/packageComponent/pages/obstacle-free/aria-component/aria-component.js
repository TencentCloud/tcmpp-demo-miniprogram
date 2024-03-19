// miniprogram/packageComponent/pages/obstacle-free/aria-component/aria-component.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    t: i18n,
    lang,
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'Non -barrier access',
      path: 'packageComponent/pages/obstacle-free/aria-component/aria-component'
    }
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
