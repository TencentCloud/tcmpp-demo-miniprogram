import { i18n } from './i18n/lang'
const GMapSDK = require('./utils/MapServiceAdapter.js');
const TMapSDK = require('./libs/qqmap-wx-jssdk.js');
const mapKey = require('./tcmpp.config.js');

App({
  onLaunch: function (res) {
    this.globalData.noServer = (res.extendData || '').indexOf('noServer=1') !== -1
    // 初始化腾讯地图SDK（后面根据语言中文使用）
    this.globalData.TMapSdk = new TMapSDK({
      key: mapKey.TMapKey
    });
    // 初始化谷歌地图SDK（后面根据语言非中文使用）
    this.globalData.GMapSdk = new GMapSDK('GoogleMaps', mapKey.GMapKey);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    noServer: false,
    userInfo: null,
    bluraddress: '',
    destination: '',
    id: '0',
    strLatitude: 0,
    strLongitude: 0,
    endLatitude: 0,
    endLongitude: 0,
    play: '18.7'
  }
})