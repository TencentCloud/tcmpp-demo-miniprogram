const i18n  = require('../../../i18n/index');

Page({
  data:{
    order:null,
    $language: wx.getSystemInfoSync().language
  },
  onLoad(opt){
    wx.setNavigationBarTitle({
      title: i18n.t('订单详情'),
    })
    const paramsObj = JSON.parse(decodeURIComponent(opt.paramsStr))
    this.initData(paramsObj)
  },
  initData(order){
    this.setData({
      order,
      nm: i18n.t(order.cinemaId + '_nm'),
      addr: i18n.t(order.cinemaId + '_addr'),
    })
  }
})