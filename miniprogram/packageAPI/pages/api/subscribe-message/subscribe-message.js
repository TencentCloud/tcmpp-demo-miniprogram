import { i18n,lang } from '../../../../i18n/lang'
Page({

  /**
   * Page initial data
   */
  data: {
    t: i18n,
    lang,
    theme: 'light'
  },

  // Request subscription
  requestSubscribeMessage() {
    const self = this
    wx.requestSubscribeMessage({
      tmplIds: ['y1bXHAg_oDuvrQ3pHgcODcMPl-2hZHenWugsqdB2CXY'],
      success(res) {
        console.log(res)
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          self.subscribeMessageSend()
        }
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  // Send subscription message
  subscribeMessageSend() {
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        theme: 'light',
        action: 'sendSubscribeMessage'
      },
      success: res => {
        console.warn('[Cloud Function] [openapi] templateMessage.send call successful:', res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'Successful subscription',
          content: 'Please return to WeChat main interface to view',
          showCancel: false
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'Call failure'
        })
        console.error('[Cloud Function] [openapi] templateMessage.send call failed:', err)
      }
    })
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
      title: 'Subscription message',
      path: 'packageAPI/pages/api/subscribe-message/subscribe-message'
    }
  }
})
