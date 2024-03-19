import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['openLocation0'],
      path: 'packageAPI/pages/location/open-location/open-location'
    }
  },
  openLocation(e) {
    console.log(e)
    const value = e.detail.value
    console.log(value)
    wx.openLocation({
      type: value.type,
      scale: value.scale,
      longitude: Number(value.longitude),
      latitude: Number(value.latitude),
      name: value.name,
      address: value.address
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['openLocation0']
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
