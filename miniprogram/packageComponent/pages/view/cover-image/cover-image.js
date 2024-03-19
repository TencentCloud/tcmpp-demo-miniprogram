import { i18n, lang } from '../../../../i18n/lang';
import { log } from '../../../../util/util';

Page({
  onShareAppMessage() {
    return {
      title: 'cover-image',
      path: 'packageComponent/pages/view/cover-image/cover-image'
    }
  },

  data: {
    theme: 'light',
    latitude: 23.099994,
    longitude: 113.324520,
    imageUrl: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/newyinyue-03ecd1e9b9.png'
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
  imageLoad(e) {
    log('imageLoad', e);
  },
  imageError(e) {
    log('imageError', e);
  }
})
