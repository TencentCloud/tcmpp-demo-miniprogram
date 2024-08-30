import i18n  from '../i18n/index';
/**
 * @param {number} spuId
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} commentsLevel
 * @param {boolean} hasImage
 */
export function getGoodsAllComments(params) {
  const { hasImage } = params.queryParameter;
  if (hasImage) {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: '1',
      pageList: [
        {
          spuId: '1722045',
          skuId: '0',
          specInfo: '',
          commentContent: i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
          commentResources: [
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
              type: 'image',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
          ],
          commentScore: 4,
          uid: '88881048075',
          userName: 'Dean',
          userHeadUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
          isAnonymity: false,
          commentTime: '1591953561000',
          isAutoComment: false,
          sellerReply:i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
          goodsDetailInfo: i18n.t('Color: white; Size: S'),
        },
        {
          spuId: '1722045',
          skuId: '0',
          specInfo: '',
          commentContent:
            i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
          commentResources: [
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
              type: 'image',
            },
          ],
          commentScore: 4,
          uid: '88881048075',
          userName: 'Dean',
          userHeadUrl:
            'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
          isAnonymity: false,
          commentTime: '1591953561000',
          isAutoComment: false,
          sellerReply:
            i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
          goodsDetailInfo: i18n.t('Color: white; Size: S'),
        },
        {
          spuId: '1722045',
          skuId: '0',
          specInfo: '',
          commentContent:
            i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
          commentResources: [
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
              type: 'image',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
          ],
          commentScore: 4,
          uid: '88881048075',
          userName: 'Dean',
          userHeadUrl:
            'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
          isAnonymity: false,
          commentTime: '1591953561000',
          isAutoComment: false,
          sellerReply: i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
          goodsDetailInfo: i18n.t('Color: white; Size: S'),
        },
        {
          spuId: '1722045',
          skuId: '0',
          specInfo: '',
          commentContent:
            i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
          commentResources: [
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
              type: 'image',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
            {
              src: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/comment-video.mp4',
              type: 'video',
              coverSrc:
                'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
            },
          ],
          commentScore: 4,
          uid: '88881048075',
          userName: 'Dean',
          userHeadUrl:
            'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
          isAnonymity: false,
          commentTime: '1591953561000',
          isAutoComment: false,
          sellerReply:
            i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
          goodsDetailInfo: i18n.t('Color: white; Size: S'),
        },
      ],
    };
  }
  return {
    pageNum: 1,
    pageSize: 10,
    totalCount: '47',
    pageList: [
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: 'Very good',
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 1,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592224320000',
        isAutoComment: false,
        sellerReply:
          i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
        goodsDetailInfo: i18n.t('Color: white; Size: S'),
      },
      {
        spuId: '1722045',
        skuId: '1697693',
        specInfo: 'Very suitable',
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 1,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592224320000',
        isAutoComment: false,
        sellerReply:
          i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
        goodsDetailInfo: i18n.t('Color: white; Size: S'),
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: 'NICE',
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592218074000',
        isAutoComment: true,
        sellerReply:
          i18n.t('Hello, we will contact the merchants and manufacturers to give you a satisfactory answer. Please be sure to keep the invoice properly.'),
      },
      {
        spuId: '1722045',
        skuId: '0',
        specInfo: '',
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592218074000',
        isAutoComment: false,
        goodsDetailInfo: i18n.t('Color: white; Size: S'),
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: i18n.t('Test dr ;bwtgg01:fff'),
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592217607000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697693',
        specInfo: 'Test dr;bwtgg01:bbb',
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 4,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592217607000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: i18n.t('Test dr ;bwtgg01:fff'),
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592205599000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: i18n.t('Test dr ;bwtgg01:fff'),
        commentContent:
          i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881048075',
        userName: 'Dean',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1592188822000',
        isAutoComment: false,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: i18n.t('Test dr ;bwtgg01:fff'),
        commentContent: i18n.t('I received the item and tried it on immediately. It is very beautiful and I really like it. I love it very much. The color is also very nice. Awesome!'),
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881055835',
        userName: 'Max',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1593792002000',
        isAutoComment: true,
      },
      {
        spuId: '1722045',
        skuId: '1697694',
        specInfo: i18n.t('Test dr ;bwtgg01:fff'),
        commentContent: '',
        commentImageUrls: null,
        commentScore: 5,
        uid: '88881055835',
        userName: 'Max',
        userHeadUrl:
          'https://cdn-we-retail.ym.tencent.com/tsr/avatar/avatar1.png',
        isAnonymity: false,
        commentTime: '1593792001000',
        isAutoComment: true,
      },
    ],
  };
}

export function getGoodsCommentsCount() {
  return {
    commentCount: '47',
    badCount: '0',
    middleCount: '2',
    goodCount: '45',
    hasImageCount: '1',
    goodRate: 95.7,
    uidCount: '0',
  };
}
