const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['image0'],
      path: 'packageAPI/pages/media/image/image'
    }
  },

  data: {
    theme: 'light',
    imageList: [],
    sourceTypeIndex: 2,
    sizeTypeIndex: 2,
    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    saveImageToPhotosAlbumRes: '',
    editImageRes: '',
    cropImageRes: '',
    compressImageRes: '',
    chooseMessageFileRes: '',
    chooseImageRes: ''
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  delete(e) {
    let { imageList } = this.data
    const index = e.target.dataset['index']
    imageList.splice(index, 1)
    this.setData({
      imageList
    });
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log('chooseImage', res)
        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths).slice(0, that.data.count[that.data.countIndex]),
          chooseImageRes: JSON.stringify(res)
        })
      },
      fail(err) {
        console.log('chooseImage', err)
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList,
      success: (res) => {
        console.log('previewImage', res)
      },
      fail: (err) => {
        console.log('previewImage', err)
      }
    })
  },
  saveImageToPhotosAlbum() {
    const url = this.data.imageList[0];
    console.log('Temporary picture address：', this.data.imageList[0]);
    if (url) {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.imageList[0],
        success: (res) => {
          console.log('saveImageToPhotosAlbum', res);
          this.setData({
            saveImageToPhotosAlbumRes: JSON.stringify(res)
          })
          wx.showToast({
            title: i18n['image1']
          })
        },
        fail: (err) => {
          console.log('saveImageToPhotosAlbum', err);
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['image2'],
        content: i18n['image3'],
        showCancel: false
      })
    }
  },
  previewMediaImage() {
    wx.previewMedia({
      sources: [{
        url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        type: 'image',
        poster: ''
      }],
      current: 0,
      success: (res) => {
        console.log('previewMedia', res);
      },
      fail: (err) => {
        console.log('previewMedia', err);
      }
    })
  },
  previewMediaVideo() {
    wx.previewMedia({
      sources: [{
        url: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        type: 'video',
        poster: ''
      }],
      current: 0,
      success: (res) => {
        console.log('previewMedia', res);
      },
      fail: (err) => {
        console.log('previewMedia', err);
      }
    })
  },
  previewImageByUrl() {
    wx.previewImage({
      current: 'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont2.24edf9d4.png',
      urls: [
        'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont2.24edf9d4.png',
        'https://res.wx.qq.com/wxdoc/dist/assets/img/1emphasis.dont.ea816829.png',
        'https://res.wx.qq.com/wxdoc/dist/assets/img/2flow.dont.7300d84e.png'
      ],
      success: (res) => {
        console.log('previewImage', res);
      },
      fail: (err) => {
        console.log('previewImage', err);
      }
    })
  },
  getImageInfo() {
    wx.getImageInfo({
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
      success: (res) => {
        console.log('getImageInfo', res)
        this.setData({
          getImageInfoRes: JSON.stringify(res)
        })
      },
      fail: (err) => {
        console.log('getImageInfo', err)
      }
    })
  },
  compressImage() {
    wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
      success: (res) => {
        console.log('downloadFile success', res);
        wx.compressImage({
          src: res.tempFilePath,   // Image path
          quality: 50,   // Compression quality
          compressedWidth: 200,
          compressedHeight: 150,
          success: (res) => {
            console.log('compressImage', res);
            wx.getImageInfo({
              src: res.tempFilePath,
              success: (res) => {
                console.log('getImageInfo', res)
                this.setData({
                  compressImageRes: JSON.stringify(res)
                })
              },
              fail: (err) => {
                console.log('getImageInfo fail', err)
              }
            })
          },
          fail: (err) => {
            console.log('compressImage fail', err);
          }
        })
      },
      fail: (err) => {
        console.log('downloadFile fail', err);
      }
    })
  },
  chooseMessageFile(e) {
    wx.chooseMessageFile({
      count: 1,
      type: e.currentTarget.dataset.type,
      success: (res) => {
        console.log('chooseMessageFile', res);
        this.setData({
          chooseMessageFileRes: JSON.stringify(res)
        })
      },
      fail: (err) => {
        console.log('chooseMessageFile', err);
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['image0']
    })
    this.setData({
      t: i18n,
      lang,
      sourceType: [i18n['image14'], i18n['image15'], i18n['image16']],
      sizeType: [i18n['image17'], i18n['image18'], i18n['image19']]
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
