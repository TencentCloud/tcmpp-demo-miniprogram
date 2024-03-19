import{ i18n, lang } from '../../../../i18n/lang';
Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'webview',
      path: 'packageComponent/pages/open/web-view/web-view'
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
  webviewLoad(e) {
    console.log('=====webviewLoad', e)
  },
  webviewError(e) {
    console.log('=====webviewError', e)
  }
})
