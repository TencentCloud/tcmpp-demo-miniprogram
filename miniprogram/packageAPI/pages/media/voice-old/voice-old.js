const util = require('../../../../util/util.js')

let recordTimeInterval
let playTimeInterval
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['voiceOld0'],
      path: 'packageAPI/pages/media/voice-old/voice-old'
    }
  },
  data: {
    theme: 'light',
    recording: false, // Recording in progress
    playing: false, // Playing
    hasRecord: false, // Recording complete
    recordTime: 0, // Recording duration
    playTime: 0, // Playback duration
    pauseRecord: false, // Pause recording
    formatedRecordTime: '00:00:00', // Recording time
    formatedPlayTime: '00:00:00' // Playback time
  },

  onHide() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['voiceOld0']
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

  startRecord() {
    console.log('startRecord')
    this.setData({
      recording: true
    })
    recordTimeInterval = setInterval(() => {
      this.data.recordTime += 1
      const recordTime = this.data.recordTime
      this.setData({
        formatedRecordTime: util.formatTime(this.data.recordTime),
        recordTime
      })
    }, 1000)
    wx.startRecord({
      success: (res) => {
        const tempFilePath = res.tempFilePath
        console.log('===startrecord success===', res.tempFilePath)
        this.setData({
          tempFilePath
        })
      },
      fail: (err) => {
        console.log('===startrecord fail===', err)
      }
    })
  },

  stopRecord() {
    console.log('stopRecord')
    wx.stopRecord({
      success: (res) => {
        console.log('===stoprecord success===', res)
        this.setData({
          hasRecord: true, // Recording finished
          recording: false,
          pauseRecord: false
        })
        // Clear recording timer
        clearInterval(recordTimeInterval)
      },
      fail: (err) => {
        console.log('===stoprecord fail===', err)
      }
    })
  },

  playVoice() {
    this.setData({
      playing: true
    })
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: () => {
        console.log('===playVoice success===')
      },
      fail: (err) => {
        console.log('===playVoice err===', err)
      }
    })
    playTimeInterval = setInterval(() => {
      let playTime = this.data.playTime
      if (this.data.playTime === this.data.recordTime) {
        this.stopVoice()
      } else {
        playTime++
        console.log('update playTime', playTime)
        this.setData({
          formatedPlayTime: util.formatTime(playTime),
          playTime
        })
      }
    }, 1000)
  },

  pauseVoice() {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false
    })
    wx.pauseVoice({
      success: () => {
        this.setData({
          playing: false
        })
        console.log('===pauseVoice success===')
      },
      fail: (err) => {
        console.log('===pauseVoice err===', err)
      }
    })
  },

  stopVoice() {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      playTime: 0,
      formatedPlayTime: util.formatTime(0)
    })
    wx.stopVoice({
      success: () => {
        this.setData({
          playing: false
        })
        console.log('===stopVoice success===')
      },
      fail: (err) => {
        console.log('===stopVoice err===', err)
      }
    })
  },

  clear() {
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0
    })
    clearInterval(playTimeInterval)
    clearInterval(recordTimeInterval)
  }
})
