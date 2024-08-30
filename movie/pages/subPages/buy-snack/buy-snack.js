const i18n  = require('../../../i18n/index');
const payOrder = require('../../../utils/payment');
const app = getApp();

Page({
  data:{
    order:null,
    first:true, //是否是第一次支付
    $language: wx.getSystemInfoSync().language
  },
  onLoad(opt){
    wx.setNavigationBarTitle({
      title: i18n.t('提交订单'),
    })
    const paramsObj = JSON.parse(opt.paramsStr)
    this.initData(paramsObj)
  },
  initData(order){
    this.setData({
      order
    })
  },
  //减少数量
  minus(){
    if(this.data.order.amount===1){
      return 
    } else {
      this.chanegAmount()
    }
  },
  //增加数量
  plus(){
    this.chanegAmount(1)
  },
  chanegAmount(flag){
    let order = { ...this.data.order }
    let amount = order.amount
    if(flag){
      amount++
    } else {
      amount--
    }
    let total = (amount * order.price).toFixed(2)
    this.setData({
      order: {
        ...order,
        amount,
        total
      }
    })
  },
  //模拟支付
  payment() {
    //避免重复支付
    if (this.data.first) {
      const { cinemaId, total, title } = this.data.order;
      const data = {
        appid: 'mpw83p27h5m3r7xq',
        attach: i18n.t(title), // 订单附加信息
        body: `${i18n.t(cinemaId + '_nm')}-${i18n.t('小吃订单')}`, // 订单描述
        total,
        id: app.globalData.userInfo?.id
      }

      payOrder(data, () => {
        const snackOrder = wx.getStorageSync('snackOrder') || [];
        snackOrder.unshift(this.data.order);
        wx.setStorageSync('snackOrder', snackOrder);

        this.setData({
          first: false
        });
       
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/subPages/snack-order/snack-order'
          });
        }, 300);
      });
    } else {
      wx.showToast({
        title: i18n.t('已支付'),
        icon: 'none'
      });
    }
  }
});