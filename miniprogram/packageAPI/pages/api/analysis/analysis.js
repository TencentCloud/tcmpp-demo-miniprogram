import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    analytics: '',
    eventName: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['analysis3']
    })
    this.setData({
      t: i18n,
      lang
    })
  },
  reportEvent() {
    let obj;
    try {
      obj = JSON.parse(this.data.eventName);
    } catch (err) {
      wx.showToast({
        title: i18n['analysis2']
      })
      return;
    }
    wx.reportEvent(this.data.eventName, obj);
  },
  reportAnalytics() {
    let obj;
    try {
      obj = JSON.parse(this.data.analytics);
    } catch (err) {
      wx.showToast({
        title: i18n['analysis2']
      })
      return;
    }
    wx.reportAnalytics(this.data.analytics, obj);
  },
  getAnalytics(e) {
    this.data.analytics = e.detail.value;
  },
  getEventName(e) {
    this.data.eventName = e.detail.value;
  }
})