import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'iBeacon',
      path: 'packageAPI/pages/device/keyboard/keyboard'
    }
  },

  data: {
    theme: 'light',
    height: 0,
    inputValue: '',
    disabled: false
  },

  dataChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['keyboard3']
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

  onFocus() {
    this.getSelectedTextRange();
  },

  cb(res) {
    console.log('==== Keyboard height changed', res)
    this.setData({
      height: res.height
    });
  },

  onKeyboardHeightChange() {
    this.setData({
      disabled: true
    });
    wx.onKeyboardHeightChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['keyboard0']
    })
  },

  offKeyboardHeightChange() {
    this.setData({
      disabled: false
    });
    wx.offKeyboardHeightChange(this.cb);
    wx.showToast({
      icon: 'none',
      title: i18n['keyboard1']
    })
  },

  hideKeyboard() {
    wx.hideKeyboard({
      success: res => {
        wx.showToast({
          icon: 'none',
          title: i18n['keyboard2']
        });
        console.log('hideKeyboard success:', res)
      },
      fail: err => {
        console.log('hideKeyboard fail:', err)
      },
      complete: res => {
        console.log('hideKeyboard complete:', res)
      }
    })
  },

  getSelectedTextRange() {
    wx.getSelectedTextRange({
      success: res => {
        console.log('getSelectedTextRange success:', res)
      },
      fail: err => {
        console.log('getSelectedTextRange fail:', err)
      },
      complete: res => {
        console.log('getSelectedTextRange complete', res.start, res.end)
      }
    })
  }
})
