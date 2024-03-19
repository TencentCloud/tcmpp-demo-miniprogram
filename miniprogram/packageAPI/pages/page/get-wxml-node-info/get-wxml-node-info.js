import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['getWXML'],
      path: 'packageAPI/pages/page/get-wxml-node-info/get-wxml-node-info'
    }
  },

  data: {
    theme: 'light',
    metrics: []
  },

  onReady() {
    this.getNodeInfo()
  },

  getNodeInfo() {
    const $ = wx.createSelectorQuery()
    const target = $.select('.target')
    target.boundingClientRect()

    $.exec((res) => {
      const rect = res[0]
      if (rect) {
        const metrics = []
        // eslint-disable-next-line
        for (const key in rect) {
          if (key !== 'id' && key !== 'dataset') {
            const val = rect[key]
            metrics.push({ key, val })
          }
        }
        this.setData({ metrics })
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['getWXML']
    })
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
