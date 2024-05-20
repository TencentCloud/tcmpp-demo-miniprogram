import{ i18n, lang } from '../../../../i18n/lang';

Page({
  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'packageComponent/pages/view/cover-view/cover-view'
    }
  },

  data: {
    theme: 'light',
    latitude: 23.099994,
    longitude: 113.324520,
  },
  onUnload() {
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  },
  imageLoad(e) {
    console.log('imageLoad', e);
  },
  imageError(e) {
    console.log('imageError', e);
  }
})
