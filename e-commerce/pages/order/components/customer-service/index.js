import i18n from '../../../../i18n/index';
const app = getApp();

Component({
  externalClasses: ['wr-class'],

  properties: {
    phoneNumber: String,
    desc: String,
  },

  data: {
    lang: app.globalData.lang,
    show: false,
  },

  methods: {
    onBtnTap() {
      this.setData({
        show: true,
      });
    },

    onDialogClose() {
      this.setData({
        show: false,
      });
    },

    onCall() {
      const { phoneNumber } = this.properties;
      wx.makePhoneCall({
        phoneNumber,
      });
    },
    onCallOnlineService() {
      wx.showToast({
        title: i18n.t('You clicked online customer service'),
      });
    },
  },
});
