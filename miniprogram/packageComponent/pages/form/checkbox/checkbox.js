import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util';

Page({
  onShareAppMessage() {
    return {
      title: 'checkbox',
      path: 'packageComponent/pages/form/checkbox/checkbox'
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

  checkboxChange(e) {
    log('Checkbox change event occurred, carrying a value of:', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
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
