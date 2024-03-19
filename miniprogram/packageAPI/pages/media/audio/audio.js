const audioType = {
  flac: '.flac',
  mp3: '.mp3',
  ogg: '.ogg',
  mp4: '.mp4',
  opus: '.opus',
  wav: '.wav',
  ac3: '.ac3',
  aac: '.aac',
  aiff: '.aiff',
  m4a: '.m4a',
  ts: '.ts',
  wma: '.wma'
}

const canplayListener = function (res) {
  console.log('===canplayListener===', res)
}
const endedListener = function (res) {
  console.log('===endedListener===', res)
}
const errorListener = function (res) {
  console.log('===errorListener===', res)
}
const pauseListener = function (res) {
  console.log('===pauseListener===', res)
}
const playListener = function (res) {
  console.log('===playListener===', res)
}
const seekedListener = function (res) {
  console.log('===seekedListener===', res)
}
const seekingListener = function (res) {
  console.log('===seekingListener===', res)
}
const stopListener = function (res) {
  console.log('===stopListener===', res)
}
const timeUpdateListener = function (res) {
  console.log('===timeUpdateListener===', res)
}
const waitingListener = function (res) {
  console.log('===waitingListener===', res)
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Audio',
      path: 'packageAPI/pages/media/audio/audio'
    }
  },
  onReady() {
    this.createInnerAudioContext()
  },
  data: {
    theme: 'light',
    src: '',
    audioCtx: null
  },
  createInnerAudioContext() {
    // Use wx.createAudioContext to get the audio context for the audio element
    this.audioCtx = wx.createInnerAudioContext()
    console.log('===audioCtx===', this.audioCtx)
    this.setData({
      audioCtx: this.audioCtx
    })
    this.audioCtx.onCanplay(canplayListener)
    this.audioCtx.onEnded(endedListener)
    this.audioCtx.onError(errorListener)
    this.audioCtx.onPause(pauseListener)
    this.audioCtx.onPlay(playListener)
    this.audioCtx.onSeeked(seekedListener)
    this.audioCtx.onSeeking(seekingListener)
    this.audioCtx.onStop(stopListener)
    this.audioCtx.onTimeUpdate(timeUpdateListener)
    this.audioCtx.onWaiting(waitingListener)

    this.audioCtx.src = 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz' + audioType.mp3
  },
  setInnerAudioOption() {
    wx.setInnerAudioOption({
      setInnerAudioOption: true,
      obeyMuteSwitch: false,
      speakerOn: false,
      complete: (res) => {
        console.log('===setInnerAudioOption===', res)
      }
    })
  },
  gotoAudioOldVersion() {
    wx.navigateTo({
      url: '/packageAPI/pages/media/audio-old/audio-old'
    })
  },
  getAvailableAudioSources() {
    wx.getAvailableAudioSources({
      success: (res) => {
        const { audioSources } = res;
        wx.showToast({
          icon: 'none',
          title: audioSources ? `audioSources: ${JSON.stringify(audioSources)}` : 'No support for audio input source list'
        })
        console.log('===getAvailableAudioSources success===', res)
      },
      fail: (err) => {
        console.log('===getAvailableAudioSources fail===', err)
      }
    })
  },
  destroy() {
    this.audioCtx.destroy()
    this.setData({
      audioCtx: null
    })
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  seek14() {
    this.audioCtx.seek(180)
  },
  audioStart() {
    this.audioCtx.seek(0)
  },
  audioStop() {
    this.audioCtx.stop()
  },
  offCanplay() {
    this.audioCtx.offCanplay(canplayListener)
  },
  offEnded() {
    this.audioCtx.offEnded(endedListener)
  },
  offError() {
    this.audioCtx.offError(errorListener)
  },
  offPause() {
    this.audioCtx.offPause(pauseListener)
  },
  offPlay() {
    this.audioCtx.offPlay(playListener)
  },
  offSeeked() {
    this.audioCtx.offSeeked(seekedListener)
  },
  offSeeking() {
    this.audioCtx.offSeeking(seekingListener)
  },
  offStop() {
    this.audioCtx.offStop(stopListener)
  },
  offTimeUpdate() {
    this.audioCtx.offTimeUpdate(timeUpdateListener)
  },
  offWaiting() {
    this.audioCtx.offWaiting(waitingListener)
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Audio']
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
  onUnload(){
    this.audioCtx.destroy()
  }
})
