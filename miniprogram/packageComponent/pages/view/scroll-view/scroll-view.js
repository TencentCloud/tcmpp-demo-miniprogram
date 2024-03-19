import { i18n, lang } from '../../../../i18n/lang';
import { log } from '../../../../util/util';
const order = ['demo1', 'demo2', 'demo3']

Page({
  data: {
    t: i18n,
    lang,
    theme: 'light',
    toView: 'green',
    triggered: false
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
  },
  onPulling(e) {
    log('onPulling:', e)
  },
  onRefresh() {
    log('=====onRefresh');
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false
      })
      this._freshing = false
    }, 3000)
  },
  onRestore(e) {
    log('onRestore:', e)
  },
  onAbort(e) {
    log('onAbort', e)
  },
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'packageComponent/pages/view/scroll-view/scroll-view'
    }
  },
  upper(e) {
    log(e)
  },

  lower(e) {
    log(e)
  },

  scroll(e) {
    log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
