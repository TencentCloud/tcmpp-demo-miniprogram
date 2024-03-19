const util = require('../../../../util/util.js')

let playTimeInterval
let recordTimeInterval
const recorderManager = wx.getRecorderManager()
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['voice0'],
      path: 'packageAPI/pages/media/voice/voice'
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
    formatedPlayTime: '00:00:00', // Playback time
    innerAudioContext: null
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
      title: i18n['voice0']
    })
    this.setData({
      t: i18n,
      lang,
      innerAudioContext: wx.createInnerAudioContext()
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
    const that = this
    // Listen for recording start event
    recorderManager.onStart((res) => {
      console.log('recorderManager started', res)
      // Recording duration recording, refresh every second
      recordTimeInterval = setInterval(() => {
        that.data.recordTime += 1
        const recordTime = that.data.recordTime
        that.setData({
          formatedRecordTime: util.formatTime(that.data.recordTime),
          recordTime
        })
      }, 1000)
    })

    recorderManager.onError((err) => {
      console.log('recorderManager error', err)
    })

    // Listen for recording stop event
    recorderManager.onStop((res) => {
      console.log('recorderManager stopped', res)
      that.setData({
        hasRecord: true, // Recording finished
        recording: false,
        pauseRecord: false,
        tempFilePath: res.tempFilePath,
        formatedPlayTime: util.formatTime(that.data.playTime)
      })
      // Clear recording timer
      clearInterval(recordTimeInterval)
    })

    // Listen for recording pause event
    recorderManager.onPause((res) => {
      console.log('recorderManage: onPause')
      that.setData({
        pauseRecord: true,
        formatedPlayTime: util.formatTime(that.data.playTime)
      })
      clearInterval(recordTimeInterval)
    })

    // Listen for resume recording event
    recorderManager.onResume((res) => {
      console.log('recorderManage: onResume')
      clearInterval(recordTimeInterval)
      that.setData({
        pauseRecord: false
      })
      recordTimeInterval = setInterval(() => {
        that.data.recordTime += 1
        const recordTime = that.data.recordTime
        that.setData({
          formatedRecordTime: util.formatTime(that.data.recordTime),
          recordTime
        })
      }, 1000)
    })

    // Listen for playback start event
    this.data.innerAudioContext.onPlay((res) => {
      console.log('innerAudioContext played', res)
      playTimeInterval = setInterval(() => {
        const playTime = that.data.playTime + 1
        if (that.data.playTime === that.data.recordTime) {
          that.stopVoice()
        } else {
          console.log('update playTime', playTime)
          that.setData({
            formatedPlayTime: util.formatTime(playTime),
            playTime
          })
        }
      }, 1000)
    })

    this.data.innerAudioContext.onStop((res) => {
      clearInterval(playTimeInterval)
      console.log('innerAudioContext stopped', res)
    })

    this.data.innerAudioContext.onEnded((res) => {
      this.stopVoice()
      console.log('innerAudioContext ended', res)
    })
  },

  startRecord() {
    console.log('startRecord')
    // Set Recorder parameters
    const options = {
      duration: 10000, // Duration
      sampleRate: 44100,
      numberOfChannels: 2,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50,
      success: (res) => {
        console.log('recorderManager start', res)
        this.setData({
          recording: true // Start recording
        })
      },
      fail: (err) => {
        console.log('recorderManager err', err)
      }
    }
    recorderManager.start(options) // Begin recording
  },

  stopRecord() {
    console.log('stopRecord')
    recorderManager.stop() // Stop recording
  },
  pauseRecord() {
    recorderManager.pause()
  },
  resumeRecord() {
    recorderManager.resume()
  },
  stopRecordUnexpectedly() {
    const that = this
    wx.stopRecord({
      success() {
        console.log('stopRecord success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      },
      fail: (err) => {
        console.log('stopRecord fail', err)
      }
    })
  },

  playVoice() {
    this.data.innerAudioContext.src = this.data.tempFilePath
    this.setData({
      playing: true
    })
    this.data.innerAudioContext.play()
  },

  pauseVoice() {
    clearInterval(playTimeInterval)
    this.data.innerAudioContext.pause()
    console.log('innerAudioContext pause')
    this.setData({
      playing: false
    })
  },

  stopVoice() {
    clearInterval(playTimeInterval)
    this.data.innerAudioContext.stop()
    console.log('innerAudioContext stop')
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
  },

  clear() {
    clearInterval(playTimeInterval)
    this.data.innerAudioContext.stop()
    console.log('innerAudioContext stop')
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})
