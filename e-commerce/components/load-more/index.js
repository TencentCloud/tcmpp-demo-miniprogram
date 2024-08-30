import i18n from '../../i18n/index';
const app = getApp();

Component({
  externalClasses: ['wr-class', 'wr-class--no-more'],
  options: { multipleSlots: true },
  data:{
    lang: app.globalData.lang,
  },
  properties: {
    status: {
      type: Number,
      value: 0,
    },
    loadingText: {
      type: String,
      value: i18n.t('Loading...'),
    },
    noMoreText: {
      type: String,
      value: i18n.t('No more'),
    },
    failedText: {
      type: String,
      value: i18n.t('Failed to load, click retry'),
    },
    color: {
      type: String,
      value: '#BBBBBB',
    },
    failedColor: {
      type: String,
      value: '#FA550F',
    },
    size: {
      type: null,
      value: '40rpx',
    },
    loadingBackgroundColor: {
      type: String,
      value: '#F5F5F5',
    },
    listIsEmpty: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    /** 点击处理 */
    tapHandle() {
      // 失败重试
      if (this.data.status === 3) {
        this.triggerEvent('retry');
      }
    },
  },
});
