// packageAPI/pages/device/accessibility/accessibility.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['accessibility0'],
      path: 'packageAPI/pages/device/accessibility/accessibility'
    }
  },
  
  data: {
    theme: 'light'
  },

  checkIsOpenAccessibility() {
    wx.checkIsOpenAccessibility({
      complete: (res) => {
        const msg = res.open ? i18n['accessibility1'] : i18n['accessibility2']
        this.setData({
          isOpen: msg
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['accessibility3']
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
