import { fetchCouponDetail } from '../../../services/coupon/index';
const app = getApp();

Page({
  data: {
    detail: null,
    storeInfoList: [],
    lang: app.globalData.lang,
    storeInfoStr: '',
    showStoreInfoList: false,
  },

  id: '',

  onLoad(query) {
    const id = parseInt(query.id);
    this.id = id;
    this.getGoodsList(id);
  },

  getGoodsList(id) {
    fetchCouponDetail(id).then(({ detail }) => {
      this.setData({
        detail,
      });
    });
  },

  navGoodListHandle() {
    wx.navigateTo({
      url: `/pages/coupon/coupon-activity-goods/index?id=${this.id}`,
    });
  },
});
