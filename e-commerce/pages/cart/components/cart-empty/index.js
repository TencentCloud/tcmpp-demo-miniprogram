import i18n from '../../../../i18n/index';

Component({
  properties: {
    imgUrl: {
      type: String,
      value: 'https://cdn-we-retail.ym.tencent.com/miniapp/template/empty-cart.png',
    },
    tip: {
      type: String,
      value: i18n.t('Your cart is empty.'),
    },
    btnText: {
      type: String,
      value: i18n.t('Go to Home page'),
    },
  },
  data: {},
  methods: {
    handleClick() {
      this.triggerEvent('handleClick');
    },
  },
});
