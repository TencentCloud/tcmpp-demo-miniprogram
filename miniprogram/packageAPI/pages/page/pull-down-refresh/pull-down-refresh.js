import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['pullDownRefresh0'],
      path: 'packageAPI/pages/page/pull-down-refresh/pull-down-refresh'
    }
  },

  onPullDownRefresh() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    console.log('onPullDownRefresh', new Date())
  },

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },

  startPullDownRefresh() {
    wx.startPullDownRefresh({
      complete(res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['pullDownRefresh0']
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
