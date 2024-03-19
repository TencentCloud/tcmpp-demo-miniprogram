import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['gyroscope0'],
      path: 'packageAPI/pages/device/gyroscope/gyroscope'
    }
  },

  data: {
    theme: 'light',
    systemInfo: {},
    x: 0,
    y: 0,
    z: 0,
    onDisabled: false
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          systemInfo: res
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['gyroscope0']
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

  cb(res) {
    console.log('====onGyroscopeChange', res)
    const { x, y, z } = res
    this.setData({
      x,
      y,
      z
    })
  },

  onGyroscopeChange() {
    this.setData({
      onDisabled: true
    });
    wx.onGyroscopeChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['gyroscope1']
    })
  },

  offGyroscopeChange() {
    this.setData({
      onDisabled: false
    });
    wx.offGyroscopeChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['gyroscope2']
    })
  },

  startGyroscope() {
    if (this.data.enabled) {
      return
    }
    wx.startGyroscope({
      interval: 'normal',
      success: () => {
        console.log('===stopGyroscope Listening successful')
        this.setData({
          enabled: true
        })
      },
      fail: err => {
        console.log('===stopGyroscope Listening failed', err)
      }
    })
  },

  stopGyroscope() {
    if (!this.data.enabled) {
      return
    }
    const that = this
    wx.stopGyroscope({
      success() {
        console.log('===stopGyroscope Stopping the listener successful')
        that.setData({
          enabled: false
        })
      },
      fail: err => {
        console.log('===stopGyroscope Stopping the listener failed', err)
      }
    })
  }
})
