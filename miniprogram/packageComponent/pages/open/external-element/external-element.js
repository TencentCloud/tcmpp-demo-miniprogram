import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'external-element',
      path: 'packageComponent/pages/open/external-element/external-element'
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['external5']
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

    this.initCtx();
  },
  initCtx() {
    this.ctx = wx.createExternalElementContext('comp1');
    this.ctx2 = wx.createExternalElementContext('comp2');
    log('==== ctx Same-layer instance ====', this.ctx);
    log('==== ctx2 Non-same-layer instance ====', this.ctx2);
  },
  eventHandle(e) {
    log('==== bindExternalElementEvent Same-layer listening to native callbacks ====', e);
  },
  eventHandle2(e) {
    log('==== bindExternalElementEvent2 Non-same-layer listening to native callbacks ====', e);
  },
  opt() {
    log('==== opt Same-layer click operation ====')
    this.ctx.call({
      params1: {
        name: 'name1',
        age: 11
      },
      params2: {
        name: 'name2',
        age: 22
      },
      success: (e) => {
        log('==== operate success Same-layer operation success callback ====', e)
      },
      fail: (e) => {
        log('==== operate fail Same-layer operation failure callback ====', e)
      },
      complete: (e) => {
        log('==== operate complete Same-layer operation completion callback ====', e)
      }
    })
  },
  opt2() {
    log('==== opt2 Non-same-layer click operation ====')
    this.ctx2.call({
      params1: {
        name: 'name1',
        age: 11
      },
      params2: {
        name: 'name2',
        age: 22
      },
      success: (e) => {
        log('==== operate success Non-same-layer operation success callback ====', e)
      },
      fail: (e) => {
        log('==== operate fail Non-same-layer operation failure callback ====', e)
      },
      complete: (e) => {
        log('==== operate complete Non-same-layer operation completion callback ====', e)
      }
    })
  }
})
