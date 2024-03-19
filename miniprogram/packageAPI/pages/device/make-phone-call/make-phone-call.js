import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['makePhone0'],
      path: 'packageAPI/pages/device/make-phone-call/make-phone-call'
    }
  },

  data: {
    theme: 'light',
    disabled: true
  },

  bindInput(e) {
    this.inputValue = e.detail.value
    if (this.inputValue.length > 0) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.inputValue,
      success() {
        console.log('Successful call')
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['makePhone0']
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
