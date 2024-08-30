import { fetchOrderDetail } from '../../../services/order/orderDetail';
import i18n from '../../../i18n/index';
const app = getApp();

Page({
  data: {
    invoice: {},
    lang: app.globalData.lang,
  },
  onLoad({ orderNo }) {
    this.orderNo = orderNo;
    this.init();
  },
  init() {
    this.getDetail();
  },
  getDetail() {
    const params = {
      parameter: this.orderNo,
    };
    return fetchOrderDetail(params).then((res) => {
      const order = res.data;

      const invoice = {
        buyerName: order?.invoiceVO?.buyerName, //个人或公司名称
        buyerTaxNo: order?.invoiceVO?.buyerTaxNo, //税号
        buyerPhone: order?.invoiceVO?.buyerPhone, //手机
        email: order?.invoiceVO?.email, //邮箱
        titleType: order?.invoiceVO?.titleType === 1 ? i18n.t('Individual') : i18n.t('Institution'), //发票抬头 1-个人 2-公司
        ontentType: order?.invoiceVO?.ontentType === 1 ? 'goods' : '2Category', //发票内容 1-明细 2类别
        invoiceType: order?.invoiceVO?.invoiceType === 5 ? i18n.t('E-invoice') : i18n.t('Do not need invoice'), //是否开票 0-不开 5-电子发票
        isInvoice: order?.invoiceVO?.buyerName ? i18n.t('Invoice issued') : i18n.t('Not issued'),
        money: order?.invoiceVO?.money,
      };
      this.setData({
        invoice,
      });
    });
  },
});
