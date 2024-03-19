
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Audio and video synthesis',
      path: 'packageAPI/pages/media/media-container/media-container'
    }
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
    const canIUse = wx.canIUse('wx.createMediaContainer()')
    if (canIUse) {
      this.mediaContainer = wx.createMediaContainer()
    } else {
      this.setData({
        canIUse: false
      })
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'WeChat version is too low，Do not support this function for the time being'
      })
    }
  },
  data: {
    theme: 'light',
    targetSrc: '',
    one: '',
    two: '',
    canIUse: true
  },
  handleChooseVideo(e) {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          [e.currentTarget.dataset.video]: res.tempFilePath
        })
        if (e.currentTarget.dataset.video === 'one') {
          that.mediaContainer.extractDataSource({
            source: that.data.one,
            success(mt) {
              that.mediaTrackOne = mt
            }
          })
        } else {
          that.mediaContainer.extractDataSource({
            source: that.data.two,
            success(mt) {
              that.mediaTrackTwo = mt
            }
          })
        }
      }
    })
  },
  handleExport() {
    if (this.data.one === '' || this.data.two === '') {
      wx.showToast({
        title: 'Please select source video first',
        icon: 'none'
      })
    } else {
      console.log(this.mediaTrackOne, this.mediaTrackTwo)
      // Get the video track of the source video 1
      const [trackMedia] = this.mediaTrackOne.tracks.filter(item => item.kind === 'video')
      // Get the audio track of the source video 2
      const [trackAudio] = this.mediaTrackTwo.tracks.filter(item => item.kind === 'audio')
      console.log(trackMedia, trackAudio)
      // Add tracks to the destination container
      this.mediaContainer.addTrack(
        trackMedia
      )
      this.mediaContainer.addTrack(
        trackAudio
      )
      const that = this
      // Combine the destination video
      this.mediaContainer.export({
        success: (res) => {
          that.setData({
            targetSrc: res.tempFilePath
          })
        }
      })
    }
  }
})
