import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['device-motion0'],
      path: 'packageAPI/pages/device/device-motion/device-motion'
    }
  },

  data: {
    theme: 'light',
    disabled: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  },
  
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['device-motion0']
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
    this.listener = (res) => {
      console.log('===onDeviceMotionChange===', res)
      const { alpha, beta, gamma } = res
      this.setData({
        alpha,
        beta,
        gamma
      })
    }
  },

  startDeviceMotionListening() {
    wx.startDeviceMotionListening({
      success: (res) => {
        console.log('===startDeviceMotionListening success', res)
      },
      fail: (err) => {
        console.log('===startDeviceMotionListening fail', err)
      }
    })
  },

  stopDeviceMotionListening() {
    wx.stopDeviceMotionListening({
      success: (res) => {
        console.log('===stopDeviceMotionListening success', res)
      },
      fail: (err) => {
        console.log('===stopDeviceMotionListening fail', err)
      }
    })
  },

  onDeviceMotionChange() {
    this.setData({
      disabled: true
    });
    wx.onDeviceMotionChange(this.listener)
  },

  offDeviceMotionChange() {
    this.setData({
      disabled: false
    });
    wx.offDeviceMotionChange(this.listener)
  }
})
