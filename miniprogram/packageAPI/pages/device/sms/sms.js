import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['sms0'],
      path: 'packageAPI/pages/device/sms/sms'
    }
  },

  data: {
    theme: 'light',
    phoneNumber: '',
    content: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['sms0']
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

  sendSms() {
    const { phoneNumber, content } = this.data;
    wx.sendSms({
      phoneNumber,
      content,
      success: res => {
        console.log('sms success', res);
        wx.showToast({
          icon: 'none',
          title: i18n['sms1']
        })
      },
      fail: err => {
        console.log('sms fail', err);
        wx.showToast({
          icon: 'none',
          title: i18n['sms2']
        })
      },
      complete: res => {
        console.log('sms complete', res);
      }
    })
  },

  phoneNumChange(e) {
    this.setData({
      phoneNumber: e.detail.value
    });
  },

  contentChange(e) {
    this.setData({
      content: e.detail.value
    });
  }

})
