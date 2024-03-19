import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['calendar0'],
      path: 'packageAPI/pages/device/calender/calender'
    }
  },

  data: {
    theme: 'light'
  },

  addPhoneRepeatCalendar() {
    wx.addPhoneRepeatCalendar({
      title: i18n['calendar1'],
      startTime: 1669366315258 / 1000, // Fri Nov 25 2022 16:51:55
      description: 'i18n[\'calendar2\']{new Date()}',
      success: (res) => {
        console.log('addPhoneRepeatCalendar success', res)
        wx.showToast({
          title: i18n['calendar3'],
          icon: 'success'
        })
      },
      fail: (res) => {
        console.log('addPhoneRepeatCalendar fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    });

  },

  addPhoneCalendar() {
    wx.addPhoneCalendar({
      title: i18n['calendar4'],
      startTime: Date.now() / 1000,
      success: (res) => {
        console.log('addPhoneCalendar success', res)
        wx.showToast({
          title: i18n['calendar5'],
          icon: 'success'
        })
      },
      fail: (res) => {
        console.log('addPhoneCalendar fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    });
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['calendar0']
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
