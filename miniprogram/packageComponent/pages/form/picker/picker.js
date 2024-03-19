import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'picker',
      path: 'packageComponent/pages/form/picker/picker'
    }
  },

  data: {
    theme: 'light',
    array: [i18n['checkbox0'], i18n['checkbox1'], i18n['checkbox2'], i18n['checkbox3']],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },

  bindPickerChange(e) {
    log('Picker sending selection changes, the carrying value is', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang,
      array: [i18n['checkbox0'], i18n['checkbox1'], i18n['checkbox2'], i18n['checkbox3']]
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
