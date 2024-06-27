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
      'lin1: text1',
      'lin2: text2',
      'lin3: text3',
      'lin4: text4',
      'lin5: text5',
      'lin6: text6',
      'lin7: text7',
      'lin8: text8',
      'lin9: text9',
      'lin10: text10',
      'lin11: text11',
      'lin12: text12',
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
