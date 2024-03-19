import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Get the invoice and look up',
      path: 'packageAPI/pages/api/choose-invoice-title/choose-invoice-title'
    }
  },

  data: {
    t: i18n,
    lang,
    theme: 'light',
    type: '',
    title: '',
    taxNumber: '',
    companyAddress: '',
    telephone: '',
    bankName: '',
    bankAccount: ''
  },
  chooseInvoiceTitle() {
    wx.chooseInvoiceTitle({
      success: (res) => {
        this.setData({
          type: res.type,
          title: res.title,
          taxNumber: res.taxNumber,
          companyAddress: res.companyAddress,
          telephone: res.telephone,
          bankName: res.bankName,
          bankAccount: res.bankAccount
        })
      },
      fail: (err) => {
        console.error(err)
      }
    })
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
  }
})
