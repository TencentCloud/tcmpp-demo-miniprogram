import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    uploadTask: null,
    progress: 0
  },
  onShareAppMessage() {
    return {
      title: i18n['uploadFile0'],
      path: 'packageAPI/pages/network/upload-file/upload-file'
    }
  },
  chooseVideo() {
    wx.chooseVideo({
      success: res => {
        const filePath = res.tempFilePath;
        console.log('filePath======', filePath);

        let uploadTask = wx.uploadFile({
          url: 'https://api.juejin.cn/tag_api/v1/query_category_briefs', //Only for example, non -real interface address
          filePath,
          name: 'file',
          formData: {
            a: 1,
            b: 2
          },
          success(res) {
            console.log('Returned data ===', res)
            //do something
            wx.showToast({
              title: i18n['uploadFile1'],
              icon: 'success',
              mask: true
            })
          },
          fail(err) {
            console.log(err)
          }
        });

        uploadTask.onProgressUpdate(this.progressUpdateHandler)
        uploadTask.onHeadersReceived(this.headerUpdateHandler)
        this.setData({
          uploadTask
        });
      },
      fail: err => {
        console.log('Upload failed ===', err);
      }
    })
  },
  headerUpdateHandler(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['uploadFile2'],
      content: JSON.stringify(res)
    })
    console.log('HTTP Response Header event detected ===', res)
  },
  offHeadersReceived() {
    if (this.data.uploadTask) {
      this.data.uploadTask.offHeadersReceived(this.headerUpdateHandler)
      wx.showToast({
        title: i18n['uploadFile3'],
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: i18n['uploadFile4'],
        icon: 'none'
      })
    }
  },
  progressUpdateHandler(res) {
    console.log('Upload progress change event detected ===', res)

    this.setData({
      progress: res.progress
    })
  },
  offProgess() {
    if (this.data.uploadTask) {
      if (this.data.uploadTask) {
        this.data.uploadTask.offProgressUpdate(this.progressUpdateHandler)
      }
      wx.showToast({
        title: i18n['uploadFile5']
      })
      console.log('Removed listener for upload progress change event')
    } else {
      wx.showToast({
        title: i18n['uploadFile6'],
        icon: 'none'
      })
    }
  },
  abortUpload() {
    if (this.data.uploadTask) {
      this.data.uploadTask.abort();
    } else {
      wx.showToast({
        title: i18n['uploadFile7'],
        icon: 'none'
      })
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['uploadFile0']
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
