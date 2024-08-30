import { fetchCouponList } from '../../../services/coupon/index';
import i18n from '../../../i18n/index';
const app = getApp();

Page({
  data: {
    lang: app.globalData.lang,
    status: 0,
    list: [
      {
        text: 'Available',
        key: 0,
      },
      {
        text: 'Used',
        key: 1,
      },
      {
        text: 'Expired',
        key: 2,
      },
    ],

    couponList: [],
  },

  onLoad() {
    this.init();
  },

  init() {
    this.fetchList();
  },

  fetchList(status = this.data.status) {
    let statusInFetch = '';
    switch (Number(status)) {
      case 0: {
        statusInFetch = 'default';
        break;
      }
      case 1: {
        statusInFetch = 'useless';
        break;
      }
      case 2: {
        statusInFetch = 'disabled';
        break;
      }
      default: {
        throw new Error(`unknown fetchStatus: ${statusInFetch}`);
      }
    }
    fetchCouponList(statusInFetch).then((couponList) => {
      this.setData({ couponList });
    });
  },

  tabChange(e) {
    const { value } = e.detail;

    this.setData({ status: value });
    this.fetchList(value);
  },

  goCouponCenterHandle() {
    wx.showToast({ title: i18n.t('Go to coupon center'), icon: 'none' });
  },

  onPullDownRefresh_() {
    this.setData(
      {
        couponList: [],
      },
      () => {
        this.fetchList();
      },
    );
  },
});
