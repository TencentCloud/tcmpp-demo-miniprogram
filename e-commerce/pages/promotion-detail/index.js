import Toast from 'tdesign-miniprogram/toast/index';
import { fetchPromotion } from '../../services/promotion/detail';
import i18n from '../../i18n/index';
const app = getApp();

Page({
  data: {
    list: [],
    banner: '',
    time: 0,
    lang: app.globalData.lang,
    showBannerDesc: false,
    statusTag: '',
  },

  onLoad(query) {
    const promotionID = parseInt(query.promotion_id);
    this.getGoodsList(promotionID);
  },

  getGoodsList(promotionID) {
    fetchPromotion(promotionID).then(({ list, banner, time, showBannerDesc, statusTag }) => {
      const goods = list.map((item) => ({
        ...item,
        tags: item.tags.map((v) => v.title),
      }));
      this.setData({
        list: goods,
        banner,
        time,
        showBannerDesc,
        statusTag,
      });
    });
  },

  goodClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.list[index];
    wx.navigateTo({ url: `/pages/goods/details/index?spuId=${spuId}` });
  },

  cardClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: i18n.t('Click Add to cart'),
    });
  },

  bannerClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: i18n.t('Click Rule details'),
    });
  },
});
