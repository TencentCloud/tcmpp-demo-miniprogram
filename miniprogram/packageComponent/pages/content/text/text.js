import { i18n,lang } from '../../../../i18n/lang'
let texts = []

Page({
  onShareAppMessage() {
    return {
      t: i18n,
      lang,
      title: 'text',
      path: 'packageComponent/pages/content/text/text'
    }
  },

  data: {
    theme: 'light',
    text: '',
    canAdd: true,
    canRemove: false
  },
  extraLine: [],

  add() {
    this.extraLine.push(texts[this.extraLine.length % 12])
    this.setData({
      text: this.extraLine.join('\n'),
      canAdd: this.extraLine.length < 12,
      canRemove: this.extraLine.length > 0
    })
    setTimeout(() => {
      this.setData({
        scrollTop: 99999
      })
    }, 0)
  },
  remove() {
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: this.extraLine.join('\n'),
        canAdd: this.extraLine.length < 12,
        canRemove: this.extraLine.length > 0
      })
    }
    setTimeout(() => {
      this.setData({
        scrollTop: 99999
      })
    }, 0)
  },
  onLoad() {
    texts = [
      i18n['text1'],
      i18n['text2'],
      i18n['text3'],
      i18n['text4'],
      i18n['text5'],
      i18n['text6'],
      i18n['text7'],
      i18n['text8'],
      i18n['text9'],
      i18n['text10'],
      i18n['text11'],
      i18n['text12'],
      '......'
    ]
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
