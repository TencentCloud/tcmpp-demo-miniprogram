import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['intersection0'],
      path: 'packageAPI/pages/page/intersection-observer/intersection-observer'
    }
  },

  data: {
    theme: 'light',
    appear: false
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['intersection0']
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
    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        console.log(res)
        this.setData({
          appear: res.intersectionRatio > 0
        })
      })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  }
})
