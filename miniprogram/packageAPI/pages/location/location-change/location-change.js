const util = require('../../../../util/util.js')
const formatLocation = util.formatLocation

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['locationChange0'],
      path: 'packageAPI/pages/location/location-change/location-change'
    }
  },

  data: {
    theme: 'light',
    cb1Result: '',
    cb2Result: '',
    cb3Result: ''
  },

  cb1(result) {
    console.log('cb1', result);
    this.setData({
      cb1Result: JSON.stringify(result)
    })
  },

  errCb(res) {
    console.log('onLocationChangeError listener result', res);
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['getLocation5']
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
  },

  cb2(result) {
    console.log('cb2', result);
    this.setData({
      cb2Result: JSON.stringify(result)
    })
  },
  cb3(result) {
    console.log('cb3', result);
    this.setData({
      cb3Result: JSON.stringify(result)
    })
  },

  startLocationUpdate() {
    wx.startLocationUpdate({
      success(res) {
        console.log('startLocationUpdate success:', res);
      },
      fail(err) {
        console.log('startLocationUpdate fail:', err);
      },
      complete(res) {
        console.log('startLocationUpdate complete:', res);
      }
    })
  },

  stopLocationUpdate() {
    wx.stopLocationUpdate({
      success(res) {
        console.log('stopLocationUpdate success:', res);
      },
      fail(err) {
        console.log('stopLocationUpdate fail:', err);
      },
      complete(res) {
        console.log('stopLocationUpdate complete:', res);
      }
    })
  },

  onLocationChange() {
    wx.onLocationChange(this.cb1);
    wx.onLocationChange(this.cb2);
    wx.onLocationChange(this.cb3);
    console.log('Start listening, register callbacks cb1, cb2, cb3');
  },

  offLocationChange() {
    wx.offLocationChange(this.cb1);
    this.setData({
      cb1Result: ''
    })
    console.log('Unregister callback cb1')
  },

  onLocationChangeError() {
    console.log('Start locationError listening, register error callback errCb');
    wx.showToast({
      icon: 'none',
      title: i18n['locationChange1']
    })
    wx.onLocationChangeError(this.errCb)
  },

  offLocationChangeError() {
    wx.showToast({
      icon: 'none',
      title: i18n['locationChange2']
    });
    wx.offLocationChangeError(this.errCb)
  },

  choosePoi() {
    wx.choosePoi({
      success: res => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['locationChange3'],
          content: JSON.stringify(res)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: i18n['locationChange4']
        })
        console.log('====err', err)
      },
      complete: res => {
        wx.showToast({
          icon: 'none',
          title: 'choosePoi complete'
        })
        console.log('====err', res)
      }
    })
  },


  getFuzzyLocation() {
    wx.getFuzzyLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude

        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['locationChange5'],
          content: JSON.stringify({
            latitude,
            longitude
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: i18n['locationChange6']
        })
        console.log('====err', err)
      },

      complete: res => {
        wx.showToast({
          icon: 'none',
          title: 'getFuzzyLocation complete'
        })
        console.log('====err', res)
      }
    })
  },

  startLocationUpdateBackground() {
    wx.startLocationUpdateBackground({
      type: 'wgs84',
      success(res) {
        console.log('====res', res);
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['locationChange7'],
          content: JSON.stringify(res || {})
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: i18n['locationChange8']
        })
        console.log('====err', err)
      },

      complete: res => {
        wx.showToast({
          icon: 'none',
          title: 'startLocationUpdateBackground complete'
        })
        console.log('====err', res)
      }
    })
  }

})
