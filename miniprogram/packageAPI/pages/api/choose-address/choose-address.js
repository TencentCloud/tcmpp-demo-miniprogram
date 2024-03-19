import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Shipping address',
      path: 'packageAPI/pages/api/choose-address/choose-address'
    }
  },

  data: {
    t: i18n,
    lang,
    theme: 'light',
    addressInfo: null
  },
  chooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          addressInfo: res
        })
      },
      fail(err) {
        console.log(err)
      }
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
