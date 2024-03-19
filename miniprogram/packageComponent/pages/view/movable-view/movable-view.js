import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util';

Page({
  onShareAppMessage() {
    return {
      title: 'movable-view',
      path: 'packageComponent/pages/view/movable-view/movable-view'
    }
  },

  data: {
    t: i18n,
    lang,
    theme: 'light',
    x: 0,
    y: 0,
    scale: 2
  },

  tap() {
    this.setData({
      x: 30,
      y: 30
    })
  },

  tap2() {
    this.setData({
      scale: 3
    })
  },

  onChange(e) {
    log(e.detail)
  },

  onScale(e) {
    log(e.detail)
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
  }
})
