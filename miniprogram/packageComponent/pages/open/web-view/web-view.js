import { log } from '../../../../util/util'
import { webViewUrl } from '../../../../config';

Page({
  data: {
    theme: 'light',
    src: ""
  },
  onShareAppMessage() {
    return {
      title: 'webview',
      path: 'packageComponent/pages/open/web-view/web-view'
    }
  },
  onLoad(opt) {
    // console.log("参数---------------", opt)
    this.setData({
      src: webViewUrl
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },
  webviewLoad(e) {
    log('-------webviewLoad', e)
  },
  webviewError(e) {
    log('-------webviewError', e)
  }
})
