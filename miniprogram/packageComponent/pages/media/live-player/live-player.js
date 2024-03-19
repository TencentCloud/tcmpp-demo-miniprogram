import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'live-player',
      path: 'packageComponent/pages/media/live-player/live-player'
    }
  },
  data: {
    t: i18n,
    theme: 'light',
    videoSrc: ''
  },
  onReady() {
    this.ctx = wx.createLivePlayerContext('player')
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
  handleLivePlayerStateChange(e) {
    log('live-player code:', e.detail.code)
  },
  handleLivePlayerError(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  handlePlay() {
    this.ctx.play({
      success: (res) => {
        log('live-player play success', res)
      },
      fail: (err) => {
        log('live-player play fail', err)
      }
    })
  },
  handlePause() {
    this.ctx.pause({
      success: (res) => {
        log('live-player pause success', res)
      },
      fail: (err) => {
        log('live-player pause fail', err)
      }
    })
  },
  handleStop() {
    this.ctx.stop({
      success: (res) => {
        log('live-player stop success', res)
      },
      fail: (err) => {
        log('live-player stop fail', err)
      }
    })
  },
  handleResume() {
    this.ctx.resume({
      success: (res) => {
        log('live-player resume success', res)
      },
      fail: (err) => {
        log('live-player resume fail', err)
      }
    })
  },
  handleMute() {
    this.ctx.mute({
      success: (res) => {
        log('live-player mute success', res)
      },
      fail: (err) => {
        log('live-player mute fail', err)
      }
    })
  },
  handleVideoSrcInput(e) {
    this.setData({
      videoSrc: e.detail.value
    })
  },

  handleRequestFullScreen() {
    this.ctx.requestFullScreen({
      // direction: 90,
      success: (res) => {
        log('live-player requestFullScreen success', res)
      },
      fail: (err) => {
        log('live-player requestFullScreen fail', err)
      }
    })
  },
  handleExitFullScreen() {
    this.ctx.exitFullScreen({
      success: (res) => {
        log('live-player exitFullScreen success', res)
      },
      fail: (err) => {
        log('live-player exitFullScreen fail', err)
      }
    })
  },
  handleSnapshot() {
    this.ctx.snapshot({
      success: (res) => {
        log('live-player snapshot success', res)
      },
      fail: (err) => {
        log('live-player snapshot fail', err)
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
  },
  onUnload() {
    this.handleExitFullScreen()
  }
})
