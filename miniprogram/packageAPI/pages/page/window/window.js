import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['window0'],
      isListen: false,
      path: 'packageAPI/pages/page/window/window'
    }
  },

  windowResizeCb(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['window1'],
      content: JSON.stringify(res)
    })
  },

  onWindowResize() {
    this.setData({
      isListen: !this.data.isListen
    })
    wx.onWindowResize(this.windowResizeCb)
  },

  offWindowResize() {
    this.setData({
      isListen: !this.data.isListen
    })
    wx.offWindowResize(this.windowResizeCb)
  },


  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['window0']
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
