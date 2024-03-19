// miniprogram/page/API/pages/get-battery-info/get-battery-info.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['getBattery0'],
      path: 'packageAPI/pages/device/get-battery-info/get-battery-info'
    }
  },
  data: {
    theme: 'light'
  },

  getBatteryInfo() {
    wx.getBatteryInfo({
      complete: (res) => {
        const msg = res.isCharging ? i18n['getBattery1'] : i18n['getBattery2']
        this.setData({
          level: res.level,
          isCharging: msg
        })
      }
    })
  },

  getBatteryInfoSync() {
    const res = wx.getBatteryInfoSync();
    const msg = res.isCharging ? i18n['getBattery1'] : i18n['getBattery2']
    this.setData({
      level: res.level,
      isCharging: msg
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['getBattery9']
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
