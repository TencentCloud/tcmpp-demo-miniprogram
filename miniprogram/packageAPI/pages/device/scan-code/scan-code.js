import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['scan0'],
      path: 'packageAPI/pages/device/scan-code/scan-code'
    }
  },

  data: {
    theme: 'light',
    result: ''
  },

  scanCode() {
    const that = this
    wx.scanCode({
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success(res) {
        that.setData({
          result: res.result
        })
        console.log('===result', res)
      },
      fail(err) {
        console.log('scanCode fail: ', err)
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['scan0']
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
