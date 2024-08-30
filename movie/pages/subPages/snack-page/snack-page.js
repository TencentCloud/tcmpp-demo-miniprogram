const i18n  = require('../../../i18n/index');
Page({
  data: {
    info: null, //小吃详情
    cinemaName: '',
    cinemaData:null, //影院地图详情
    $language: wx.getSystemInfoSync().language
  },
  onLoad(obj) {
    wx.setNavigationBarTitle({
      title: i18n.t('观影套餐'),
    });
    const paramsObj = JSON.parse(obj.paramsStr)
    this.initPage(paramsObj)
  },
  initPage(obj) {
    // wx.showLoading({
    //   title: '正在加载',
    // })
    const data = {
      dealId: obj.dealId,
      quantity: 1,
      cinemaId: obj.cinemaId,
    }

    this.setData({
      cinemaName: obj.cinemaName,
      cinemaId: obj.cinemaId,
      cinemaData: obj.cinemaData,
      info: obj.info,
      nm: i18n.t(obj.cinemaId + '_nm'),
      addr: i18n.t(obj.cinemaId + '_addr'),
    });
  },
  //跳转到“提交订单”页面
  buySnack(){
    const { info, cinemaName, cinemaId} = this.data
    //添加订单信息
    const paramsStr = JSON.stringify({
      cinemaName,
      cinemaId,
      title: info.dealBrief.title,//套餐名
      img: info.dealBrief.imageUrl,//图片
      amount:1,//数量
      price: info.dealBrief.originPrice,//单价
      total: info.dealBrief.originPrice * 1//合计
    })
    wx.navigateTo({
      url: `/pages/subPages/buy-snack/buy-snack?paramsStr=${paramsStr}`,
    })
  }
})