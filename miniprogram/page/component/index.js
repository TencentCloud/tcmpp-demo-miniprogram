import { i18n, lang, changeLang } from '../../i18n/lang'
import { log } from "../../util/util"
const appInst = getApp();

Page({
  toggleLocale() {
    changeLang();
    this.init();
  },
  onShow() {
    log('demo getApp=>', appInst)
    // wx.reportAnalytics('enter_home_programmatically', {})
    if (wx.canIUse('getExptInfoSync')) {
      log('getExptInfoSync expt_args_1', wx.getExptInfoSync(['expt_args_1']))
      log('getExptInfoSync expt_args_2', wx.getExptInfoSync(['expt_args_2']))
      log('getExptInfoSync expt_args_3', wx.getExptInfoSync(['expt_args_3']))
    }
    if (wx.canIUse('reportEvent') && wx.getSystemInfoSync().brand !== 'devtools') {
      wx.reportEvent('expt_event_1', { expt_data: 1 })
      wx.reportEvent('expt_event_2', { expt_data: 5 })
      wx.reportEvent('expt_event_3', { expt_data: 9 })
      wx.reportEvent('expt_event_4', { expt_data: 200 })
      wx.reportEvent('weexpt_event_key_1', { option_1: 1, option_2: 10, option_str_1: 'abc' })
      wx.reportEvent('weexpt_event_key_1', { option_1: 'abc', option_2: '1000', option_str_1: '1' })
    }
  },
  init() {
    const newList = [
      {
        id: 'view',
        name: i18n['viewBox'],
        open: false,
        pages: [
          'view', 'scroll-view', 'swiper', 'movable-view', 'cover-image'
          // 'cover-view', 
        ]
      }, {
        id: 'content',
        name: i18n['basicContent'],
        open: false,
        pages: ['text', 'icon', 'progress', 'rich-text']
      }, {
        id: 'form',
        name: i18n['FormComponent'],
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea', 'editor']
      }, {
        id: 'nav',
        name: i18n['navigation'],
        open: false,
        pages: ['navigator']
      }, {
        id: 'media',
        name: i18n['MediaComponent'],
        open: false,
        pages: ['image', 'video', 'camera', 'live-pusher', 'live-player', 'animation-video']
      }, {
        id: 'map',
        name: i18n['map'],
        open: false,
        pages: [
          'map'
        ]
      }, {
        id: 'canvas',
        name: i18n['canvas'],
        open: false,
        pages: [
          'canvas-2d',
          'canvas-2d-new'
          // 'webgl'
        ]
      }, {
        id: 'open',
        name: i18n['OpenAbility'],
        open: false,
        pages: [
          // 'ad',
          // 'open-data',
          'web-view',
          'external-element',
          'invoke-native-plugin'
        ]
      }
      // {
      //   id: 'obstacle-free',
      //   name: 'Accessible Access',
      //   open: false,
      //   pages: ['aria-component']
      // }
    ];
    wx.setNavigationBarTitle({
      title: i18n['title1']
    })
    wx.setTabBarItem({
      index: 0,
      text: i18n['component']
    })
    wx.setTabBarItem({
      index: 1,
      text: i18n['interface']
    })
    wx.setTabBarItem({
      index: 2,
      text: i18n['more']
    })
    this.setData({
      t: i18n,
      lang,
      list: newList
    })
  },
  onShareAppMessage() {
    return {
      title: i18n['title'],
      path: 'page/component/index'
    }
  },
  onShareTimeline() {
    i18n['title']
  },
  data: {
    list: [],
    t: i18n,
    lang,
    switch1Checked: lang === 'en_US',
    theme: 'light',
    docUrl: encodeURIComponent('https://cloud.tencent.com/document/product/1593/92865')
  },
  onLoad() {
    this.init();
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    // wx.reportAnalytics('click_view_programmatically', {})
  }
})
