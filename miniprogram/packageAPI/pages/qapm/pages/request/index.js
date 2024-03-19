// pages/request/index.js
import{ i18n } from '../../../../../i18n/lang';

Page({
  setBigPic: function () {
    this.setData({
      imageUrl: '˙'
    }, () => {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'alert',
        content: 'please wait~'
      })
    });
  },
  data: {},
  slowRequest: function () {
    wx.request({
      url: 'https://apod.nasa.gov/apod/image/2101/aurora_iss052e007857.jpg',
      complete:(res)=>{
        // console.log('this is complete res',res)
      }
    })
    wx.request({
      url: 'https://sgsg1218.pixnet.net/blog',
      complete:(res)=>{
        // console.log('this is complete res',res)
      }
    })
    wx.request({
      url: 'https://fian628.pixnet.net'
    })
    wx.request({
      url: 'https://www.m-toy.com.tw/products/eg001'
    })
    wx.request({
      url: 'https://baisrobot.timelog.to/a177612579'
    })
    wx.request({
      url: 'https://ha-blog.tw/tag/%E7%B7%A8%E5%8A%87/'
    })
    wx.request({
      url: 'https://www.nasa.gov/'
    })
    wx.request({
      url: 'https://www.vitkac.com/cn/p/miltzen-sunglasses-moscot-glasses-miltzen-sun-tortoise-193425',
      complete: (e) => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'content',
          content: JSON.stringify(e)
        })
      }
    })
  },
  requestError: function () {
    wx.request({
      url: 'http://localhost:3000/me'
    })
    wx.request({
      url: 'https://www.nasa.go/',
      fail: (e) => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'alet',
          content: JSON.stringify(e)
        })
      }
    })

  },
  onLoad: function (options) {
    this.setData({
      imageUrl: 'https://jpg.macz.com/pic/201909/23140935_76d530fd70.jpeg'
    })
    console.log('onLoad')
  },
  onReady: function () {
    console.log('onReady')
  },
  onShow: function () {
    console.log('onShow')
    console.log('before setData')
    this.setData({
      imageUrl: 'http://img4.imgtn.bdimg.com/it/u=2898251650,2841139618&fm=26&gp=0.jpg'
    });
    wx.request({
      url: 'https://www.baidu.com',
      success(res) {
        if (res.statusCode === 200) {
        }
      }
    });
  }
})