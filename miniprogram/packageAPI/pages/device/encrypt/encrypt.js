import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'iBeacon',
      path: 'packageAPI/pages/device/nfc/nfc'
    }
  },

  data: {
    theme: 'light'
  },

  getRandomValues() {
    wx.getRandomValues({
      length: 6, // Generate a random number of 6 byte length
      success: res => {
        const value = wx.arrayBufferToBase64(res.randomValues);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['encrypt0'],
          content: `${value}`
        })
        console.log('random number', value) // Print after converting to Base64 string
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['encrypt1']
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
