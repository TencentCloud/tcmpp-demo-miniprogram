import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';
import i18n from '../../i18n/index';
import { AuthStepType } from './components/user-center-card/status';
import { loginFromServer, login, getUser, logout } from '../../utils/fetch';
const app = getApp();

const menuData = [
  [
    {
      title: i18n.t('Your addresses'),
      tit: '',
      url: '',
      type: 'address',
    },
    {
      title: i18n.t('Coupons'),
      tit: '',
      url: '',
      type: 'coupon',
    },
    {
      title: i18n.t('Membership points'),
      tit: '',
      url: '',
      type: 'point',
    },
  ],
  [
    {
      title: i18n.t('Help'),
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: i18n.t('Service hotline'),
      tit: '',
      url: '',
      type: 'service',
      icon: 'service',
    },
  ],
  [
    {
      title: i18n.t('Logout'),
      tit: '',
      url: '',
      type: 'logout',
    },
  ],
];

const orderTagInfos = [
  {
    title: i18n.t('To pay'),
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: i18n.t('To ship'),
    iconName: 'deliver',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: i18n.t('To receive'),
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: i18n.t('To review'),
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 1,
  },
  {
    title: i18n.t('Returns/Refunds'),
    iconName: 'exchang',
    orderNum: 0,
    tabType: 0,
    status: 1,
  },
];

const getDefaultData = () => ({
  showMakePhone: false,
  lang: app.globalData.lang,
  userInfo: {
    avatarUrl: '',
    nickName: `${i18n.t('Logging in')}...`,
    phoneNumber: '',
  },
  btnText: i18n.t('click Login'),
  menuData,
  isLogin: false,
  loadingLoadingShow: false,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: AuthStepType.ONE,
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
    this.init();
  },
  
  async clickLogin() {
    const me = this;
    const { code } = await wx.login();
    me.setData({
      loadingLoadingShow: true,
    });
    loginFromServer(
      code,
      (account) => {
        wx.showToast({ title: i18n.t('login finish') });
        login(account);
        me.setData(
          {
            loadingLoadingShow: false,
            isLogin: true,
          },
          () => this.init(),
        );
      },
      (msg) => {
        me.setData({
          loadingLoadingShow: false,
        });
        wx.showToast({
          icon: 'error',
          title: msg,
        });
      },
    );
  },
  onPullDownRefresh() {
    this.init();
  },
  init() {
    const usr = getUser();
    if (usr) {
      this.setData({
        isLogin: true,
      });
      this.fetUseriInfoHandle();
    }
  },

  fetUseriInfoHandle() {
    fetchUserCenter().then(({ userInfo, countsData, orderTagInfos: orderInfo, customerServiceInfo }) => {
      // eslint-disable-next-line no-unused-expressions
      menuData?.[0].forEach((v) => {
        countsData.forEach((counts) => {
          if (counts.type === v.type) {
            // eslint-disable-next-line no-param-reassign
            v.tit = counts.num;
          }
        });
      });
      const info = orderTagInfos.map((v, index) => ({
        ...v,
        ...orderInfo[index],
      }));
      userInfo.nickName = getUser();
      this.setData({
        userInfo,
        menuData,
        orderTagInfos: info,
        customerServiceInfo,
        currAuthStep: AuthStepType.TWO, // 已登录
      });
      wx.stopPullDownRefresh();
    });
  },

  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        wx.navigateTo({ url: '/pages/usercenter/address/list/index' });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: i18n.t('You clicked Help'),
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: i18n.t('You clicked Membership points'),
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'coupon': {
        wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
        break;
      }
      case 'logout': {
        //
        wx.showLoading();
        logout();
        this.setData(
          {
            isLogin: false,
            currAuthStep: AuthStepType.ONE,
          },
          () => {
            wx.hideLoading();
            wx.showToast({
              title: i18n.t('logout finish'),
            });
          },
        );
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: i18n.t('Unknown redirection'),
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({ url: '/pages/order/after-service-list/index' });
    } else {
      wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === AuthStepType.TWO) {
      wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
