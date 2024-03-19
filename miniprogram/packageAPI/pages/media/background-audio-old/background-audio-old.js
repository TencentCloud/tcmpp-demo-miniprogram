const util = require('../../../../util/util.js')
let updateInterval

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['bg-audio0'],
      path: 'packageAPI/pages/media/background-audio/background-audio'
    }
  },
  onShow() {
    const that = this 
    // If the current background music is the music material of this page, update the playback information
    wx.getBackgroundAudioPlayerState({
      success({currentPosition, duration, status, dataUrl}){
        if(dataUrl === 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3'){
          that.setData({
            playTime: currentPosition,
            formattedPlayTime: util.formatTime(currentPosition),
            duration: util.formatTime(duration || 0),
            durationStamp: duration || 0
          })
          // If the background music is playing, update the interface to Playing
          if(status === 1){
            clearInterval(updateInterval)
            that._enableInterval()
            that.setData({
              playing: true
            })
          }
        }
      }
    })
  },

  data: {
    theme: 'light',
    playing: false, // Playback status
    pause: false,
    playTime: 0, // Playback duration
    formattedPlayTime: '00:00:00', // Formatted playback duration
    duration: '00:00:00', // Total playback time
    durationStamp: 0 // Total playback time
  },

  play() {
    wx.playBackgroundAudio({
      dataUrl: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3',
      title: 'At this moment',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    })
    clearInterval(updateInterval)
    this._enableInterval()
    this.setData({
      playing: true
    })
  },

  seek(e) {
    console.log('=====seek', e.detail.value)
    const currentPosition = e.detail.value
    wx.seekBackgroundAudio({
      position: currentPosition
    })
    this.setData({
      playTime: currentPosition,
      formattedPlayTime: util.formatTime(currentPosition)
    })
  },

  pause() {
    clearInterval(updateInterval)
    wx.pauseBackgroundAudio()
    // Update the play status when the playback is suspended
    wx.getBackgroundAudioPlayerState({
      success: ({ currentPosition }) => {
        this.setData({
          playTime: currentPosition,
          formattedPlayTime: util.formatTime(currentPosition || 0)
        })
      }
    })
  },

  stop() {
    clearInterval(updateInterval)
    wx.stopBackgroundAudio()
  },

  _enableInterval() {
    const update = () => {
      wx.getBackgroundAudioPlayerState({
        success: ({ currentPosition,duration }) => {
          this.setData({
            playTime: currentPosition,
            formattedPlayTime: util.formatTime(currentPosition || 0),
            duration: util.formatTime(duration || 0),
            durationStamp: duration || 0
          })
        }
      })
    }
    updateInterval = setInterval(update, 300)
  },

  onUnload() {
    clearInterval(updateInterval)
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Background Audio (Old Edition)']
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

    // Listen for playback events
    wx.onBackgroundAudioPlay((res) => {
      console.log('backgroundAudio played', res)
      wx.getBackgroundAudioPlayerState({
        success: ({ duration, dataUrl }) => {
          if(dataUrl === 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3'){
            // Refresh playback time
            clearInterval(updateInterval)
            this._enableInterval()
            this.setData({
              playing: true,
              duration: util.formatTime(duration || 0),
              durationStamp: duration || 0
            })
          }
        },
        fail: (err) => {
          console.log('getBackgroundAudioPlayerState fail', err)
        }
      })
    })

    // Listen for pause events
    wx.onBackgroundAudioPause(() => {
      console.log('backgroundAudio paused')
      clearInterval(updateInterval)
      this.setData({
        playing: false,
        pause: true
      })
    })

    wx.onBackgroundAudioStop(() => {
      console.log('backgroundAudio stopped')
      clearInterval(updateInterval)
      this.setData({
        playing: false,
        playTime: 0,
        formattedPlayTime: util.formatTime(0)
      })
    })
  }
})
