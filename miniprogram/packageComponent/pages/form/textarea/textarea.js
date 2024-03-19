import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'textarea',
      path: 'packageComponent/pages/form/textarea/textarea'
    }
  },

  data: {
    theme: 'light',
    focus: false
  },

  bindTextAreaBlur(e) {
    log(e.detail.value)
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
