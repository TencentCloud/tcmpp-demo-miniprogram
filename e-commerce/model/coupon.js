import i18n from '../i18n/index';
/**
 * 优惠券
 *
 * @typedef {'default'|'useless'|'disabled'} CouponCardStatus
 * @typedef {'discount'|'price'} CouponCardType
 *
 * @param {number} [id]
 * @param {CouponCardStatus} [status]
 * @param {CouponCardType} [type]
 */
export function getCoupon(id = 0, status = 'default', type = (id % 2) + 1) {
  return {
    /** key */
    key: `${id}`,
    /** 优惠券状态 */
    status,
    /** 优惠券类型 */
    type,
    /** 折扣或者满减值 */
    value: type === 2 ? 5.5 : 1800,
    /** 标签 */
    tag: '',
    /** 描述 */
    desc:
      parseInt(id) > 0
        ? i18n.t('Apply coupons when your spend {fee}', { fee: parseInt(id) * 100 })
        : i18n.t('Use without conditions'),
    /** 订单底价,满n元 */
    base: 10000 * (parseInt(id) || 0),
    /** 标题 */
    title:
      type === 2
        ? `${i18n.t('Discount coupon for fresh food')}- ${id}`
        : `${i18n.t('Deduction coupon for fresh food')}- ${id}`,
    /** 有效时间限制 */
    timeLimit: '2019.11.18-2023.12.18',
    /** 货币符号 */
    currency: '¥',
  };
}

/** 优惠券列表 */
export function getCouponList(status = 'default', length = 10) {
  return new Array(length).fill(0).map((_, idx) => getCoupon(idx, status));
}
