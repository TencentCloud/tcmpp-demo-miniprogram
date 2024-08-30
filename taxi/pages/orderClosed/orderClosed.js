const util = require('../../utils/util.js')
import { i18n } from '../../i18n/lang'
const app = getApp()
Page({
  data: {
    time: '',
    i18n
  },
  toRules(){
    wx.showToast({
      title: i18n['暂未开放'],
      icon: 'success',
      duration: 2000
    })
  },
  onLoad(){
    this.setData({
      i18n,
      time:util.formatTime(new Date()),
      starAddress: app.globalData.bluraddress,
      eddAddress: app.globalData.destination,
    })
  }
  
})