const app = getApp();

Component({
  externalClasses: ['wr-class'],

  options: {
    multipleSlots: true,
  },

  properties: {
    show: {
      type: Boolean,
      observer(show) {
        this.setData({ visible: show });
      },
    },
    closeBtn: {
      type: Boolean,
      value: false,
    },
  },

  data: { 
    visible: false,
    lang: app.globalData.lang,
  },

  methods: {
    reset() {
      this.triggerEvent('reset');
    },
    confirm() {
      this.triggerEvent('confirm');
    },
    close() {
      this.triggerEvent('showFilterPopupClose');

      this.setData({ visible: false });
    },
  },
});
