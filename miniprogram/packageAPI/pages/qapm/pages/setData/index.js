// pages/setData/index.js
import{ i18n } from '../../../../../i18n/lang';

const {
  jsonData
} = require('../../utils/data')
Page({
  data: {
    articleJson: null
  },
  onLoad() {
    this.getArticleJson()
  },
  onReady() {
  },
  onShow() {
    console.log('setdata this',this,this.setData)
  },
  getArticleJson: function () {
    wx.showModal({
      title: 'setData',
      confirmText: 'confirm',
      cancelText: 'cancel',
    });
    var that = this;
    wx.request({
      url: 'https://xs.sogou.com/html/web/api/forcebreak.json',
      success: (res) => {
        console.log(res)
        var tmp = ''
        for (var i = 0; i < 200; i++) {
          tmp += JSON.stringify(jsonData)
        }
        that.setData({
          articleJson: that.data.articleJson + tmp
        }, () => {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'alert',
            content: 'success'
          })
        })
      }
    })
  }
})