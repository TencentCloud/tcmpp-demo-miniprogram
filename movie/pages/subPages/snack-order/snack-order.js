//其实页面可以和movie-order页面复用
const i18n  = require('../../../i18n/index');

Page({
  data: {
    orderList: [],
    $language: wx.getSystemInfoSync().language
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n.t('小吃订单'),
    });
  },
  onShow() {
    this.initData()
  },
  initData() {
    const orderList = wx.getStorageSync('snackOrder') || []
    this.setData({
      orderList
    })
  },
  //删除订单
  deleteOrder(e) {
    const index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList.slice();
    orderList.splice(index, 1)
    wx.showModal({
      title: i18n.t('提示'),
      content: i18n.t('确认删除订单吗？'),
      success: (res) => {
        if (res.confirm) {
          this.setData({
            orderList
          })
          wx.setStorageSync('snackOrder', orderList)
        }
      }
    })
  },
})