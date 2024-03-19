import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['wxml0'],
      path: 'packageAPI/pages/wxml/wxml/wxml',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    width: '--',
    height: '--',
    appear: false,
    scrollLeft: 0,
    scrollTop: 0,
    bgColor: '--',
    demo3Visible: false,
    mqo: null
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        console.log('====== Ball state changed', res);
        this.setData({
          appear: res.intersectionRatio > 0
        })
      })

    wx.createIntersectionObserver().relativeToViewport({ bottom: -150 }).observe('#demo3', (res) => {
      this.setData({
        demo3Visible: !this.data.demo3Visible
      })
    })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  },
  selectQuery() {
    const query = wx.createSelectorQuery()
    const el = query.select('#demo1')
    el.boundingClientRect((rect) => {
      this.setData({
        width: rect.width + 'px',
        height: rect.height + 'px'
      })
    }).exec()
  },
  getScrollOffset() {
    wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
      console.log('==== Obtained display area node information', res)
      this.setData({
        scrollLeft: res.scrollLeft, // Horizontal scroll position of the node
        scrollTop: res.scrollTop  // Vertical scroll position of the node
      })
    }).exec()
  },
  getFields() {
    wx.createSelectorQuery().select('#demo3').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['margin', 'backgroundColor'],
      context: true
    }, (res) => {
      console.log('==== Obtained demo3 node information', res)
      this.setData({
        bgColor: res.backgroundColor
      })
    }).exec()
  },
  getCanvas() {
    try {
      const query = wx.createSelectorQuery()
      query.select('#canvas').node().exec((res) => {
        wx.showToast({
          title: i18n['wxml1'],
          icon: 'none',
          mask: true
        })
        console.log('==== Obtained canvas node information', res)
      })
    } catch (error){
      wx.showToast({
        title: i18n['wxml2'],
        icon: 'none',
        mask: true
      })
    }
  },
  getContext() {
    wx.createSelectorQuery().select('#canvas').context(function (res) {
      console.log('====canvas context', res)
      if (res.context) {
        wx.showToast({
          title: i18n['wxml3'],
          icon: 'none',
          mask: true
        })
      }
    }).exec()
  },

  registMediaQueryObserver() {
    const mqo = this.createMediaQueryObserver();
    this.mqo = mqo;
    // console.log('mqo',this.mqo);
    console.log('createMediaQueryObserver', this.mqo);
    this.mqo.observe({ //320*568
      minWidth: 100,
      maxWidth: 500,
      //width:'320',
      //minHeight:400,
      //maxHeight:600,
      //height:568,
      orientation: 'portrait'
    }, (result) => {
      console.log('---res', result);
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['wxml4'],
        content: JSON.stringify(result)
      })
    });
  },
  unRegistMediaQueryObserver() {
    this.mqo.disconnect();
  }
})
