import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'encrypt',
      path: 'packageAPI/pages/base/encrypt/encrypt'
    }
  },

  data: {
    theme: 'light',
    userCryptoManager: null,
    getLatestUserKeyRes: ''
  },
  getLatestUserKey() {
    this.data.userCryptoManager.getLatestUserKey({
      complete: res => {
        this.setData({
          getLatestUserKeyRes: JSON.stringify(res)
        })
        console.log('getLatestUserKey====', res);
      }
    })
  },
  getRandomValues() {
    wx.getRandomValues({
      length: 6, // Generate a random number of 6 byte length,
      success: res => {
        const value = wx.arrayBufferToBase64(res.randomValues);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'Get the random number:',
          content: `${value}`
        })
        console.log('Random number', value) // Print after converting to Base64 string
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['encryption']
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

    this.setData({
      // Get user encryption module
      userCryptoManager: wx.getUserCryptoManager()
    })
    console.log('userCryptoManager=======', this.data.userCryptoManager)
  }
})
