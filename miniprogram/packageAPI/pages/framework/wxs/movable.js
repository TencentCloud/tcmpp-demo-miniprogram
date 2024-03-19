// pages/movable/movable.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'movable',
      path: 'packageAPI/pages/framework/wxs/movable'
    }
  },
  /**
   * Page initial data
   */
  data: {
    theme: 'light',
    left: 50,
    top: 50,
    taptest: 'taptest',
    show: true,
    dataObj: {
      obj: 1
    }
  },

  /**
   * Life cycle function--Load on the monitoring page
   */
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

  },

  /**
   * Life cycle function--The first rendering of the monitoring page is completed
   */
  onReady() {
    setTimeout(() => {
      this.setData({
        // show: false,
      })
    }, 3000)
  },
  taptest() {
    this.setData({
      show: false
    })
  }
})
