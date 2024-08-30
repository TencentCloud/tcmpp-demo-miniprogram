import { cdnBase } from '../config/index';
import i18n  from '../i18n/index';
const imgPrefix = cdnBase;

const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allGoods = [
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '0',
    title: i18n.t('White short-sleeve dress with ruffle hem, loose-fitting, Korean-style refreshing, and elegant'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09b.png',
    ],
    video: null,
    available: 1,
    minSalePrice: 29800,
    minLinePrice: 29800,
    maxSalePrice: 29800,
    maxLinePrice: 40000,
    spuStockQuantity: 510,
    soldNum: 1020,
    isPutOnSale: 1,
    categoryIds: [
      '127880527393854975',
      '127880527393854976',
      '127880537778953984',
    ],
    specList: [
      {
        specId: '10011',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '10012',
            specId: null,
            saasId: null,
            specValue: i18n.t('Beige'),
            image: null,
          },
        ],
      },
      {
        specId: '10013',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '11014',
            specId: null,
            saasId: null,
            specValue: i18n.t('S'),
            image: null,
          },
          {
            specValueId: '10014',
            specId: null,
            saasId: null,
            specValue: i18n.t('M'),
            image: null,
          },
          {
            specValueId: '11013',
            specId: null,
            saasId: null,
            specValue: i18n.t('L'),
            image: null,
          },
        ],
      },
    ],
    skuList: [
      {
        skuId: '135676631',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
        specInfo: [
          {
            specId: '10011',
            specTitle: null,
            specValueId: '10012',
            specValue: null,
          },
          {
            specId: '10013',
            specTitle: null,
            specValueId: '11014',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29800', priceTypeName: null },
          { priceType: 2, price: '40000', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 175,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676632',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
        specInfo: [
          {
            specId: '10011',
            specTitle: null,
            specValueId: '10012',
            specValue: null,
          },
          {
            specId: '10013',
            specTitle: null,
            specValueId: '11013',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29800', priceTypeName: null },
          { priceType: 2, price: '40000', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 158,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681631',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png',
        specInfo: [
          {
            specId: '10011',
            specTitle: null,
            specValueId: '10012',
            specValue: null,
          },
          {
            specId: '10013',
            specTitle: null,
            specValueId: '10014',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29800', priceTypeName: null },
          { priceType: 2, price: '40000', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 177,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
    ],
    spuTagList: [{ id: '13001', title: i18n.t('Limited-time offer'), image: null }],
    limitInfo: [
      {
        text: i18n.t('5 at most'),
      },
    ],
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09d.png',
    ],
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135686633',
    title: i18n.t('Pure cotton and round-neck short-sleeve T-shirt in pure white'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
    minSalePrice: '25900',
    minLinePrice: '31900',
    maxSalePrice: '26900',
    maxLinePrice: '31900',
    isSoldOut: false,
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
    ],
    groupIdList: ['15029', '14023'],
    spuTagList: [
      {
        id: null,
        title: i18n.t('2020 summer new'),
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135686634',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: i18n.t('M'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '25900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: -9,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691631',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: i18n.t('S'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '26900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 177,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691632',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: i18n.t('L'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '26900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 194,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 371,
    soldNum: 1032,
    isPutOnSale: 1,
    specList: [
      {
        specId: '10000',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '10001',
            specId: '10000',
            saasId: '88888888',
            specValue: i18n.t('White'),
            image: '',
          },
        ],
      },
      {
        specId: '10002',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '11003',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('S'),
            image: '',
          },
          {
            specValueId: '10003',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('M'),
            image: '',
          },
          {
            specValueId: '11002',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('L'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08d.png',
    ],
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135691628',
    title: i18n.t('Sports hooded zipper sweatshirt with long sleeves, multiple colors and velvet fabric'),
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b1.png',
    ],
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
    minSalePrice: '25900',
    minLinePrice: '39900',
    maxSalePrice: '25900',
    maxLinePrice: '39900',
    isSoldOut: true,
    groupIdList: ['15029', '14023'],
    spuTagList: [
      {
        id: null,
        title: i18n.t('2020 summer new'),
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135686631',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: i18n.t('Green'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862494014208',
            specValue: i18n.t('XS'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '25900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686632',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: i18n.t('Green'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: i18n.t('M'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '25900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691629',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: i18n.t('Green'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: i18n.t('S'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '25900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691630',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: i18n.t('Green'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: i18n.t('L'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '25900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 0,
    soldNum: 1022,
    isPutOnSale: 1,
    specList: [
      {
        specId: '127904180600844800',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '127904180768617216',
            specId: '127904180600844800',
            saasId: '88888888',
            specValue: i18n.t('Green'),
            image: '',
          },
        ],
      },
      {
        specId: '127904861604820480',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '127904862494014208',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('XS'),
            image: '',
          },
          {
            specValueId: '127904862175246592',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('S'),
            image: '',
          },
          {
            specValueId: '127904862007474176',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('M'),
            image: '',
          },
          {
            specValueId: '127904861755815680',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('L'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17d.png',
    ],
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135686623',
    title: i18n.t('Tencent Aurora Box 4 Smart Internet TV Set-top Box 6K Gigabit Network Set-top Box 4K High Resolution'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3b.png',
    ],
    minSalePrice: '9900',
    minLinePrice: '16900',
    maxSalePrice: '10900',
    maxLinePrice: '16900',
    isSoldOut: false,
    groupIdList: [
      '15029',
      '15030',
      '14023',
      '127886731843219200',
      '127886732665303040',
      '127886733101511680',
      '127886733923595520',
      '14025',
      '127886726071855616',
      '14026',
      '127886727481142784',
      '127886731440566784',
    ],
    spuTagList: [
      {
        id: null,
        title: 'Co-branding',
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135686624',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: i18n.t('Energy-friendly set'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '9900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 98,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686625',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: i18n.t('Cyan-blue'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: i18n.t('Classical set'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '9900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686626',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: i18n.t('Premium gift set'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '9900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691622',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: i18n.t('S'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '9900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691623',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: i18n.t('White'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: i18n.t('Premium gift set'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '10900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691624',
        skuImage: null,
        specInfo: [
          {
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: i18n.t('Cyan-blue'),
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: i18n.t('Energy-friendly set'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '9900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 598,
    soldNum: 102,
    isPutOnSale: 1,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3d.png',
    ],
    specList: [
      {
        specId: '10000',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '10001',
            specId: '10000',
            saasId: '88888888',
            specValue: i18n.t('White'),
            image: '',
          },
          {
            specValueId: '11000',
            specId: '10000',
            saasId: '88888888',
            specValue: i18n.t('Cyan-blue'),
            image: '',
          },
        ],
      },
      {
        specId: '10002',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '11003',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('Classical set'),
            image: '',
          },
          {
            specValueId: '10003',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('Energy-friendly set'),
            image: '',
          },
          {
            specValueId: '11002',
            specId: '10002',
            saasId: '88888888',
            specValue: i18n.t('Premium gift set'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681628',
    title: i18n.t('Hooded nap blanket for year of tiger, multifunctional, thickened, enlarged, and fleece-lined'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3b.png',
    ],
    minSalePrice: '29900',
    minLinePrice: '39900',
    maxSalePrice: '39900',
    maxLinePrice: '39900',
    isSoldOut: false,
    groupIdList: [
      '14023',
      '127886732245873408',
      '127886733487386880',
      '14025',
      '127886726071855616',
      '14026',
      '127886728420666112',
      '127886728957538048',
      '127886729779621888',
      '127886730165497088',
      '127886730652037376',
      '127886731037912576',
      '127886731440566784',
      '127886729360190464',
      '15029',
      '15030',
    ],
    spuTagList: [
      {
        id: null,
        title: 'Limited-time sale',
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135676629',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: i18n.t('Light grey'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: i18n.t('S'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '29900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 80,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676630',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: i18n.t('Light grey'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: i18n.t('L'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '39900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 122,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681629',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: i18n.t('Light grey'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: i18n.t('M'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '39900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 119,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3d.png',
    ],
    isAvailable: 1,
    spuStockQuantity: 321,
    soldNum: 102,
    isPutOnSale: 1,
    specList: [
      {
        specId: '127904180600844800',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '127904181322265856',
            specId: '127904180600844800',
            saasId: '88888888',
            specValue: i18n.t('Light grey'),
            image: '',
          },
        ],
      },
      {
        specId: '127904861604820480',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '127904862175246592',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('S'),
            image: '',
          },
          {
            specValueId: '127904862007474176',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('M'),
            image: '',
          },
          {
            specValueId: '127904861755815680',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('L'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681626',
    title: i18n.t('Mini portable high aesthetic Bluetooth wireless headphones with stereo sound'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2b.png',
    ],
    minSalePrice: '29000',
    minLinePrice: '40000',
    maxSalePrice: '39000',
    maxLinePrice: '40000',
    isSoldOut: false,
    groupIdList: [
      '15029',
      '15030',
      '14023',
      '127886732245873408',
      '127886733487386880',
      '14025',
      '127886726071855616',
      '14026',
      '127886728420666112',
      '127886728957538048',
      '127886730652037376',
      '127886731037912576',
    ],
    spuTagList: [
      {
        id: null,
        title: i18n.t('Limited-time offer'),
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135676627',
        skuImage: null,
        specInfo: [
          {
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: i18n.t('Black'),
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '10009',
            specValue: i18n.t('Simple'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '29000',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 123,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676628',
        skuImage: null,
        specInfo: [
          {
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: i18n.t('Black'),
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '10008',
            specValue: i18n.t('Gift'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '39000',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 123,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681627',
        skuImage: null,
        specInfo: [
          {
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: i18n.t('Black'),
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '11008',
            specValue: i18n.t('Simple style with charging cable'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '39000',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 120,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2d.png',
    ],
    isAvailable: 1,
    spuStockQuantity: 366,
    soldNum: 102,
    isPutOnSale: 1,
    specList: [
      {
        specId: '10006',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '10007',
            specId: '10006',
            saasId: '88888888',
            specValue: i18n.t('Black'),
            image: '',
          },
        ],
      },
      {
        specId: '11007',
        title: i18n.t('Type'),
        specValueList: [
          {
            specValueId: '10009',
            specId: '11007',
            saasId: '88888888',
            specValue: i18n.t('Simple'),
            image: '',
          },
          {
            specValueId: '11008',
            specId: '11007',
            saasId: '88888888',
            specValue: i18n.t('Simple style with charging cable'),
            image: '',
          },
          {
            specValueId: '10008',
            specId: '11007',
            saasId: '88888888',
            specValue: i18n.t('Gift'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681622',
    title: i18n.t('Simple heat-resistant dinner plates for home use with multiple colors'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1a2.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1b.png',
    ],
    minSalePrice: '129900',
    minLinePrice: '218000',
    maxSalePrice: '139900',
    maxLinePrice: '218000',
    isSoldOut: false,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-1d.png',
    ],
    groupIdList: [
      '14023',
      '127886732665303040',
      '127886733101511680',
      '127886733923595520',
      '14025',
      '127886726071855616',
      '14026',
      '127886728957538048',
      '127886727481142784',
      '127886729779621888',
      '127886730165497088',
      '127886730652037376',
      '127886731440566784',
      '127886729360190464',
      '15029',
      '15030',
    ],
    spuTagList: [
      {
        id: null,
        title: i18n.t('Top sellers'),
        image: null,
      },
    ],
    skuList: [
      {
        skuId: '135676623',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181506815488',
            specValue: i18n.t('Creamy yellow'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: i18n.t('Single plate'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '129900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '218000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 119,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676624',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181506815488',
            specValue: i18n.t('Creamy yellow'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: i18n.t('Plate + bowl'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '139900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '218000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 116,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681623',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181506815488',
            specValue: i18n.t('Creamy yellow'),
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: i18n.t('Single plate'),
          },
        ],
        priceInfo: [
          {
            priceType: 1,
            price: '139900',
            priceTypeName: i18n.t('Selling price'),
          },
          {
            priceType: 2,
            price: '218000',
            priceTypeName: i18n.t('List price'),
          },
        ],
        stockInfo: {
          stockQuantity: 122,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 357,
    soldNum: 23102,
    isPutOnSale: 1,
    specList: [
      {
        specId: '127904180600844800',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '127904181506815488',
            specId: '127904180600844800',
            saasId: '88888888',
            specValue: i18n.t('Creamy yellow'),
            image: '',
          },
        ],
      },
      {
        specId: '127904861604820480',
        title: i18n.t('Type'),
        specValueList: [
          {
            specValueId: '127904862175246592',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('Single plate'),
            image: '',
          },
          {
            specValueId: '127904862007474176',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('Single bowl'),
            image: '',
          },
          {
            specValueId: '127904861755815680',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: i18n.t('Plate + bowl'),
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681624',
    title: i18n.t('Stainless steel knife, fork, and spoon set for home available in gold and silver color'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
    ],
    video: null,
    available: 1,
    minSalePrice: '19900',
    minLinePrice: '19900',
    maxSalePrice: '29900',
    maxLinePrice: '29900',
    spuStockQuantity: 0,
    soldNum: 102,
    isPutOnSale: 1,
    categoryIds: [
      '127880527393854975',
      '127880527393854977',
      '127880526789875961',
    ],
    specList: [
      {
        specId: '127904180600844800',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '127904180768617216',
            specId: null,
            saasId: null,
            specValue: i18n.t('Creamy yellow'),
            image: null,
          },
        ],
      },
      {
        specId: '127904861604820480',
        title: i18n.t('Quantity'),
        specValueList: [
          {
            specValueId: '127904862175246592',
            specId: null,
            saasId: null,
            specValue: i18n.t('Three-piece set'),
            image: null,
          },
          {
            specValueId: '127904862007474176',
            specId: null,
            saasId: null,
            specValue: i18n.t('six-piece set'),
            image: null,
          },
          {
            specValueId: '127904861755815680',
            specId: null,
            saasId: null,
            specValue: i18n.t('Eight-piece set'),
            image: null,
          },
        ],
      },
    ],
    skuList: [
      {
        skuId: '135676625',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '19900', priceTypeName: null },
          { priceType: 2, price: '29900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676626',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29900', priceTypeName: null },
          { priceType: 2, price: '29900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681625',
        skuImage: null,
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29900', priceTypeName: null },
          { priceType: 2, price: '29900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
    ],
    spuTagList: [{ id: '19011', title: i18n.t('2020 autumn new'), image: null }],
    spuLimitList: null,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2d.png',
    ],
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681628',
    title: i18n.t('Hooded nap blanket for year of tiger, multifunctional, thickened, enlarged, and fleece-lined'),
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
    images: ['https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png'],
    video: null,
    available: 1,
    minSalePrice: '29900',
    minLinePrice: '29900',
    maxSalePrice: '39900',
    maxLinePrice: '39900',
    spuStockQuantity: 321,
    soldNum: 103,
    isPutOnSale: 1,
    categoryIds: [
      '127880527393854975',
      '127880527393854977',
      '127880526789875961',
    ],
    specList: [
      {
        specId: '127904180600844800',
        title: i18n.t('Color'),
        specValueList: [
          {
            specValueId: '127904181322265856',
            specId: null,
            saasId: null,
            specValue: i18n.t('Light grey'),
            image: null,
          },
        ],
      },
      {
        specId: '127904861604820480',
        title: i18n.t('Size'),
        specValueList: [
          {
            specValueId: '127904862175246592',
            specId: null,
            saasId: null,
            specValue: i18n.t('S'),
            image: null,
          },
          {
            specValueId: '127904862007474176',
            specId: null,
            saasId: null,
            specValue: i18n.t('M'),
            image: null,
          },
          {
            specValueId: '127904861755815680',
            specId: null,
            saasId: null,
            specValue: i18n.t('L'),
            image: null,
          },
        ],
      },
    ],
    skuList: [
      {
        skuId: '135676629',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '29900', priceTypeName: null },
          { priceType: 2, price: '39900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 80,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676630',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '39900', priceTypeName: null },
          { priceType: 2, price: '39900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 122,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681629',
        skuImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
        specInfo: [
          {
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: null,
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: null,
          },
        ],
        priceInfo: [
          { priceType: 1, price: '39900', priceTypeName: null },
          { priceType: 2, price: '39900', priceTypeName: null },
        ],
        stockInfo: {
          stockQuantity: 119,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: { value: null, unit: i18n.t('KG') },
        volume: null,
        profitPrice: null,
      },
    ],
    spuTagList: [{ id: '13001', title: i18n.t('Limited-time offer'), image: null }],
    spuLimitList: null,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3d.png',
    ],
    etitle: '',
  },
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
export function genGood(id, available = 1) {
  const specID = ['135681624', '135681628'];
  if (specID.indexOf(id) > -1) {
    return allGoods.filter((good) => good.spuId === id)[0];
  }
  const item = allGoods[id % allGoods.length];
  return {
    ...item,
    spuId: `${id}`,
    available: available,
    desc: item?.desc || defaultDesc,
    images: item?.images || [item?.primaryImage],
  };
}
