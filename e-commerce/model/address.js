import i18n from '../i18n/index';

/** 地址 */
export function genAddress(id) {
  return {
    saasId: '88888888',
    uid: `8888888820550${id}`,
    authToken: null,
    id: `${id}`,
    addressId: `${id}`,
    phone: '17612345678',
    name: i18n.t('Test user {id}', { id }),
    countryName: i18n.t('China'),
    countryCode: i18n.t('chn'),
    provinceName: i18n.t('Gansu Province'),
    provinceCode: '620000',
    cityName: i18n.t('Gannan Tibetan Autonomous Prefecture'),
    cityCode: '623000',
    districtName: i18n.t('Luqu County'),
    districtCode: '623026',
    detailAddress: i18n.t('No. {id}, Floor {id}, Songri Dingsheng Building', { id }),
    isDefault: `${id}` === '0' ? 1 : 0,
    addressTag: id === 0 ? '' : i18n.t('Company'),
    latitude: '34.59103',
    longitude: '102.48699',
    storeId: null,
  };
}

/** 地址列表 */
export function genAddressList(len = 10) {
  return new Array(len).fill(0).map((_, idx) => genAddress(idx));
}
