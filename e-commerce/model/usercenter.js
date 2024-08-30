
import i18n  from '../i18n/index';

const userInfo = {
  avatarUrl:'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
  nickName: 'zzzy',
  phoneNumber: '13438358888',
  gender: 2,
};

const countsData = [
  {
    num: 2,
    name: i18n.t('Membership points'),
    type: 'point',
  },
  {
    num: 10,
    name: i18n.t('Coupons'),
    type: 'coupon',
  },
];

const orderTagInfos = [
  {
    orderNum: 1,
    tabType: 5,
  },
  {
    orderNum: 1,
    tabType: 10,
  },
  {
    orderNum: 1,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: i18n.t('Every Wednesday - Friday: 9:00-12:00  13:00-15:00'),
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = () => ({
  userInfo,
  countsData,
  orderTagInfos,
  customerServiceInfo,
});
