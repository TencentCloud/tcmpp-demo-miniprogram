import { fetchCouponDetail } from '../../../services/coupon/index';
import { fetchGoodsList } from '../../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';
import i18n from '../../../i18n/index';

const app = getApp();

Page({
  data: {
    goods: [],
    lang: app.globalData.lang,
    detail: {},
    couponTypeDesc: '',
    showStoreInfoList: false,
    cartNum: 2,
  },

  id: '',

  onLoad(query) {
    const id = parseInt(query.id);
    this.id = id;

    this.getCouponDetail(id);
    this.getGoodsList(id);
  },

  getCouponDetail(id) {
    fetchCouponDetail(id).then(({ detail }) => {
      this.setData({ detail });
      if (detail.type === 2) {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `Get ${detail.value} off for ${detail.base / 100} Yuan`,
          });
        } else {
          this.setData({ couponTypeDesc: `${detail.value} off` });
        }
      } else if (detail.type === 1) {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `Save ${detail.value / 100} for ${detail.base / 100}`,
          });
        } else {
          this.setData({ couponTypeDesc: `Save ${detail.value / 100} Yuan` });
        }
      }
    });
  },

  getGoodsList(id) {
    fetchGoodsList(id).then((goods) => {
      this.setData({ goods });
    });
  },

  openStoreList() {
    this.setData({
      showStoreInfoList: true,
    });
  },

  closeStoreList() {
    this.setData({
      showStoreInfoList: false,
    });
  },

  goodClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goods[index];
    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },

  cartClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: i18n.t('Click to add to cart'),
    });
  },
});
