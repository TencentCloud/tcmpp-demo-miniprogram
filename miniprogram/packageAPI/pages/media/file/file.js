import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['file0'],
      path: 'packageAPI/pages/media/file/file'
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['file0']
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
    this.setData({
      savedFilePath: wx.getStorageSync('savedFilePath')
    })
  },
  data: {
    theme: 'light',
    tempFilePath: '',
    savedFilePath: ''
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  saveFile() {
    if (this.data.tempFilePath.length > 0) {
      const that = this
      wx.saveFile({
        tempFilePath: this.data.tempFilePath,
        success(res) {
          that.setData({
            savedFilePath: res.savedFilePath
          })
          wx.setStorageSync('savedFilePath', res.savedFilePath)
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['file1'],
            content: i18n['file2']
          })
        },
        fail() {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['file3'],
            content: i18n['file4']
          })
        }
      })
    }
  },
  clear() {
    wx.setStorageSync('savedFilePath', '')
    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    })
  }
})
