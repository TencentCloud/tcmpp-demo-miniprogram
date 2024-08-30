import { i18n } from '../../i18n/lang'
// pages/cancel/cancel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i18n
  },
  toOrder(){
    wx.showModal({
      content: i18n['确定要取消行程吗'],
      cancelColor: '#cccccc',
      confirmColor: '#fc9c56',
      cancelText: i18n['取消'],
      confirmText: i18n['确定'],
      success: function(res) {
        if (res.confirm) {
          wx.redirectTo({
            url:  "/pages/order/order",
          })
        } else if (res.cancel) {
          wx.redirectTo({
            url:  "/pages/orderService/orderService"
          })
        }
      }
    })
  },
  BackWait(){
    // console.log("a")
    wx.navigateBack({
      url: "/pages/wait/wait",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: i18n['取消行程']
    })
    this.setData({
      i18n
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})