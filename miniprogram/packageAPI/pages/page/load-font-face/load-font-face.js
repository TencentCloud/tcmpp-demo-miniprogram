import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['loadFontFace0'],
      path: 'packageAPI/pages/media/load-font-face/load-font-face'
    }
  },

  data: {
    theme: 'light',
    fontFamily: 'Bitstream Vera Serif Bold',
    loaded: false
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['loadFontFace0']
    })
    this.setData({
      t: i18n,
      lang,
      loaded: false
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  loadFontFace() {
    const self = this
    wx.loadFontFace({
      family: this.data.fontFamily,
      source: 'url("https://fonts.gstatic.com/s/inconsolata/v31/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WR32l3WdycuJDA.woff2")',
      success(res) {
        console.log('loadFontSuccess===', res)
        self.setData({ loaded: true })
      },
      fail(res) {
        console.log('loadFontFail===', res)
      },
      complete(res) {
        console.log('loadFontComplete===', res)
      }
    })
  },

  clear() {
    this.setData({ loaded: false })
  }
})
