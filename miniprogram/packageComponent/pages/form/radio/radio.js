import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'packageComponent/pages/form/radio/radio'
    }
  },

  data: {
    theme: 'light',
    items: [
      { value: 'USA', name: i18n['checkbox0'] },
      { value: 'CHN', name: i18n['checkbox1'], checked: 'true' },
      { value: 'BRA', name: i18n['checkbox2'] },
      { value: 'JPN', name: i18n['checkbox3'] },
      { value: 'ENG', name: i18n['checkbox4'] },
      { value: 'FRA', name: i18n['checkbox5'] }
    ]
  },

  radioChange(e) {
    log('Radio change event occurred, carrying a value of:', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang,
      items: [
        { value: 'USA', name: i18n['checkbox0'] },
        { value: 'CHN', name: i18n['checkbox1'], checked: 'true' },
        { value: 'BRA', name: i18n['checkbox2'] },
        { value: 'JPN', name: i18n['checkbox3'] },
        { value: 'ENG', name: i18n['checkbox4'] },
        { value: 'FRA', name: i18n['checkbox5'] }
      ]
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
