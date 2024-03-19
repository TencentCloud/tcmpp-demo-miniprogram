import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['forward0'],
      path: 'packageAPI/pages/forward/forward/forward',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light'
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Forward']
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
  showShareMenu() {
    wx.showShareMenu({
      withShareTicket: true,
      showShareItems: ['wechatFriends', 'wechatMoment'],
      success: () => {
        console.log('show share success')
      },
      fail: () => {
        console.log('show share fail')
      },
      complete: () => {
        console.log('show share complete')
      }
    })
  },
  hideShareMenu() {
    wx.hideShareMenu({
      withShareTicket: true,
      hideShareItems: ['wechatFriends', 'wechatMoment'],
      success: () => {
        console.log('hide share success')
      },
      fail: () => {
        console.log('hide share fail')
      },
      complete: () => {
        console.log('hide share complete')
      }
    })
  },
  updateShareMenu() {
    wx.updateShareMenu({
      withShareTicket: false,
      success: () => {
        console.log('update share success')
      },
      fail: () => {
        console.log('update share fail')
      },
      complete: () => {
        console.log('update share complete')
      }
    })
  },
  showShareImageMenu() {
    wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
      success: (res) => {
        wx.showShareImageMenu({
          path: res.tempFilePath,
          success: () => {
            console.log('show share image success')
          },
          fail: () => {
            console.log('show share image fail')
          },
          complete: () => {
            console.log('show share image complete')
          }
        })
      }
    })
  },
  shareVideoMessage() {
    wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
      success: (res) => {
        wx.shareVideoMessage({
          videoPath: res.tempFilePath,
          success: () => {
            console.log('show share video success')
          },
          fail: () => {
            console.log('show share video fail')
          },
          complete: () => {
            console.log('show share video complete')
          }
        })
      }
    })
  },
  shareFileMessage() {
    wx.downloadFile({
      url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
      success: (res) => {
        console.log('===rrr', res)
        wx.shareFileMessage({
          filePath: res.tempFilePath,
          fileName: 'this is a demo',
          success: () => {
            console.log('show share file success')
          },
          fail: () => {
            console.log('show share file fail')
          },
          complete: () => {
            console.log('show share file complete')
          }
        })
      }
    })
  },
  onCopyUrl() {
    wx.onCopyUrl(() => {
      console.log('====copy22')
      return { query: 'a=1&b=2' }
    })
  },
  offCopyUrl() {
    wx.onCopyUrl()
  },
  authPrivateMessage() {
    wx.authPrivateMessage({
      shareTicket: undefined,
      success: () => {
        console.log('auth private message success')
      },
      fail: (err) => {
        console.log('auth private message fail', err)
      },
      complete: () => {
        console.log('auth private message complete')
      }
    })
  }
})
