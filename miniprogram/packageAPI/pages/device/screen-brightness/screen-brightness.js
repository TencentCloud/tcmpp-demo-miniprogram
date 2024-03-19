import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['screen0'],
      path: 'packageAPI/pages/device/screen-brightness/screen-brightness'
    }
  },

  data: {
    theme: 'light',
    screenBrightness: 0,
    captured: false,
    recorded: false,
    keepScreenOn: false,
    onCaptureDisabled: false,
    onScreenRecordingDisabled: false,
    visualEffect: 'none'
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['screen0']
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
    this._updateScreenBrightness()
  },

  changeBrightness(e) {
    const value = Number.parseFloat(
      (e.detail.value).toFixed(1)
    )
    this.setData({
      screenBrightness: Number.parseFloat(
        e.detail.value.toFixed(1)
      )
    })
    wx.setScreenBrightness({
      value

    })
  },

  _updateScreenBrightness() {
    wx.getScreenBrightness({
      success: (res) => {
        console.log(res)
        this.setData({
          screenBrightness: Number.parseFloat(
            res.value.toFixed(1)
          )
        })
      },
      fail(err) {
        console.error(err)
      }
    })
  },

  onUserCaptureScreen() {
    this.setData({
      onCaptureDisabled: true
    })
    wx.onUserCaptureScreen(() => {
      console.log('===onUserCaptureScreen===')
      this.setData({
        captured: true
      })
    })
  },

  offUserCaptureScreen() {
    this.setData({
      onCaptureDisabled: false
    })
    wx.offUserCaptureScreen(() => {
      console.log('===offUserCaptureScreen===')
    })
  },

  onScreenRecordingStateChanged() {
    this.setData({
      onScreenRecordingDisabled: true
    })
    wx.onScreenRecordingStateChanged((res) => {
      this.setData({
        recorded: true
      })
      console.log('===onScreenRecordingStateChanged===', res)
    })
  },

  offScreenRecordingStateChanged() {
    this.setData({
      onScreenRecordingDisabled: false
    })
    wx.offScreenRecordingStateChanged(() => {
      console.log('===offScreenRecordingStateChanged===')
    })
  },

  setVisualEffectOnCapture() {
    const visualEffect = this.data.visualEffect === 'none' ? 'hidden' : 'none';
    wx.setVisualEffectOnCapture({
      visualEffect,
      success: (res) => {
        console.log('===setVisualEffectOnCapture===', res)
        this.setData({
          visualEffect
        })
      }
    })
  },

  setKeepScreenOn() {
    wx.setKeepScreenOn({
      keepScreenOn: !this.data.keepScreenOn
    });
  },

  getScreenBrightness() {
    wx.getScreenBrightness({
      success: res => {
        wx.showToast({
          title: `The screen brightness is: ${res.value}`,
          icon: 'none'
        })
      },
      fail: err => {
        console.log('==getScreenBrightness err', err)
      },
      complete: res => {
        console.log('==getScreenBrightness complete', res)
      }
    })
  },

  getScreenRecordingState() {
    wx.getScreenRecordingState({
      success: res => {
        wx.showToast({
          title: `${i18n['2']}${res.state === 'on' ? i18n['3'] : i18n['4']}`,
          icon: 'none'
        })
      },
      fail: err => {
        console.log('==getScreenRecordingState err', err)
      },
      complete: res => {
        console.log('==getScreenRecordingState complete', res)
      }
    })
  }
})
