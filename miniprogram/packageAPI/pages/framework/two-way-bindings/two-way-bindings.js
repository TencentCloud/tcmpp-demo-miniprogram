// miniprogram/page/API/pages/two-way-bindings/two-way-bindings.js
import { i18n,lang } from '../../../../i18n/lang'
Page({

  /**
   * Page initial data
   */
  data: {
    theme: 'light',
    value: ''
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

  },

  /**
   * Life cycle function--Surveillance page display
   */
  onShow() {

  },

  /**
   * Life cycle function--Monitoring page hidden
   */
  onHide() {

  },

  /**
   * Life cycle function--Supervision page uninstallation
   */
  onUnload() {

  },

  /**
   * Page related event processing function--Surveying user drop -down action
   */
  onPullDownRefresh() {

  },

  /**
   * Page the processing function of the bottoming event
   */
  onReachBottom() {

  },

  /**
   * User click to share in the upper right corner
   */
  onShareAppMessage() {
    return {
      title: 'Two -way binding',
      path: 'packageAPI/pages/framework/make-phone-call/make-phone-call'
    }
  }
})
