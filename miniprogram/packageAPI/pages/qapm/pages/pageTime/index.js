import{ i18n } from '../../../../../i18n/lang';
const {
  jsonData
} = require('../../utils/data')
const {
  longTask
} = require('../../utils/util')

// pages/PageTime/index.js
Page({
  data: {
    onLoadStart: 0,
    dataJson: null
  },
  onLoad: async function (options) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'alert',
      content: 'onLoad start'
    })
    console.log('pageTime onLoad start')

    await wx.request({
      url: 'https://www.baidu.com'
    })
    this.setData({
      onLoadStart: new Date().getTime()
    })
    await wx.request({
      url: 'https://apod.nasa.gov/apod/image/2101/aurora_iss052e007857.jpg',
      complete:(res)=>{
        // console.log('this is complete res',res)
      }
    })
    await wx.request({
      url: 'https://www.nasa.gov/'
    })
    await wx.request({
      url: 'https://www.zhihu.com'
    })
    longTask(30)
    console.log('pageTime onLoad end')
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'alert',
      content: 'onLoad end'
    })
  },
  onReady: function () {
    this.setData({
      dataJson: JSON.stringify(jsonData)
    })
    var gap = (new Date().getTime()) - this.data.onLoadStart
    // wx.showModal({
    //   title: "Prompt",
    //   content: "onReady completed, rendering time: " + gap + "ms"
    // })
    wx.request({
      url: 'https://sgsg1218.pixnet.net/blog'
    })
    wx.request({
      url: 'https://fian628.pixnet.net'
    })
  }
})