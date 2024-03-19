import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'label',
      path: 'packageComponent/pages/form/label/label'
    }
  },

  data: {
    theme: 'light',
    checkboxItems: [
      { name: 'USA', value: i18n['checkbox0'] },
      { name: 'CHN', value: i18n['checkbox1'], checked: 'true' }
    ],
    radioItems: [
      { name: 'USA', value: i18n['checkbox0'] },
      { name: 'CHN', value: i18n['checkbox1'], checked: 'true' }
    ],
    hidden: false
  },

  checkboxChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed[`checkboxItems[${i}].checked`] = true
      } else {
        changed[`checkboxItems[${i}].checked`] = false
      }
    }
    this.setData(changed)
  },

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed[`radioItems[${i}].checked`] = true
      } else {
        changed[`radioItems[${i}].checked`] = false
      }
    }
    this.setData(changed)
  },

  tapEvent() {
    log('button to be clicked')
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang,
      checkboxItems: [
        { name: 'USA', value: i18n['checkbox0'] },
        { name: 'CHN', value: i18n['checkbox1'], checked: 'true' }
      ],
      radioItems: [
        { name: 'USA', value: i18n['checkbox0'] },
        { name: 'CHN', value: i18n['checkbox1'], checked: 'true' }
      ]
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
