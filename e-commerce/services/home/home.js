import { config, cdnBase } from '../../config/index';
import i18n from '../../i18n/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');

  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: i18n.t('Select and recommend'),
          key: 0,
        },
        {
          text: i18n.t('Sunscreen'),
          key: 1,
        },
        {
          text: i18n.t('For second child'),
          key: 2,
        },
        {
          text: i18n.t('Best sellers'),
          key: 3,
        },
        {
          text: i18n.t('Top sellers'),
          key: 4,
        },
        {
          text: i18n.t('RTX 30'),
          key: 5,
        },
        {
          text: i18n.t('Deals in mobile phone'),
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('has error');
  });
}
