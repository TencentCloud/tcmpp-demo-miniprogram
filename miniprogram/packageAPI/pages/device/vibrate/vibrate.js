import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['vibrate0'],
      path: 'packageAPI/pages/device/vibrate/vibrate'
    }
  },

  vibrateShort() {
    wx.vibrateShort({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('completed')
      }
    })
  },

  vibrateLong() {
    wx.vibrateLong({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      },
      complete() {
        console.log('completed')
      }
    })
  },
  
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['vibrate0']
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
