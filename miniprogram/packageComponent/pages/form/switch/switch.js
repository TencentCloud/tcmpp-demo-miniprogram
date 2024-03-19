import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'switch',
      path: 'packageComponent/pages/form/switch/switch'
    }
  },

  switch1Change(e) {
    log('Switch1 change event occurred, carrying a value of', e.detail.value)
  },

  switch2Change(e) {
    log('Switch2 change event occurred, carrying a value of', e.detail.value)
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
