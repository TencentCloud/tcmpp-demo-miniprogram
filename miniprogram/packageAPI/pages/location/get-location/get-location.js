const util = require('../../../../util/util.js')
const formatLocation = util.formatLocation

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['getLocation0'],
      path: 'packageAPI/pages/location/get-location/get-location'
    }
  },
  data: {
    theme: 'light',
    hasLocation: false
  },
  getLocation() {
    const that = this
    wx.getLocation({
      success(res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
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
      title: i18n['getLocation0']
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

  cb1(result) {
    console.log('cb1', result);
    this.setData({
      cb1Result: JSON.stringify(result)
    })
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

  errCb(res) {
    console.log('Listener result', res);
  },

  choosePoi() {
    const that = this;
    wx.choosePoi({
      complete(res) {
        console.log(res);
        that.setData({
          location: JSON.stringify(res)
        });
      }
    });
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
    wx.onLocationChange(this.data.cb1);
    wx.onLocationChange(this.data.cb2);
    wx.onLocationChange(this.data.cb3);
    console.log('Start listening, register callbacks cb1, cb2, cb3');
  },

  offLocationChange() {
    wx.offLocationChange(this.data.cb3);
    this.setData({
      cb3Result: ''
    })
    console.log('Unregister callback cb3')
  },

  onLocationChangeError() {
    console.log('Start locationError listening, register error callback errCb');
    wx.showToast({
      icon: 'none',
      title: i18n['getLocation1']
    })
    wx.onLocationChangeError(this.data.errCb)
  },

  offLocationChangeError() {
    wx.showToast({
      icon: 'none',
      title: i18n['getLocation2']
    });
    wx.offLocationChangeError()
  }
})
