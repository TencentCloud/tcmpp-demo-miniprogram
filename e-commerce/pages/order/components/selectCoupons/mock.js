import i18n from '../../../../i18n/index';
export const couponsData = {
  couponResultList: [
    {
      couponVO: {
        condition: i18n.t('Apply coupon when 200 is spent'),
        couponId: 11,
        endTime: 1584530282686,
        name: i18n.t('Discount coupon'),
        profit: i18n.t('45% off'),
        promotionCode: 90,
        promotionSubCode: 1,
        scopeText: i18n.t('Applicable to certain items'),
        startTime: 1584530282686,
        storeId: 90,
        value: 550,
        type: 2,
      },
      status: 0, // 0:未勾选。1:勾选。-1:置灰
    },
  ],
  reduce: 1000,
};
