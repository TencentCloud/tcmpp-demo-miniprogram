import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'hce',
      path: 'packageAPI/pages/device/hce/hce'
    }
  },
  data: {
    theme: 'light'
  },
  onLoad() {
    this.setData({
            
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },
  getHCEState() {
    wx.getHCEState({
      success: (res) => {
        console.log('===getHCEState success===', res)
      },
      fail: (err) => {
        console.log('===getHCEState fail===', err)
      }
    })
  }
})
