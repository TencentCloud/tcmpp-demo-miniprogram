const i18n  = require('../../../i18n/index');

Page({
  data:{ 
    orderList:[],
    $language: wx.getSystemInfoSync().language
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: i18n.t('电影订单'),
    });
  },
  onShow(){
    this.initData()
  },
  initData(){
    let orderList = wx.getStorageSync('movieOrder') || []

    orderList = orderList.map(item => {
      if(item.movieImg) {
        item.movieImg = decodeURIComponent(item.movieImg);
      }
      return item;
    });
    this.setData({
      orderList
    })
  },
  //删除订单
  deleteOrder(e){
    const index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList.slice();
    orderList.splice(index,1)
    wx.showModal({
      title: i18n.t('提示'),
      content: i18n.t('确认删除订单吗？'),
      success:(res)=>{
        if(res.confirm){
          this.setData({
            orderList
          })
          wx.setStorageSync('movieOrder', orderList)
        }
      }
    })
  },
  //跳转到订单详情页面
  goTo(e){
    const order = e.currentTarget.dataset.order
    const paramsStr = encodeURIComponent(JSON.stringify(order))
    wx.navigateTo({
      url: `../movie-order-detail/movie-order-detail?paramsStr=${paramsStr}`
    })
  }
})