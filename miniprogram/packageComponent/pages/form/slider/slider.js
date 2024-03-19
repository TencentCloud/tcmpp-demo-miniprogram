import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

const pageData = {
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'slider',
      path: 'packageComponent/pages/form/slider/slider'
    }
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
}

for (let i = 1; i < 5; ++i) {
  (function (index) {
    pageData[`slider${index}change`] = function (e) {
      log(`Slider${index} change event occurred, carrying a value of`, e.detail.value)
    }
  }(i))
}

Page(pageData)
