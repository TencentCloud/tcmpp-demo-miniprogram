import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['addContact0'],
      path: 'packageAPI/pages/device/add-contact/add-contact'
    }
  },

  submit(e) {
    const formData = e.detail.value
    wx.addPhoneContact({
      ...formData,
      success() {
        wx.showToast({
          title: i18n['addContact1']
        })
      },
      fail() {
        wx.showToast({
          title: i18n['addContact2']
        })
      }
    })
  },

  chooseContact() {
    wx.chooseContact({
      success: result => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['addContact3'],
          content: JSON.stringify(result)
        })
      },
      fail: err => {
        const msg = err.errMsg ? err.errMsg : err;
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['addContact4'],
          content: `${msg}`
        })
      },
      complete: result => {
        console.log('----- chooseContact complete', result);
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['addContact0']
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
