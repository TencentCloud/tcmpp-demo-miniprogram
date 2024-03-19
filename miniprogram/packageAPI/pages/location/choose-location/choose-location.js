const util = require('../../../../util/util.js')
const formatLocation = util.formatLocation

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['chooseLocation0'],
      path: 'packageAPI/pages/location/choose-location/choose-location'
    }
  },
  data: {
    theme: 'light',
    hasLocation: false
  },
  chooseLocation() {
    const that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      },
      fail: err => {
        console.log('err', err)
      }
    })
  },
  clear() {
    this.setData({
      hasLocation: false
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['chooseLocation0']
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
