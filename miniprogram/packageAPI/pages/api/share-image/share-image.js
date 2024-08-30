import { i18n, lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['share-image2'],
      path: 'packageAPI/pages/api/share-button/share-button'
    }
  },
  data: {
    url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/4-1.ad156d1c.png'
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['share-image3']
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
  },
  shareAction() {
    wx.downloadFile({
      url: this.data.url,
      success: (res) => {
        wx.showShareImageMenu({
          path: res.tempFilePath,
          success: (res) => {
            console.log('===Share success===', res);
          },
          fail: (err) => {
            console.log('===Share failed===', err);
          },
          complete: (res) => {
            console.log('===Share completed===', res);
          }
        })
      },
      complete: (res) => {
        console.log('===Image download completed===', res);
      },
      fail: (err) => {
        console.log('===Image download failed===', err);
      }
    })
  }
})
