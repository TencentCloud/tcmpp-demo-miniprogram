import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { cancelRights } from '../../after-service-detail/api';
import { ServiceButtonTypes } from '../../config';
import i18n from '../../../../i18n/index';

Component({
  properties: {
    service: {
      type: Object,
      observer(service) {
        const buttonsRight = service.buttons || service.buttonVOs || [];
        this.setData({
          buttons: {
            left: [],
            right: buttonsRight,
          },
        });
      },
    },
  },

  data: {
    service: {},
    buttons: {
      left: [],
      right: [],
    },
  },

  methods: {
    // 点击【订单操作】按钮，根据按钮类型分发
    onServiceBtnTap(e) {
      const { type } = e.currentTarget.dataset;
      switch (type) {
        case ServiceButtonTypes.REVOKE:
          this.onConfirm(this.data.service);
          break;
        case ServiceButtonTypes.FILL_TRACKING_NO:
          this.onFillTrackingNo(this.data.service);
          break;
        case ServiceButtonTypes.CHANGE_TRACKING_NO:
          this.onChangeTrackingNo(this.data.service);
          break;
        case ServiceButtonTypes.VIEW_DELIVERY:
          this.viewDelivery(this.data.service);
          break;
      }
    },

    onFillTrackingNo(service) {
      wx.navigateTo({
        url: `/pages/order/fill-tracking-no/index?rightsNo=${service.id}`,
      });
    },

    viewDelivery(service) {
      wx.navigateTo({
        url: `/pages/order/delivery-detail/index?data=${JSON.stringify(
          service.logistics || service.logisticsVO,
        )}&source=2`,
      });
    },

    onChangeTrackingNo(service) {
      wx.navigateTo({
        url: `/pages/order/fill-tracking-no/index?rightsNo=${service.id}&logisticsNo=${
          service.logisticsNo
        }&logisticsCompanyName=${service.logisticsCompanyName}&logisticsCompanyCode=${
          service.logisticsCompanyCode
        }&remark=${service.remark || ''}`,
      });
    },

    onConfirm() {
      Dialog.confirm({
        title: i18n.t('Are you sure you want to cancel return request?'),
        content: '',
        confirmBtn: i18n.t('Yes'),
        cancelBtn: i18n.t('No'),
      }).then(() => {
        const params = { rightsNo: this.data.service.id };
        return cancelRights(params).then(() => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: i18n.t('You will cancel your return and refund request.'),
          });
        });
      });
    },
  },
});
