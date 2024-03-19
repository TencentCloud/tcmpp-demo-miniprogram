const sourceType = [['camera'], ['album'], ['camera', 'album']]
const camera = ['front', 'back']

// eslint-disable-next-line
const duration = Array.apply(null, { length: 60 }).map(function (n, i) {
  return i + 1
})

const videoUrl = 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload.mp4?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['video0'],
      path: 'packageAPI/pages/media/video/video'
    }
  },

  data: {
    theme: 'light',
    sourceTypeIndex: 2,
    cameraIndex: 1,
    durationIndex: 59,
    src: '',
    videoContext: null,
    saveVideoToPhotosAlbumRes: '',
    openVideoEditorRes: '',
    getVideoInfoRes: '',
    compressVideoRes: '',
    chooseVideoRes: '',
    chooseMediaRes: ''
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  cameraChange(e) {
    this.setData({
      cameraIndex: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      durationIndex: e.detail.value
    })
  },
  chooseVideo() {
    wx.chooseVideo({
      sourceType: sourceType[this.data.sourceTypeIndex],
      camera: camera[this.data.cameraIndex],
      maxDuration: duration[this.data.durationIndex],
      success: (res) => {
        console.log('chooseVideo success', res);
        this.setData({
          src: res.tempFilePath,
          chooseVideoRes: JSON.stringify(res)
        })
        this.createVideoContext()
      },
      fail: (err) => {
        console.log('chooseVideo fail', err);
      }
    })
  },
  saveVideoToPhotosAlbum() {
    if (this.data.src) {
      wx.saveVideoToPhotosAlbum({
        filePath: this.data.src,
        success: (res) => {
          this.setData({
            saveVideoToPhotosAlbumRes: JSON.stringify(res)
          })
        },
        fail: (err) => {
          console.log('saveVideoToPhotosAlbum fail===', err)
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  createVideoContext() {
    this.setData({
      videoContext: wx.createVideoContext('myVideo')
    })
    console.log(this.data.videoContext)
  },
  compressVideo() {
    wx.downloadFile({
      url: videoUrl,
      success: (res) => {
        console.log('downloadFile success', res);
        wx.compressVideo({
          src: res.tempFilePath,
          quality: 'low',
          bitrate: 100,
          fps: 60,
          resolution: 0.5,
          success: (res) => {
            this.setData({
              compressVideoRes: JSON.stringify(res)
            })
          },
          fail: (err) => {
            console.log('compressVideo', err);
          }
        })
      },
      fail: (err) => {
        console.log('downloadFile fail', err);
      }
    })
  },
  chooseMediaImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: camera[this.data.cameraIndex],
      success: (res) => {
        console.log('chooseMedia', res);
        this.setData({
          chooseMediaRes: JSON.stringify(res)
        })
      },
      fail: (err) => {
        console.log('chooseMedia', err);
      }
    })
  },
  chooseMediaVideo() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: camera[this.data.cameraIndex],
      success: (res) => {
        console.log('chooseMedia', res);
        this.setData({
          chooseMediaRes: JSON.stringify(res)
        })
      },
      fail: (err) => {
        console.log('chooseMedia', err);
      }
    })
  },
  exitBackgroundPlayback() {
    if (this.data.videoContext) {
      this.data.videoContext.exitBackgroundPlayback({
        success: () => {
          console.log('exitBackgroundPlayback success')
        },
        fail: (res) => {
          console.log('exitBackgroundPlayback fail', res)
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  requestBackgroundPlayback() {
    if (this.data.videoContext) {
      this.data.videoContext.requestBackgroundPlayback({
        success: () => {
          console.log('requestBackgroundPlayback success')
        },
        fail: (res) => {
          console.log('requestBackgroundPlayback fail', res)
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  exitFullScreen() {
    if (this.data.videoContext) {
      this.data.videoContext.exitFullScreen()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  exitPictureInPicture() {
    if (this.data.videoContext) {
      this.data.videoContext.exitPictureInPicture({
        success: () => {
          console.log('exitPictureInPicture success')
        },
        fail: (res) => {
          console.log('exitPictureInPicture fail', res)
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  hideStatusBar() {
    if (this.data.videoContext) {
      this.data.videoContext.hideStatusBar()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  pause() {
    if (this.data.videoContext) {
      this.data.videoContext.pause()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  play() {
    if (this.data.videoContext) {
      this.data.videoContext.play()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  changePlaybackRate() {
    if (this.data.videoContext) {
      this.data.videoContext.playbackRate(0.5) // Support 0.5/0.8/1.0/1.25/1.5
      wx.showToast({
        icon: 'none',
        title: i18n['video18']
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  seek() {
    if (this.data.videoContext) {
      wx.showToast({
        icon: 'none',
        title: i18n['video19']
      })
      // Position the video to the 5th second
      this.data.videoContext.seek(5)
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  sendDanmu() {
    if (this.data.videoContext) {
      this.data.videoContext.sendDanmu({
        text: 'test danmu'
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  showStatusBar() {
    if (this.data.videoContext) {
      this.data.videoContext.showStatusBar()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  stop() {
    if (this.data.videoContext) {
      this.data.videoContext.stop()
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['video1'],
        content: i18n['video2'],
        showCancel: false
      })
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['video0']
    })
    this.setData({
      t: i18n,
      lang,
      sourceType: [i18n['video9'], i18n['video10'], i18n['video11']],
      camera: [i18n['video12'], i18n['video13'], i18n['video14']],
      danmuList:
      [{
        text: i18n['video15'],
        color: '#ff0000',
        time: 1
      }, {
        text: i18n['video16'],
        color: '#ff00ff',
        time: 3
      }],
      duration: duration.map((t) => `${t}${i18n['video17']}`)
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
