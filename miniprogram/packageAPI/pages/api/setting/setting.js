const recorderManager = wx.getRecorderManager()
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['setting10'],
      path: 'packageAPI/pages/api/setting/setting'
    }
  },
  data: {
    theme: 'light',
    setting: {},
    index: 0,
    array: [
      'userLocation',
      // 'userFuzzyLocation',
      // 'userLocationBackground',
      'record',
      'camera',
      'bluetooth',
      'writePhotosAlbum',
      'addPhoneContact',
      'addPhoneCalendar',
      'werun',
      'address',
      'invoiceTitle',
      'invoice',
      'userInfo'
    ]
  },

  login() {
    wx.login({
      success: res => console.log(res, '---------------success'),
      fail: err => console.log(err, '---------------fail')
    })
  },
  getUserProfile() {
    // WeChat will pop up a dialog box
    wx.getUserProfile({
      desc: 'fek',
      success: res => console.log(res, '---------------success'),
      fail: err => console.log(err, '---------------fail')
    })
  },

  authorize() {
    const { index, array } = this.data
    wx.authorize({
      scope: `scope.${array[index]}`,
      success: (res) => {
        wx.showToast({
          title: i18n['setting11']
        })
      },
      fail: (err) => {
        console.log('===err', err)
        wx.showToast({
          title: i18n['setting12'],
          icon: 'none'
        })
      },
      complete: () => {
        this.getSetting()
      }
    })
  },

  bindPickerChange(e) {
    console.log('Picker sends change event, carrying value:', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindGetUserInfo(e) {
    console.log('==bindGetUserInfo==', e)
    this.getSetting()
  },

  wxGetUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        console.log('==wxGetUserInfo== success', res)
      },
      fail: err => console.log('==wxGetUserInfo== err', err),
      complete: () => {
        this.getSetting()
      }
    })
  },

  wxSaveImageToPhotosAlbum() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePaths[0],
          success: (res) => {
            console.log('==wxSaveImageToPhotosAlbum success==', res)
          },
          fail: (err) => {
            console.log('==wxSaveImageToPhotosAlbum fail==', err)
          },
          complete: () => {
            this.getSetting()
          }
        })
      },
      fail: (err) => {
        console.log('==chooseImage fail==', err)
      }
    })
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      },
      fail: (err) => {
        console.log('==takePhoto fail==', err)
      },
      complete: () => {
        this.getSetting()
      }
    })
  },

  wxGetLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('==wxGetLocation success==', res)
      },
      fail: (res) => {
        console.log('==wxGetLocation fail==', res)
      },
      complete: () => {
        this.getSetting()
      }
    })
  },

  wxStartRecord() {
    const options = {
      duration: 100, // Duration
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50,
      success: (res) => {
        console.log('==wxStartRecord success==', res)
      },
      fail: (res) => {
        console.log('==wxStartRecord fail==', res)
      },
      complete: () => {
        this.getSetting()
      }
    }
    recorderManager.start(options) // Start recording
  },

  getSetting() {
    wx.getSetting({
      success: (res) => {
        console.log(res)
        this.setData({ setting: res.authSetting })
      },
      fail: (err) => {
        console.log('===err', err)
      }
    })
  },

  getAccountInfoSync() {
    const res = wx.getAccountInfoSync();

    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['setting13'],
      content: JSON.stringify(res)
    });
  },

  checkSession() {
    const res = wx.checkSession({
      success: (res) => {
        console.log('===checkSession success===', res)
      },
      fail: (err) => {
        console.log('===checkSession fail===', err)
      }
    });
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['setting10']
    })
    this.setData({
      t: i18n,
      lang
    })

    this.getSetting()

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
