import i18n from '../i18n/index';

export const config = {
  /** 是否使用mock代替api返回 */
  useMock: true,
};

export const cdnBase = 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp';

export const areaData = [
  {
    label: i18n.t('北京市'),
    value: '110000',
    children: [
      {
        label: i18n.t('北京市'),
        value: '110100',
        children: [
          {
            label: i18n.t('东城区'),
            value: '110101',
            children: null,
          },
          {
            label: i18n.t('西城区'),
            value: '110102',
            children: null,
          },
          {
            label: i18n.t('朝阳区'),
            value: '110105',
            children: null,
          },
          {
            label: i18n.t('丰台区'),
            value: '110106',
            children: null,
          },
          {
            label: i18n.t('石景山区'),
            value: '110107',
            children: null,
          },
          {
            label: i18n.t('海淀区'),
            value: '110108',
            children: null,
          },
          {
            label: i18n.t('门头沟区'),
            value: '110109',
            children: null,
          },
          {
            label: i18n.t('房山区'),
            value: '110111',
            children: null,
          },
          {
            label: i18n.t('通州区'),
            value: '110112',
            children: null,
          },
          {
            label: i18n.t('顺义区'),
            value: '110113',
            children: null,
          },
          {
            label: i18n.t('昌平区'),
            value: '110114',
            children: null,
          },
          {
            label: i18n.t('大兴区'),
            value: '110115',
            children: null,
          },
          {
            label: i18n.t('怀柔区'),
            value: '110116',
            children: null,
          },
          {
            label: i18n.t('平谷区'),
            value: '110117',
            children: null,
          },
          {
            label: i18n.t('密云区'),
            value: '110118',
            children: null,
          },
          {
            label: i18n.t('延庆区'),
            value: '110119',
            children: null,
          },
        ],
      },
    ],
  },
  {
    label: i18n.t('内蒙古自治区'),
    value: '150000',
    children: [
      {
        label: i18n.t('呼和浩特市'),
        value: '150100',
        children: [
          {
            label: i18n.t('新城区'),
            value: '150102',
            children: null,
          },
          {
            label: i18n.t('回民区'),
            value: '150103',
            children: null,
          },
          {
            label: i18n.t('玉泉区'),
            value: '150104',
            children: null,
          },
          {
            label: i18n.t('赛罕区'),
            value: '150105',
            children: null,
          },
          {
            label: i18n.t('土默特左旗'),
            value: '150121',
            children: null,
          },
          {
            label: i18n.t('托克托县'),
            value: '150122',
            children: null,
          },
          {
            label: i18n.t('和林格尔县'),
            value: '150123',
            children: null,
          },
          {
            label: i18n.t('清水河县'),
            value: '150124',
            children: null,
          },
          {
            label: i18n.t('武川县'),
            value: '150125',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('包头市'),
        value: '150200',
        children: [
          {
            label: i18n.t('东河区'),
            value: '150202',
            children: null,
          },
          {
            label: i18n.t('昆都仑区'),
            value: '150203',
            children: null,
          },
          {
            label: i18n.t('青山区'),
            value: '150204',
            children: null,
          },
          {
            label: i18n.t('石拐区'),
            value: '150205',
            children: null,
          },
          {
            label: i18n.t('白云鄂博矿区'),
            value: '150206',
            children: null,
          },
          {
            label: i18n.t('九原区'),
            value: '150207',
            children: null,
          },
          {
            label: i18n.t('土默特右旗'),
            value: '150221',
            children: null,
          },
          {
            label: i18n.t('固阳县'),
            value: '150222',
            children: null,
          },
          {
            label: i18n.t('达尔罕茂明安联合旗'),
            value: '150223',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('乌海市'),
        value: '150300',
        children: [
          {
            label: i18n.t('海勃湾区'),
            value: '150302',
            children: null,
          },
          {
            label: i18n.t('海南区'),
            value: '150303',
            children: null,
          },
          {
            label: i18n.t('乌达区'),
            value: '150304',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('赤峰市'),
        value: '150400',
        children: [
          {
            label: i18n.t('红山区'),
            value: '150402',
            children: null,
          },
          {
            label: i18n.t('元宝山区'),
            value: '150403',
            children: null,
          },
          {
            label: i18n.t('松山区'),
            value: '150404',
            children: null,
          },
          {
            label: i18n.t('阿鲁科尔沁旗'),
            value: '150421',
            children: null,
          },
          {
            label: i18n.t('巴林左旗'),
            value: '150422',
            children: null,
          },
          {
            label: i18n.t('巴林右旗'),
            value: '150423',
            children: null,
          },
          {
            label: i18n.t('林西县'),
            value: '150424',
            children: null,
          },
          {
            label: i18n.t('克什克腾旗'),
            value: '150425',
            children: null,
          },
          {
            label: i18n.t('翁牛特旗'),
            value: '150426',
            children: null,
          },
          {
            label: i18n.t('喀喇沁旗'),
            value: '150428',
            children: null,
          },
          {
            label: i18n.t('宁城县'),
            value: '150429',
            children: null,
          },
          {
            label: i18n.t('敖汉旗'),
            value: '150430',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('通辽市'),
        value: '150500',
        children: [
          {
            label: i18n.t('科尔沁区'),
            value: '150502',
            children: null,
          },
          {
            label: i18n.t('科尔沁左翼中旗'),
            value: '150521',
            children: null,
          },
          {
            label: i18n.t('科尔沁左翼后旗'),
            value: '150522',
            children: null,
          },
          {
            label: i18n.t('开鲁县'),
            value: '150523',
            children: null,
          },
          {
            label: i18n.t('库伦旗'),
            value: '150524',
            children: null,
          },
          {
            label: i18n.t('奈曼旗'),
            value: '150525',
            children: null,
          },
          {
            label: i18n.t('扎鲁特旗'),
            value: '150526',
            children: null,
          },
          {
            label: i18n.t('霍林郭勒市'),
            value: '150581',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('鄂尔多斯市'),
        value: '150600',
        children: [
          {
            label: i18n.t('东胜区'),
            value: '150602',
            children: null,
          },
          {
            label: i18n.t('康巴什区'),
            value: '150603',
            children: null,
          },
          {
            label: i18n.t('达拉特旗'),
            value: '150621',
            children: null,
          },
          {
            label: i18n.t('准格尔旗'),
            value: '150622',
            children: null,
          },
          {
            label: i18n.t('鄂托克前旗'),
            value: '150623',
            children: null,
          },
          {
            label: i18n.t('鄂托克旗'),
            value: '150624',
            children: null,
          },
          {
            label: i18n.t('杭锦旗'),
            value: '150625',
            children: null,
          },
          {
            label: i18n.t('乌审旗'),
            value: '150626',
            children: null,
          },
          {
            label: i18n.t('伊金霍洛旗'),
            value: '150627',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('呼伦贝尔市'),
        value: '150700',
        children: [
          {
            label: i18n.t('海拉尔区'),
            value: '150702',
            children: null,
          },
          {
            label: i18n.t('扎赉诺尔区'),
            value: '150703',
            children: null,
          },
          {
            label: i18n.t('阿荣旗'),
            value: '150721',
            children: null,
          },
          {
            label: i18n.t('莫力达瓦达斡尔族自治旗'),
            value: '150722',
            children: null,
          },
          {
            label: i18n.t('鄂伦春自治旗'),
            value: '150723',
            children: null,
          },
          {
            label: i18n.t('鄂温克族自治旗'),
            value: '150724',
            children: null,
          },
          {
            label: i18n.t('陈巴尔虎旗'),
            value: '150725',
            children: null,
          },
          {
            label: i18n.t('新巴尔虎左旗'),
            value: '150726',
            children: null,
          },
          {
            label: i18n.t('新巴尔虎右旗'),
            value: '150727',
            children: null,
          },
          {
            label: i18n.t('满洲里市'),
            value: '150781',
            children: null,
          },
          {
            label: i18n.t('牙克石市'),
            value: '150782',
            children: null,
          },
          {
            label: i18n.t('扎兰屯市'),
            value: '150783',
            children: null,
          },
          {
            label: i18n.t('额尔古纳市'),
            value: '150784',
            children: null,
          },
          {
            label: i18n.t('根河市'),
            value: '150785',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('巴彦淖尔市'),
        value: '150800',
        children: [
          {
            label: i18n.t('临河区'),
            value: '150802',
            children: null,
          },
          {
            label: i18n.t('五原县'),
            value: '150821',
            children: null,
          },
          {
            label: i18n.t('磴口县'),
            value: '150822',
            children: null,
          },
          {
            label: i18n.t('乌拉特前旗'),
            value: '150823',
            children: null,
          },
          {
            label: i18n.t('乌拉特中旗'),
            value: '150824',
            children: null,
          },
          {
            label: i18n.t('乌拉特后旗'),
            value: '150825',
            children: null,
          },
          {
            label: i18n.t('杭锦后旗'),
            value: '150826',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('乌兰察布市'),
        value: '150900',
        children: [
          {
            label: i18n.t('集宁区'),
            value: '150902',
            children: null,
          },
          {
            label: i18n.t('卓资县'),
            value: '150921',
            children: null,
          },
          {
            label: i18n.t('化德县'),
            value: '150922',
            children: null,
          },
          {
            label: i18n.t('商都县'),
            value: '150923',
            children: null,
          },
          {
            label: i18n.t('兴和县'),
            value: '150924',
            children: null,
          },
          {
            label: i18n.t('凉城县'),
            value: '150925',
            children: null,
          },
          {
            label: i18n.t('察哈尔右翼前旗'),
            value: '150926',
            children: null,
          },
          {
            label: i18n.t('察哈尔右翼中旗'),
            value: '150927',
            children: null,
          },
          {
            label: i18n.t('察哈尔右翼后旗'),
            value: '150928',
            children: null,
          },
          {
            label: i18n.t('四子王旗'),
            value: '150929',
            children: null,
          },
          {
            label: i18n.t('丰镇市'),
            value: '150981',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('兴安盟'),
        value: '152200',
        children: [
          {
            label: i18n.t('乌兰浩特市'),
            value: '152201',
            children: null,
          },
          {
            label: i18n.t('阿尔山市'),
            value: '152202',
            children: null,
          },
          {
            label: i18n.t('科尔沁右翼前旗'),
            value: '152221',
            children: null,
          },
          {
            label: i18n.t('科尔沁右翼中旗'),
            value: '152222',
            children: null,
          },
          {
            label: i18n.t('扎赉特旗'),
            value: '152223',
            children: null,
          },
          {
            label: i18n.t('突泉县'),
            value: '152224',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('锡林郭勒盟'),
        value: '152500',
        children: [
          {
            label: i18n.t('二连浩特市'),
            value: '152501',
            children: null,
          },
          {
            label: i18n.t('锡林浩特市'),
            value: '152502',
            children: null,
          },
          {
            label: i18n.t('阿巴嘎旗'),
            value: '152522',
            children: null,
          },
          {
            label: i18n.t('苏尼特左旗'),
            value: '152523',
            children: null,
          },
          {
            label: i18n.t('苏尼特右旗'),
            value: '152524',
            children: null,
          },
          {
            label: i18n.t('东乌珠穆沁旗'),
            value: '152525',
            children: null,
          },
          {
            label: i18n.t('西乌珠穆沁旗'),
            value: '152526',
            children: null,
          },
          {
            label: i18n.t('太仆寺旗'),
            value: '152527',
            children: null,
          },
          {
            label: i18n.t('镶黄旗'),
            value: '152528',
            children: null,
          },
          {
            label: i18n.t('正镶白旗'),
            value: '152529',
            children: null,
          },
          {
            label: i18n.t('正蓝旗'),
            value: '152530',
            children: null,
          },
          {
            label: i18n.t('多伦县'),
            value: '152531',
            children: null,
          },
        ],
      },
      {
        label: i18n.t('阿拉善盟'),
        value: '152900',
        children: [
          {
            label: i18n.t('阿拉善左旗'),
            value: '152921',
            children: null,
          },
          {
            label: i18n.t('阿拉善右旗'),
            value: '152922',
            children: null,
          },
          {
            label: i18n.t('额济纳旗'),
            value: '152923',
            children: null,
          },
        ],
      },
    ],
  },
];
