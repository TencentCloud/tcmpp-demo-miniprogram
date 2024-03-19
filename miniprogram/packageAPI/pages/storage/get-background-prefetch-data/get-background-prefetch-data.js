const app = getApp()
// When using precached data, you need to call setBackgroundFetchToken first. Specific examples can be found in app.js

Date.prototype.Format = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // Month
    'd+': this.getDate(), // Day
    'h+': this.getHours(), // Hour
    'm+': this.getMinutes(), // Minute
    's+': this.getSeconds(), // Second
    'q+': Math.floor((this.getMonth() + 3) / 3), // Quarter
    S: this.getMilliseconds() // Millisecond
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear().toString()).substr(4 - RegExp.$1.length))
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((o[k].toString()).length)))
    }
  }

  return fmt
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShow() {
    // Retrieve cached pre-fetch data
    // this.getBackgroundFetchData()
  },
  onShareAppMessage() {
    return {
      title: 'Pre -pull',
      path: 'packageAPI/pages/storage/get-background-prefetch-data/get-background-prefetch-data'
    }
  },
  data: {
    theme: 'light',
    openid: '',
    appid: '',
    getDataTime: '',
    canIUse: true
  },
  // getBackgroundFetchData() {
  //   if (wx.getBackgroundFetchData) {
  //     console.log('Reading pre-fetch data')
  //     const res = app.globalData.backgroundFetchData
  //     const {fetchedData} = res
  //     const result = JSON.parse(fetchedData)
  //     const systemInfo = wx.getSystemInfoSync()
  //     const timeStamp = systemInfo.brand === 'iPhone' ? res.timeStamp * 1000 : res.timeStamp
  //     const time = new Date(timeStamp).Format('yyyy-MM-dd hh:mm:ss')
  //     this.setData({
  //       appid: result.appid,
  //       openid: result.openid,
  //       getDataTime: time,

  //     })
  //   } else {
  //     this.setData({
  //       canIUse: false,
  //     })
  //     wx.showModal({
  //       title: 'WeChat version is too low, this feature is not supported temporarily',
  //     })
  //   }
  // },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  }
})
