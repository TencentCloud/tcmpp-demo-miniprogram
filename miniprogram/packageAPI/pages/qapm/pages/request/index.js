// pages/request/index.js
Page({
  data: {},
  slowRequest: function () {
    wx.request({
      url: "https://www.tencentcloud.com/"
    })
    wx.request({
      url: 'https://www.nasa.gov/'
    })
    wx.request({
      url: "https://www.google.com/"
    })
    wx.request({
      url: "https://y.qq.com/"
    })
    wx.request({
      url: "https://v.qq.com/"
    })
    wx.request({
      url:"https://www.apple.com/"
    })
    wx.request({
      url:"https://docs.qq.com/desktop"
    })
    wx.request({
      url: "https://qapm.qq.com"
    })
    wx.request({
      url :"https://www.amazon.com/"
    })
    wx.request({
      url:"https://mook.co.kr/"
    })
    wx.request({
      url:"https://www.van-mook.nl/"
    })
  },
  requestError: function () {
    wx.request({
      url: 'http://localhost:3000/me'
    })
    wx.request({
      url: 'https://www.nasa.go/',
    })

  },
  onLoad: function (options) {
    console.log('onLoad')
  },
  onReady: function () {
    console.log('onReady')
  },
  onShow: function () {
    console.log('onShow')
  }
})