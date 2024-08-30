const i18n  = require('../../../i18n/index');
const app = getApp();

Page({
  data: {
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userName: '',
    firstLetter: '',
    $language: wx.getSystemInfoSync().language
  },
  onLoad() {
  },
  onShow() {
    const { userInfo } = app.globalData;
    if(userInfo) {
      const { userName } = userInfo;
      this.setData({
        userName,
        firstLetter: userName.slice(0, 1),
      });
    }
  },
  
  toLogin(e) {
    wx.navigateTo({
      url: '/pages/subPages/login/login'
    });
  }
})