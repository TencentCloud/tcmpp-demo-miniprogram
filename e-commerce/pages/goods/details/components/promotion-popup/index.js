import i18n from '../../../../../i18n/index';
Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    list: Array,
    title: {
      type: String,
      value: i18n.t('Promo details'),
    },
    show: {
      type: Boolean,
    },
  },

  // data: {
  //   list: [],
  // },

  methods: {
    change(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('promotionChange', {
        index,
      });
    },

    closePromotionPopup() {
      this.triggerEvent('closePromotionPopup', {
        show: false,
      });
    },
  },
});
