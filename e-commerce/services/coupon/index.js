import { config } from "../../config/index";
import i18n from "../../i18n/index";

/** 获取优惠券列表 */
function mockFetchCoupon(status) {
  const { delay } = require("../_utils/delay");
  const { getCouponList } = require("../../model/coupon");
  return delay().then(() => getCouponList(status));
}

/** 获取优惠券列表 */
export function fetchCouponList(status = "default") {
  if (config.useMock) {
    return mockFetchCoupon(status);
  }
  return new Promise((resolve) => {
    resolve("real api");
  });
}

/** 获取优惠券 详情 */
function mockFetchCouponDetail(id, status) {
  const { delay } = require("../_utils/delay");
  const { getCoupon } = require("../../model/coupon");
  const { genAddressList } = require("../../model/address");

  return delay().then(() => {
    const result = {
      detail: getCoupon(id, status),
      storeInfoList: genAddressList(),
    };

    result.detail.useNotes = i18n.t(`1 order is limited to 1, except for shipping coupons, can not be stacked with other types of coupons (except shipping coupons) \n2. Only applicable to the normal sale of goods in each region, do not support group buying, panic buying, pre-sale of goods`);
    result.detail.storeAdapt = i18n.t("Mall general");

    if (result.detail.type === "price") {
      result.detail.desc = `Save ${result.detail.value / 100} `;

      if (result.detail.base) {
        result.detail.desc += `，for ${result.detail.base / 100} `;
      }

      result.detail.desc += "。";
    } else if (result.detail.type === "discount") {
      result.detail.desc = `${result.detail.value}% off`;

      if (result.detail.base) {
        result.detail.desc += `，for ${result.detail.base / 100} `;
      }

      result.detail.desc += "。";
    }

    return result;
  });
}

/** 获取优惠券 详情 */
export function fetchCouponDetail(id, status = "default") {
  if (config.useMock) {
    return mockFetchCouponDetail(id, status);
  }
  return new Promise((resolve) => {
    resolve("real api");
  });
}
