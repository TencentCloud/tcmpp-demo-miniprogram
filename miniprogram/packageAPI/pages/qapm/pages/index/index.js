import{ i18n } from '../../../../../i18n/lang';
const {
  appconfigData
} = require('../../utils/data');
Page({
  data: {
    currentAppconfig: {}
  },
  onLoad: function () {
    const currentAppconfig = wx.getStorageSync('currentAppconfig') || appconfigData[0];
    this.setData({
      currentAppconfig: currentAppconfig
    })
  },
  gotoPage: function (e) {
    console.log('gotoPage', e)
    wx.navigateTo({
      url: e.currentTarget.dataset['pagename']
    })
  },
});