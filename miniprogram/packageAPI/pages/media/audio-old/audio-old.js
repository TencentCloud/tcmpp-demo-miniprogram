import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['audioOld0'],
      path: 'packageAPI/pages/media/audio-old/audio-old'
    }
  },
  onReady() {
    this.createAudioContext()
  },
  data: {
    theme: 'light'
  },
  createAudioContext() {
    this.audioCtx = wx.createAudioContext('audio1')
    console.log('===audioCtx===', this.audioCtx)
    this.audioCtx.setSrc('https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3')
  },
  play() {
    this.audioCtx.play()
  },
  seek0() {
    this.audioCtx.seek(0)
  },
  pause() {
    this.audioCtx.pause()
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['audioOld0']
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
  }
})
