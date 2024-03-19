import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Basic operation of applet files',
      path: 'packageAPI/pages/file/base/base',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    savedFilePath: '--',
    fileList: [],
    fileSize: '--',
    fileDigest: '--',
    savedFileSize: '--',
    savedFileCreateTime: '--'
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['document']
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
  saveFile() {
    wx.chooseImage({
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: (res) => {
            wx.showToast({
              title: i18n['base0'],
              icon: 'success',
              mask: true
            })
            const savedFilePath = res.savedFilePath
            this.setData({
              savedFilePath
            })
            // Slight difference: tmf can only obtain information about saved path files.
            wx.getFileInfo({
              filePath: savedFilePath,
              success: (res) => {
                this.setData({
                  fileSize: res.size + i18n['base1'],
                  fileDigest: res.digest
                })
              },
              fail: (res) => {
                wx.showToast({
                  title: res.errMsg,
                  icon: 'none',
                  mask: true
                })
              }
            })
          }
        })
      }
    })
  },
  getStorageFile() {
    wx.getSavedFileList({
      success: (res) => {
        const { fileList } = res
        this.setData({
          fileList
        })
      }
    })
  },
  removeFile() {
    const fileList = this.data.fileList
    if (fileList.length > 0) {
      wx.removeSavedFile({
        filePath: fileList[0].filePath,
        complete: (res) => {
          this.getStorageFile()
          console.log('Removal successful', res)
        }
      })
    }
  },
  getSavedFileInfo() {
    wx.getSavedFileList({
      success: (res) => {
        const { fileList } = res
        if (fileList.length) {
          wx.getSavedFileInfo({
            filePath: fileList[0].filePath,
            success: (res) => {
              this.setData({
                savedFileSize: res.size + i18n['base1'],
                savedFileCreateTime: res.createTime
              })
              console.log('Get locally saved file information', res)
            }
          })
        } else {
          wx.showToast({
            title: i18n['base2'],
            icon: 'none',
            mask: true
          })
        }
      }
    })
  },
  openDoc() {
    wx.downloadFile({
      url: 'http://images.mofcom.gov.cn/cws/202001/20200110143527533.pdf',
      success: (res) => {
        console.log('Download successful', res)
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath,
          fileType: 'docx',
          success: (res) => {
            console.log('Open document successful', res)
          }
        })
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          mask: true
        })
        console.error(res)
      }
    })
  }
})
