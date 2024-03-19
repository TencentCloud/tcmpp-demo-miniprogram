import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'live-pusher',
      path: 'packageComponent/pages/media/live-pusher/live-pusher'
    }
  },
  data: {
    t: i18n,
    lang,
    theme: 'light',
    videoSrc: '',
    screenOn: false
  },
  onReady() {
    this.ctx = wx.createLivePusherContext('pusher')
  },
  handleLivePusherStateChange(e) {
    log('live-pusher code:', e.detail.code)
  },
  handleLivePusherError(e) {
    console.error('live-pusher error:', e.detail.errMsg)
  },
  toogleSetKeepScreenOn() {
    wx.setKeepScreenOn({
      keepScreenOn: !this.data.screenOn,
      success: () => {
        log('live-pusher setKeepScreenOn success')
        this.setData({
          screenOn: !this.data.screenOn
        })
      },
      fail: (err) => {
        log('live-pusher setKeepScreenOn fail', err)
      }
    })
  },
  handleStart() {
    this.ctx.start({
      success: (res) => {
        log('live-pusher start success', res)
      },
      fail: (err) => {
        log('live-pusher start fail', err)
      }
    })
  },
  handleScanQRCode() {
    wx.scanCode({
      complete: (res) => {
        const { result } = res
        this.setData({
          videoSrc: result
        })
      }
    })
  },
  handlePause() {
    this.ctx.pause({
      success: (res) => {
        log('live-pusher pause success', res)
      },
      fail: (err) => {
        log('live-pusher pause fail', err)
      }
    })
  },
  handleStop() {
    this.ctx.stop({
      success: (res) => {
        log('live-pusher stop success', res)
      },
      fail: (err) => {
        log('live-pusher stop fail', err)
      }
    })
  },
  handleResume() {
    this.ctx.resume({
      success: (res) => {
        log('live-pusher resume success', res)
      },
      fail: (err) => {
        log('live-pusher resume fail', err)
      }
    })
  },
  handleSwitchCamera() {
    this.ctx.switchCamera({
      success: (res) => {
        log('live-pusher switch camera success', res)
      },
      fail: (err) => {
        log('live-pusher switch camera fail', err)
      }
    })
  },
  handleVideoSrcChange(e) {
    this.setData({
      videoSrc: e.detail.value
    })
  },
  handlePlayBGM() {
    this.ctx.playBGM({
      url: 'https://dl.espressif.com/dl/audio/gs-16b-2c-44100hz.mp3',
      success: (res) => {
        log('live-pusher playBGM success', res)
      },
      fail: (err) => {
        log('live-pusher playBGM fail', err)
      }
    })
  },
  handlePauseBGM() {
    this.ctx.pauseBGM({
      success: (res) => {
        log('live-pusher pauseBGM success', res)
      },
      fail: (err) => {
        log('live-pusher pauseBGM fail', err)
      }
    })
  },
  handleStopBGM() {
    this.ctx.stopBGM({
      success: (res) => {
        log('live-pusher stopBGM success', res)
      },
      fail: (err) => {
        log('live-pusher stopBGM fail', err)
      }
    })
  },
  handleSetBGMVolume() {
    this.ctx.setBGMVolume({
      volume: 0.2,
      success: (res) => {
        log('live-pusher setBGMVolume success', res)
      },
      fail: (err) => {
        log('live-pusher setBGMVolume fail', err)
      }
    })
    wx.showToast({
      icon: 'none',
      title: i18n['live-pusher20']
    })
  },
  handleSetMICVolume() {
    this.ctx.setMICVolume({
      volume: 0.2,
      success: (res) => {
        log('live-pusher setMICVolume success', res)
      },
      fail: (err) => {
        log('live-pusher setMICVolume fail', err)
      }
    })
    wx.showToast({
      icon: 'none',
      title: i18n['live-pusher21']
    })
  },
  handleSnapshot() {
    this.ctx.snapshot({
      success: (res) => {
        log('live-pusher snapshot success', res)
      },
      fail: (err) => {
        log('live-pusher snapshot fail', err)
      }
    })
  },
  handleStartPreview() {
    this.ctx.startPreview({
      success: (res) => {
        log('live-pusher startPreview success', res)
      },
      fail: (err) => {
        log('live-pusher startPreview fail', err)
      }
    })
  },
  handleStopPreview() {
    this.ctx.stopPreview({
      success: (res) => {
        log('live-pusher stopPreview success', res)
      },
      fail: (err) => {
        log('live-pusher stopPreview fail', err)
      }
    })
  },
  handleToggleTorch() {
    this.ctx.toggleTorch({
      success: (res) => {
        log('live-pusher toggleTorch success', res)
      },
      fail: (err) => {
        log('live-pusher toggleTorch fail', err)
      }
    })
  },


  onLoad() {
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
