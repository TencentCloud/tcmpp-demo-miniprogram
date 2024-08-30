import { getGoodsList } from './goods';
import i18n from '../i18n/index';

/**
 * @param {number} sort
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {string} keyword
 */

export function getSearchHistory() {
  return {
    historyWords: [
      i18n.t('Chicken'),
      i18n.t('Computer'),
      i18n.t('iPhone12'),
      i18n.t('Phone holder for car'),
      i18n.t('CHANDO'),
      i18n.t('Xiaomi 10'),
      i18n.t('Gujing Gongjiu original alcohol'),
      i18n.t('Omega'),
      i18n.t('Huawei'),
      i18n.t('Knitted skirt'),
      i18n.t('Running shoes'),
      i18n.t('3-core CPU'),
    ],
  };
}

export function getSearchPopular() {
  return {
    popularWords: [
      i18n.t('Chicken'),
      i18n.t('Computer'),
      i18n.t('iPhone12'),
      i18n.t('Phone holder for car'),
      i18n.t('CHANDO'),
      i18n.t('Xiaomi 10'),
      i18n.t('Gujing Gongjiu original alcohol'),
      i18n.t('Omega'),
      i18n.t('Huawei'),
      i18n.t('Knitted skirt'),
      i18n.t('Running shoes'),
      i18n.t('3-core CPU'),
    ],
  };
}

export function getSearchResult() {
  return {
    saasId: null,
    storeId: null,
    pageNum: 1,
    pageSize: 30,
    totalCount: 1,
    spuList: getGoodsList(7),
    algId: 0,
  };
}
