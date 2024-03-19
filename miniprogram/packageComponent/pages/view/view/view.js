import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util';

Page({
  data: {
    t: i18n,
    lang,
    theme: 'light'
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
  onShareAppMessage() {
    return {
      title: 'view',
      path: 'packageComponent/pages/view/view/view'
    }
  },
  onReachBottom() {
    log('reach bottom');
  }
})
