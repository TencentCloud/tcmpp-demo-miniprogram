let task = null

import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    filePath: '',
    loadingImage: false,
    loadingVideo: false,
    isListenProgress: false,
    isListenHeader: false
  },
  onShareAppMessage() {
    return {
      title: i18n['download0'],
      path: 'packageAPI/pages/network/download-file/download-file'
    }
  },

  downloadImage() {
    const self = this
    self.setData({
      loadingImage: true
    })
    task = wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
      success: (res) => {
        self.setData({
          loadingImage: false,
          imageSrc: res.tempFilePath
        })
      },
      fail({ errMsg }) {
        console.log('download fail', errMsg)
        self.setData({
          loadingImage: false
        })
      }
    })
  },

  downloadVideo() {
    const self = this
    self.setData({
      loadingVideo: true
    })
    task = wx.downloadFile({
        url: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload.mp4?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        success: (res) => {
            self.setData({
              loadingVideo: false,
            })
            console.log('downloadVideo===', res)
        },
        fail({errMsg}) {
          console.log('download fail', errMsg)
          self.setData({
            loadingVideo: false,
          })
        }
    })

    this.onHeadersReceived()
  },

  onProgressUpdate() {
    if (task) {
      if (this.data.isListenProgress) {
        task.offProgressUpdate(this.progressUpdateHandler)
        wx.showToast({
          title: i18n['download1'],
          icon: 'none'
        })
      } else {
        task.onProgressUpdate(this.progressUpdateHandler)
      }
      this.setData({
        isListenProgress: !this.data.isListenProgress
      })
    } else {
      wx.showToast({
        title: i18n['download2'],
        icon: 'none'
      })
    }
  },

  onHeadersReceived() {
    if (task) {
      if (this.data.isListenHeader) {
        task.offHeadersReceived(this.headerUpdateHandler)
        wx.showToast({
          title: i18n['download3'],
          icon: 'none'
        })
      } else {
        task.onHeadersReceived(this.headerUpdateHandler)
      }
      this.setData({
        isListenHeader: !this.data.isListenHeader
      })
    } else {
      wx.showToast({
        title: i18n['download4'],
        icon: 'none'
      })
    }
  },

  headerUpdateHandler(res) {
    wx.showToast({
      title: i18n['download5']
    })
    console.log('HTTP Response Header event detected ===', res)
  },

  progressUpdateHandler(res) {
    console.log('Download progress change event detected ===', res)
  },

  abortDownloadFile() {
    task.abort()
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['download0']
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
