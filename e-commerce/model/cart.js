import { mockIp, mockReqId } from '../utils/mock';
import i18n  from '../i18n/index';

export function genCartGroupData() {
  const resp = {
    data: {
      isNotEmpty: true,
      storeGoods: [
        {
          storeId: '1000',
          storeName: i18n.t('Cloud Mall Shenzhen flagship store'),
          storeStatus: 1,
          totalDiscountSalePrice: '9990',
          promotionGoodsList: [
            {
              title: i18n.t('Discount and deduction deals back'),
              promotionCode: 'MERCHANT',
              promotionSubCode: 'MYJ',
              promotionId: '159174555838121985',
              tagText: [i18n.t('Save 99.9 for 100')],
              promotionStatus: 3,
              tag: i18n.t('Deduction'),
              description: i18n.t('Save 99.9 for 100 and 99.9 has been deducted'),
              doorSillRemain: null,
              isNeedAddOnShop: 0,
              goodsPromotionList: [
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '12',
                  skuId: '135691622',
                  isSelected: 1,
                  thumb:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
                  title:
                    i18n.t('Tencent Aurora Box 4 Smart Internet TV Set-top Box 6K Gigabit Network Set-top Box 4K High Resolution'),
                  primaryImage:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
                  quantity: 1,
                  stockStatus: true,
                  stockQuantity: 3,
                  price: '9900',
                  originPrice: '16900',
                  tagPrice: null,
                  titlePrefixTags: [{ text: i18n.t('New') }, { text: i18n.t('Hot') }],
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('White'),
                    },
                    {
                      specTitle: i18n.t('Type'),
                      specValue: i18n.t('Classical set'),
                    },
                  ],
                  joinCartTime: '2020-06-29T07:55:40.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '18',
                  skuId: '135681631',
                  isSelected: 1,
                  thumb: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
                  title: i18n.t('White short-sleeve dress with ruffle hem, loose-fitting, Korean-style refreshing, and elegant'),
                  primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
                  quantity: 1,
                  stockStatus: true,
                  stockQuantity: 177,
                  price: '29800',
                  originPrice: '40000',
                  tagPrice: null,
                  titlePrefixTags: null,
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('Beige'),
                    },
                    {
                      specTitle: i18n.t('Size'),
                      specValue: i18n.t('M'),
                    },
                  ],
                  joinCartTime: '2020-06-29T07:55:27.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '13',
                  skuId: '135698362',
                  isSelected: 1,
                  thumb:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
                  title:
                    i18n.t('Hooded nap blanket for year of tiger, multifunctional, thickened, enlarged, and fleece-lined'),
                  primaryImage:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
                  quantity: 13,
                  stockStatus: true,
                  stockQuantity: 9,
                  price: '29900',
                  originPrice: '0',
                  tagPrice: null,
                  titlePrefixTags: [{ text: i18n.t('Hot') }],
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('Light grey'),
                    },
                    {
                      specTitle: i18n.t('Size'),
                      specValue: i18n.t('M'),
                    },
                  ],
                  joinCartTime: '2020-06-29T07:54:43.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '7',
                  skuId: '135681625',
                  isSelected: 1,
                  thumb:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
                  title:
                    i18n.t('Stainless steel knife, fork, and spoon set for home available in gold and silver color'),
                  primaryImage:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
                  quantity: 1,
                  stockStatus: true,
                  stockQuantity: 0,
                  price: '29900',
                  originPrice: '29900',
                  tagPrice: null,
                  titlePrefixTags: null,
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('Creamy yellow'),
                    },
                    {
                      specTitle: i18n.t('Quantity'),
                      specValue: i18n.t('six-piece set'),
                    },
                  ],
                  joinCartTime: '2020-06-29T07:55:00.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
              ],
              lastJoinTime: '2020-06-29T07:55:40.000+0000',
            },
            {
              title: null,
              promotionCode: 'EMPTY_PROMOTION',
              promotionSubCode: null,
              promotionId: null,
              tagText: null,
              promotionStatus: null,
              tag: null,
              description: null,
              doorSillRemain: null,
              isNeedAddOnShop: 0,
              goodsPromotionList: [
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '11',
                  skuId: '135691629',
                  isSelected: 0,
                  thumb:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
                  title: i18n.t('Sports hooded zipper sweatshirt with long sleeves, multiple colors and velvet fabric'),
                  primaryImage:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
                  quantity: 1,
                  stockStatus: false,
                  stockQuantity: 0,
                  price: '25900',
                  originPrice: '39900',
                  tagPrice: null,
                  tagText: null,
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('Green'),
                    },
                    {
                      specTitle: i18n.t('Size'),
                      specValue: i18n.t('S'),
                    },
                  ],
                  joinCartTime: '2020-04-24T06:26:48.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
                {
                  uid: '88888888205468',
                  saasId: '88888888',
                  storeId: '1000',
                  spuId: '5',
                  skuId: '135691635',
                  isSelected: 0,
                  thumb:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
                  title:
                    i18n.t('Mini portable high aesthetic Bluetooth wireless headphones with stereo sound'),
                  primaryImage:
                    'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
                  quantity: 1,
                  stockStatus: true,
                  stockQuantity: 96,
                  price: '29000',
                  originPrice: '29900',
                  tagPrice: null,
                  tagText: null,
                  roomId: null,
                  specInfo: [
                    {
                      specTitle: i18n.t('Color'),
                      specValue: i18n.t('Black'),
                    },
                    {
                      specTitle: i18n.t('Type'),
                      specValue: i18n.t('Simple'),
                    },
                  ],
                  joinCartTime: '2020-06-29T07:55:17.000+0000',
                  available: 1,
                  putOnSale: 1,
                  etitle: null,
                },
              ],
              lastJoinTime: null,
            },
          ],
          lastJoinTime: '2020-06-29T07:55:40.000+0000',
          postageFreePromotionVo: {
            title: null,
            promotionCode: null,
            promotionSubCode: null,
            promotionId: null,
            tagText: null,
            promotionStatus: null,
            tag: null,
            description: null,
            doorSillRemain: null,
            isNeedAddOnShop: 0,
          },
        },
      ],
      invalidGoodItems: [
        {
          uid: '88888888205468',
          saasId: '88888888',
          storeId: '1000',
          spuId: '1',
          skuId: '135691631',
          isSelected: 1,
          thumb: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
          title: i18n.t('Pure cotton and round-neck short-sleeve T-shirt in pure white'),
          primaryImage:
            'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
          quantity: 8,
          stockStatus: true,
          stockQuantity: 177,
          price: '26900',
          originPrice: '31900',
          tagPrice: null,
          tagText: null,
          roomId: null,
          specInfo: [
            {
              specTitle: i18n.t('Color'),
              specValue: i18n.t('White'),
            },
            {
              specTitle: i18n.t('Size'),
              specValue: i18n.t('S'),
            },
          ],
          joinCartTime: '2020-04-28T04:03:59.000+0000',
          available: 1,
          putOnSale: 1,
          etitle: null,
        },
      ],
      isAllSelected: false,
      selectedGoodsCount: 16,
      totalAmount: '179997',
      totalDiscountAmount: '110000',
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 269,
    success: true,
  };
  return resp;
}
