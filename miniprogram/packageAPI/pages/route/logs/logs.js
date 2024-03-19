// logs.js
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    arrData: [],
    name: 'log name 1989',
    title: 'log page'
  },
  changeData() {
    const arrData = this.data.arrData.map((_, index) => {
      const date = new Date()
      date.setYear(1970 + index);
      return formatTime(date)
    });
    this.setData({
      arrData
    }, () => {
      console.log('----setData callback', this.data.arrData)
    })
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: i18n['log0']
    })
    this.setData({
      t: i18n,
      lang
    })
    console.log(this.data.title + ' onload', this.data.name, options)
  },
  onShow() {
    console.log(this.data.title + ' onshow', this.data.title);
  },
  onReady() {
    this.timer = setInterval(() => {
      console.log('Log polling -----');
      const len = this.data.arrData.length;
      this.data.arrData.push(len + 1);
      // console.log(this.data.arrData,'1111')
      this.changeData()
    }, 200)
    console.log(this.data.title + ' onReady', this.data.title);
  },
  onHide() {
    console.log(this.data.title + ' onHide', this.data.title);
  },
  onUnload() {
    console.log('Destroy polling -----');
    clearInterval(this.timer || 0);
    console.log(this.data.title + ' onUnload', this.data.title);
  }
})
