import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['common3'],
      path: 'packageAPI/pages/base/common/common',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    envInfo: '',
    canIUseInfo: '',
    base64: '5L2g5aW977yMVE1G',
    base64ToArrayBuffer: [],
    arrayBufferToBase64: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['common0']
    })
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

  },

  check() {
    const info = wx.env;
    this.setData({
      envInfo: JSON.stringify(info)
    });
  },

  canIUse() {
    const result = {
      'scroll-view': wx.canIUse('scroll-view'),
      'scroll-view.scroll-x': wx.canIUse('scroll-view.scroll-x'),
      'scroll-view.scroll-y': wx.canIUse('scroll-view.scroll-y'),
      'scroll-view.upper-threshold': wx.canIUse('scroll-view.upper-threshold'),
      'scroll-view.lower-threshold': wx.canIUse('scroll-view.lower-threshold'),
      'scroll-view.scroll-top': wx.canIUse('scroll-view.scroll-top'),
      'scroll-view.scroll-left': wx.canIUse('scroll-view.scroll-left'),
      'scroll-view.scroll-into-view': wx.canIUse('scroll-view.scroll-into-view'),
      'scroll-view.scroll-with-animation': wx.canIUse('scroll-view.scroll-with-animation'),
      'scroll-view.enable-back-to-top': wx.canIUse('scroll-view.enable-back-to-top'),
      'scroll-view.bindscrolltoupper': wx.canIUse('scroll-view.bindscrolltoupper'),
      'scroll-view.bindscrolltolower': wx.canIUse('scroll-view.bindscrolltolower'),
      'scroll-view.bindscroll': wx.canIUse('scroll-view.bindscroll'),
      'scroll-view.bindrefresherpulling': wx.canIUse('scroll-view.bindrefresherpulling'),
      'scroll-view.bindrefresherrefresh': wx.canIUse('scroll-view.bindrefresherrefresh'),
      'scroll-view.bindrefresherrestore': wx.canIUse('scroll-view.bindrefresherrestore'),
      'scroll-view.bindrefresherabort': wx.canIUse('scroll-view.bindrefresherabort'),

      'swiper': wx.canIUse('swiper'),
      'swiper.indicator-dots': wx.canIUse('swiper.indicator-dots'),
      'swiper.indicator-color': wx.canIUse('swiper.indicator-color'),
      'swiper.indicator-active-color': wx.canIUse('swiper.indicator-active-color'),
      'swiper.autoplay': wx.canIUse('swiper.autoplay'),
      'swiper.current': wx.canIUse('swiper.current'),
      'swiper.interval': wx.canIUse('swiper.interval'),
      'swiper.duration': wx.canIUse('swiper.duration'),
      'swiper.circular': wx.canIUse('swiper.circular'),
      'swiper.vertical': wx.canIUse('swiper.vertical'),
      'swiper.previous-margin': wx.canIUse('swiper.previous-margin'),
      'swiper.next-margin': wx.canIUse('swiper.next-margin'),
      'swiper.snap-to-edge': wx.canIUse('swiper.snap-to-edge'),
      'swiper.display-multiple-items': wx.canIUse('swiper.display-multiple-items'),
      'swiper.bindchange': wx.canIUse('swiper.bindchange'),
      'swiper.bindanimationfinish': wx.canIUse('swiper.bindanimationfinish'),

      'view': wx.canIUse('view'),
      'view.hover-class': wx.canIUse('view.hover-class'),
      'view.hover-stop-propagation': wx.canIUse('view.hover-stop-propagation'),
      'view.hover-start-time': wx.canIUse('view.hover-start-time'),
      'view.hover-stay-time': wx.canIUse('view.hover-stay-time'),

      'page-container': wx.canIUse('page-container'),
      'page-container.show': wx.canIUse('page-container.show'),
      'page-container.duration': wx.canIUse('page-container.duration'),
      'page-container.z-index': wx.canIUse('page-container.z-index'),
      'page-container.overlay': wx.canIUse('page-container.overlay'),
      'page-container.position': wx.canIUse('page-container.position'),
      'page-container.round': wx.canIUse('page-container.round'),
      'page-container.close-on-slideDown': wx.canIUse('page-container.close-on-slideDown'),
      'page-container.overlay-style': wx.canIUse('page-container.overlay-style'),
      'page-container.custom-style': wx.canIUse('page-container.custom-style'),
      'page-container.bind:beforeenter': wx.canIUse('page-container.bind:beforeenter'),
      'page-container.bind:enter': wx.canIUse('page-container.bind:enter'),
      'page-container.bind:afterenter': wx.canIUse('page-container.bind:afterenter'),
      'page-container.bind:beforeleave': wx.canIUse('page-container.bind:beforeleave'),
      'page-container.bind:leave': wx.canIUse('page-container.bind:leave'),
      'page-container.bind:afterleave': wx.canIUse('page-container.bind:afterleave'),
      'page-container.bind:clickoverlay': wx.canIUse('page-container.bind:clickoverlay'),

      'icon': wx.canIUse('icon'),
      'icon.type': wx.canIUse('icon.type'),
      'icon.size': wx.canIUse('icon.size'),
      'icon.color': wx.canIUse('icon.color'),

      'text': wx.canIUse('text'),
      'text.selectable': wx.canIUse('text.selectable'),
      'text.user-select': wx.canIUse('text.user-select'),
      'text.space': wx.canIUse('text.space'),
      'text.space.ensp': wx.canIUse('text.space.ensp'),
      'text.space.emsp': wx.canIUse('text.space.emsp'),
      'text.space.nbsp': wx.canIUse('text.space.nbsp'),
      'text.decode': wx.canIUse('text.decode'),

      'button': wx.canIUse('button'),
      'button.size': wx.canIUse('button.size'),
      'button.size.default': wx.canIUse('button.size.default'),
      'button.size.mini': wx.canIUse('button.size.mini'),
      'button.type': wx.canIUse('button.type'),
      'button.type.primary': wx.canIUse('button.type.primary'),
      'button.type.default': wx.canIUse('button.type.default'),
      'button.type.warn': wx.canIUse('button.type.warn'),
      'button.plain': wx.canIUse('button.plain'),
      'button.hover-class': wx.canIUse('button.hover-class'),

      'getSystemInfo': wx.canIUse('getSystemInfo'),
      'getSystemInfo.success': wx.canIUse('getSystemInfo.success'),
      'getSystemInfo.success.brand': wx.canIUse('getSystemInfo.success.brand'),

      'getSystemInfoSync': wx.canIUse('getSystemInfoSync'),
      'getLaunchOptionsSync': wx.canIUse('getLaunchOptionsSync'),
      'getEnterOptionsSync': wx.canIUse('getEnterOptionsSync'),

      'setEnableDebug': wx.canIUse('setEnableDebug'),
      'setEnableDebug.object.enableDebug': wx.canIUse('setEnableDebug.object.enableDebug'),
      'setEnableDebug.success': wx.canIUse('setEnableDebug.success'),

      'makePhoneCall': wx.canIUse('makePhoneCall'),
      'makePhoneCall.object.phoneNumber': wx.canIUse('makePhoneCall.object.phoneNumber'),
      'makePhoneCall.success': wx.canIUse('makePhoneCall.success'),

      'scanCode': wx.canIUse('scanCode'),
      'scanCode.object.onlyFromCamera': wx.canIUse('scanCode.object.onlyFromCamera'),
      'scanCode.object.scanType': wx.canIUse('scanCode.object.scanType'),
      'scanCode.object.scanType.barCode': wx.canIUse('scanCode.object.scanType.barCode'),
      'scanCode.object.scanType.qrCode': wx.canIUse('scanCode.object.scanType.qrCode'),
      'scanCode.object.scanType.datamatrix': wx.canIUse('scanCode.object.scanType.datamatrix'),
      'scanCode.object.scanType.pdf417': wx.canIUse('scanCode.object.scanType.pdf417'),
      'scanCode.success': wx.canIUse('scanCode.success'),

      'getShareInfo': wx.canIUse('getShareInfo'),
      'getShareInfo.object.shareTicket': wx.canIUse('getShareInfo.object.shareTicket'),
      'getShareInfo.object.timeout': wx.canIUse('getShareInfo.object.timeout'),
      'getShareInfo.success': wx.canIUse('getShareInfo.success'),

      'setStorageSync': wx.canIUse('setStorageSync'),

      'setStorage': wx.canIUse('setStorage'),
      'setStorage.object.key': wx.canIUse('setStorage.object.key'),
      'setStorage.object.data': wx.canIUse('setStorage.object.data'),
      'setStorage.object.encrypt': wx.canIUse('setStorage.object.encrypt'), // Not supported2.*
      'setStorage.success': wx.canIUse('setStorage.success'),

      'getStorage': wx.canIUse('getStorage'),
      'getStorage.object.key': wx.canIUse('getStorage.object.key'),
      'getStorage.object.encrypt': wx.canIUse('getStorage.object.encrypt'), // Not supported2.
      'getStorage.success': wx.canIUse('getStorage.success'),

      'getStorageSync': wx.canIUse('getStorageSync'),

      'getStorageInfoSync': wx.canIUse('getStorageInfoSync'),
      'getStorageInfoSync.return.keys': wx.canIUse('getStorageInfoSync.return.keys'),
      'getStorageInfoSync.return.currentSize': wx.canIUse('getStorageInfoSync.return.currentSize'),
      'getStorageInfoSync.return.limitSize': wx.canIUse('getStorageInfoSync.return.limitSize'),

      'removeStorageSync': wx.canIUse('removeStorageSync'),
      'clearStorageSync': wx.canIUse('clearStorageSync'),
      'clearStorage': wx.canIUse('clearStorage'),
      'clearStorage.success': wx.canIUse('clearStorage.success'),

      'removeStorage': wx.canIUse('removeStorage'),
      'removeStorage.object.key': wx.canIUse('removeStorage.object.key'),
      'removeStorage.success': wx.canIUse('removeStorage.success'),

      'getLocation': wx.canIUse('getLocation'),
      'getLocation.object.type': wx.canIUse('getLocation.object.type'),
      'getLocation.object.altitude': wx.canIUse('getLocation.object.altitude'),
      'getLocation.object.isHighAccuracy': wx.canIUse('getLocation.object.isHighAccuracy'),
      'getLocation.object.highAccuracyExpireTime': wx.canIUse('getLocation.object.highAccuracyExpireTime'),
      'getLocation.success': wx.canIUse('getLocation.success'),

      'chooseImage': wx.canIUse('chooseImage'),
      'chooseImage.object.count': wx.canIUse('chooseImage.object.count'),
      'chooseImage.object.sizeType': wx.canIUse('chooseImage.object.sizeType'),
      'chooseImage.object.sizeType.original': wx.canIUse('chooseImage.object.sizeType.original'),
      'chooseImage.object.sizeType.compressed': wx.canIUse('chooseImage.object.sizeType.compressed'),
      'chooseImage.object.sourceType': wx.canIUse('chooseImage.object.sourceType'),
      'chooseImage.object.sourceType.album': wx.canIUse('chooseImage.object.sourceType.album'),
      'chooseImage.object.sourceType.camera': wx.canIUse('chooseImage.object.sourceType.camera'),
      'chooseImage.success': wx.canIUse('chooseImage.success'),

      'setNavigationBarTitle': wx.canIUse('setNavigationBarTitle'),
      'setNavigationBarTitle.object.title': wx.canIUse('setNavigationBarTitle.object.title'),
      'setNavigationBarTitle.success': wx.canIUse('setNavigationBarTitle.success'),

      'showTabBar': wx.canIUse('showTabBar'),
      'showTabBar.object.animation': wx.canIUse('showTabBar.object.animation'),
      'showTabBar.success': wx.canIUse('showTabBar.success'),

      'hideTabBar': wx.canIUse('hideTabBar'),
      'hideTabBar.object.animation': wx.canIUse('hideTabBar.object.animation'),
      'hideTabBar.success': wx.canIUse('hideTabBar.success'),

      'setTabBarStyle': wx.canIUse('setTabBarStyle'),
      'setTabBarStyle.object.color': wx.canIUse('setTabBarStyle.object.color'),
      'setTabBarStyle.object.selectedColor': wx.canIUse('setTabBarStyle.object.selectedColor'),
      'setTabBarStyle.object.backgroundColor': wx.canIUse('setTabBarStyle.object.backgroundColor'),
      'setTabBarStyle.object.borderStyle': wx.canIUse('setTabBarStyle.object.borderStyle'),
      'setTabBarStyle.success': wx.canIUse('setTabBarStyle.success'),

      'setTabBarItem': wx.canIUse('setTabBarItem'),
      'setTabBarItem.object.index': wx.canIUse('setTabBarItem.object.index'),
      'setTabBarItem.object.text': wx.canIUse('setTabBarItem.object.text'),
      'setTabBarItem.object.iconPath': wx.canIUse('setTabBarItem.object.iconPath'),
      'setTabBarItem.object.selectedIconPath': wx.canIUse('setTabBarItem.object.selectedIconPath'),
      'setTabBarItem.success': wx.canIUse('setTabBarItem.success')
    };
    this.setData({
      canIUseInfo: JSON.stringify(result)
    });
  },

  getArrayBuffer() {
    const arrayBuffer = wx.base64ToArrayBuffer(this.data.base64)
    this.setData({
      base64ToArrayBuffer: arrayBuffer
    });
    console.log('base64ToArrayBuffer===', arrayBuffer)
  },

  getBase64() {
    if (!this.data.base64ToArrayBuffer) {
      wx.showToast({
        title: i18n['common4']
      })
    }

    this.setData({
      arrayBufferToBase64: wx.arrayBufferToBase64(this.data.base64ToArrayBuffer)
    })
  }
})
