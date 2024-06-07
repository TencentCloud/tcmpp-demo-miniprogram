import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['navigation0'],
      path: 'packageAPI/pages/page/navigation-bar/navigation-bar'
    }
  },

  setNaivgationBarTitle(e) {
    const title = e.detail.value.title
    console.log(title)
    wx.setNavigationBarTitle({
      title,
      success() {
        console.log('setNavigationBarTitle success')
      },
      fail(err) {
        console.log('setNavigationBarTitle fail, err is', err)
      }
    })
    return false
  },

  setNavigationBarColor() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  showNavigationBarLoading() {
    wx.showNavigationBarLoading()
  },

  hideNavigationBarLoading() {
    wx.hideNavigationBarLoading()
  },

  hideHomeButton() {
    wx.reLaunch({
      url: '/packageAPI/pages/page/navigation-bar/homeButton/homeButton'
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['navigation']
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
