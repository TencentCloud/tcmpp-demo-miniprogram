import { getPermission } from '../../../../utils/getPermission';
import { phoneRegCheck } from '../../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';
import { addressParse } from '../../../../utils/addressParse';
import { resolveAddress, rejectAddress } from '../../address/list/util';
import i18n from '../../../../i18n/index';

Component({
  externalClasses: ['t-class'],
  properties: {
    title: {
      type: String,
    },
    navigateUrl: {
      type: String,
    },
    navigateEvent: {
      type: String,
    },
    isCustomStyle: {
      type: Boolean,
      value: false,
    },
    isDisabledBtn: {
      type: Boolean,
      value: false,
    },
    isOrderSure: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    getWxLocation() {
      if (this.properties.isDisabledBtn) return;
      getPermission({ code: 'scope.address', name: 'Addresses' }).then(() => {
        wx.chooseAddress({
          success: async (options) => {
            const { provinceName, cityName, countyName, detailInfo, userName, telNumber } = options;

            if (!phoneRegCheck(telNumber)) {
              Toast({
                context: this,
                selector: '#t-toast',
                message: i18n.t('Enter a valid mobile number'),
              });
              return;
            }

            const target = {
              name: userName,
              phone: telNumber,
              countryName: 'China',
              countryCode: 'chn',
              detailAddress: detailInfo,
              provinceName: provinceName,
              cityName: cityName,
              districtName: countyName,
              isDefault: false,
              isOrderSure: this.properties.isOrderSure,
            };

            try {
              const { provinceCode, cityCode, districtCode } = await addressParse(provinceName, cityName, countyName);

              const params = Object.assign(target, {
                provinceCode,
                cityCode,
                districtCode,
              });
              if (this.properties.isOrderSure) {
                this.onHandleSubmit(params);
              } else if (this.properties.navigateUrl != '') {
                const { navigateEvent } = this.properties;
                this.triggerEvent('navigate');
                wx.navigateTo({
                  url: this.properties.navigateUrl,
                  success: function (res) {
                    res.eventChannel.emit(navigateEvent, params);
                  },
                });
              } else {
                this.triggerEvent('change', params);
              }
            } catch (error) {
              wx.showToast({ title: i18n.t('Error occurred while parsing address. Please try again.'), icon: 'none' });
            }
          },
          fail(err) {
            console.warn('WeChat shipping address is not selected.', err);
          },
        });
      });
    },

    async queryAddress(addressId) {
      try {
        const { data } = await apis.userInfo.queryAddress({ addressId });
        return data.userAddressVO;
      } catch (err) {
        console.error('Error occurred while querying addresses', err);
        throw err;
      }
    },

    findPage(pageRouteUrl) {
      const currentRoutes = getCurrentPages().map((v) => v.route);
      return currentRoutes.indexOf(pageRouteUrl);
    },

    async onHandleSubmit(params) {
      try {
        const orderPageDeltaNum = this.findPage('pages/order/order-confirm/index');
        if (orderPageDeltaNum > -1) {
          wx.navigateBack({ delta: 1 });
          resolveAddress(params);
          return;
        }
      } catch (err) {
        rejectAddress(params);
        console.error(err);
      }
    },
  },
});
