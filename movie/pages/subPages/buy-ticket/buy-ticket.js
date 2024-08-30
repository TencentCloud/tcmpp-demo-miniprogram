const i18n  = require('../../../i18n/index');
const payOrder = require('../../../utils/payment');
const app = getApp();

Page({
  data:{
    order:null,
    first:true, //是否是第一次支付
    $language: wx.getSystemInfoSync().language
  },
  onLoad(params){
    wx.setNavigationBarTitle({
      title: i18n.t('确认订单'),
    });
    const paramsObj = JSON.parse(params.paramsStr)
    this.initData(paramsObj)
  },
  initData(params){
    this.setData({
      order:params
    })
  },
  //模拟支付
  payment(){
    if(this.data.first){
      const { cinemaId, price, movieId, seat, hall } = this.data.order;
      //避免重复支付
      const data = {
        appid: 'mpw83p27h5m3r7xq',
        attach: `${i18n.t(movieId + '_nm')}, ${i18n.t(hall)} (${seat})`, // 订单附加信息
        body: `${i18n.t(cinemaId + '_nm')}-${i18n.t('电影订单')}`, // 订单描述
        total: price,
        id: app.globalData.userInfo?.id
      }
      
      payOrder(data, () => {
        const movieOrder = wx.getStorageSync('movieOrder') || [];
        const order = encodeURIComponent(JSON.stringify(this.data.order));

        movieOrder.unshift(this.data.order);
        wx.setStorageSync('movieOrder', movieOrder);

        this.setData({
          first: false
        });

        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/subPages/movie-order-detail/movie-order-detail?paramsStr=${order}`,
          });
        }, 300);
      });
    } else {
      wx.showToast({
        title: i18n.t('已支付'),
        icon:'none'
      })
    }
  }
})