
import i18n  from '../i18n/index';

export function getGoods() {
  return {
    goods: [
      {
        squid: '1',
        checkItems: [
          {
            name: i18n.t('Review anonymously'),
            value: i18n.t('anonymous'),
            checked: false,
          },
        ],
        detail: {
          image: 'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
          title: '',
        },
        goodComment: {
          /** 商品评价 */
          rate: 0,
          /** 评价内容 */
          label: '123',
          /** 上传图片 */
          images: [],
        },
      },
      {
        squid: '2',
        checkItems: [
          {
            name: i18n.t('Review anonymously'),
            value: i18n.t('anonymous'),
            checked: false,
          },
        ],
        detail: {
          image: 'https://wx.qlogo.cn/mmopen/vi_32/51VSMNuy1CyHiaAhAjLJ00kMZVqqnCqXeZduCLXHUBr52zFHRGxwL7kGia3fHj8GSNzFcqFDInQmRGM1eWjtQgqA/132',
          title: i18n.t('Review content Sam\'s which is import from Chile'),
        },
        goodComment: {
          /** 商品评价 */
          rate: 0,
          /** 评价内容 */
          label: i18n.t('Sam\'s which is import from Chile'),
          /** 上传图片 */
          images: [],
        },
      },
    ],
    storeComment: {
      /** 物流评价 */
      logisticsRate: 0,
      /** 服务评价 */
      servicesRate: 0,
    },
  };
}
