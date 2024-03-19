const util = require('../../../../util/util.js')
const backgroundAudioManager = wx.getBackgroundAudioManager()
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
    let title=backgroundAudioManager.title
    let paused=backgroundAudioManager.paused
    // If the current background music is the music material of this page, update the playback information
    if (title === 'shortAudio') {
      this.setData({
        playTime: backgroundAudioManager.currentTime,
        duration: util.formatTime(backgroundAudioManager.duration || 0),
        durationStamp: backgroundAudioManager.duration,
        formattedPlayTime: util.formatTime(backgroundAudioManager.currentTime)
      })
      // If the music is during playback, the update is played
      if(!paused) {
        clearInterval(updateInterval)
        this._enableInterval() 
        this.setData({
          playing: true
        })
      }
    }

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
    backgroundAudioManager.title = 'shortAudio'
    backgroundAudioManager.epname = 'shortAudio'
    backgroundAudioManager.singer = 'Jiushi'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    this.setData({
      playing: true
    })
    clearInterval(updateInterval)
    this._enableInterval()
    if (this.data.pause && backgroundAudioManager.title === 'shortAudio') 
      backgroundAudioManager.play()
    else {
      // Playback starts automatically after setting src
      backgroundAudioManager.src = 'https://dl.espressif.com/dl/audio/gs-16b-2c-44100hz.mp3'
    }
  },

  seek(e) {
    console.log('=====seek', e.detail.value)
    backgroundAudioManager.seek(e.detail.value);
  },

  pause() {
    clearInterval(updateInterval)
    backgroundAudioManager.pause()
    // Update the play status when the playback is suspended
    this.setData({
      playTime: backgroundAudioManager.currentTime,
      formattedPlayTime: util.formatTime(backgroundAudioManager.currentTime)
    })
  },

  stop() {
    clearInterval(updateInterval)
    backgroundAudioManager.stop()
  },

  _enableInterval() {
    const update = () => {
      this.setData({
        playTime: backgroundAudioManager.currentTime,
        duration: util.formatTime(backgroundAudioManager.duration || 0),
        durationStamp: backgroundAudioManager.duration,
        formattedPlayTime: util.formatTime(backgroundAudioManager.currentTime)
      })
    }
    updateInterval = setInterval(update, 300)
  },

  onUnload() {
    clearInterval(updateInterval)
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Background audio']
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

    // Listen for seek events
    backgroundAudioManager.onSeeked(() => {
      const { currentTime } = backgroundAudioManager;
      console.log('backgroundAudio seeked', currentTime);
      this.setData({
        formattedPlayTime: util.formatTime(currentTime)
      });
    })

    // Listen for playback events
    backgroundAudioManager.onPlay(() => {
      if(backgroundAudioManager.title === 'shortAudio'){
        console.log('backgroundAudio played', backgroundAudioManager.duration)
        // Refresh playback time
        clearInterval(updateInterval)
        this._enableInterval()
        this.setData({
          playing: true,
          pause: false,
          duration: util.formatTime(backgroundAudioManager.duration || 0),
          durationStamp: backgroundAudioManager.duration || 0
        })
      }
    })

    // Listen for pause events
    backgroundAudioManager.onPause(() => {
      console.log('backgroundAudio paused')
      clearInterval(updateInterval)
      this.setData({
        playing: false,
        pause: true
      })
    })

    backgroundAudioManager.onEnded(() => {
      console.log('backgroundAudio ended')
      clearInterval(updateInterval)
      this.setData({
        playing: false,
        playTime: 0,
        formattedPlayTime: util.formatTime(0)
      })
    })

    backgroundAudioManager.onStop(() => {
      console.log('backgroundAudio stopped')
      clearInterval(updateInterval)
      this.setData({
        playing: false,
        playTime: 0,
        formattedPlayTime: util.formatTime(0)
      })
    })

    backgroundAudioManager.onSeeking(() => {
      console.log('backgroundAudio onSeeking')
    })
  }
})
