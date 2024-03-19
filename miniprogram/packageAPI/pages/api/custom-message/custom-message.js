import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['Customer service'],
      path: 'packageAPI/pages/api/custom-message/custom-message'
    }
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
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
