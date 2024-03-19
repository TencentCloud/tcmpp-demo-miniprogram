import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['clipboard0'],
      path: 'packageAPI/pages/device/clipboard-data/clipboard-data'
    }
  },
  onShareTimeline() {
    return {
      title: i18n['clipboard0']
    }
  },

  data: {
    theme: 'light',
    value: 'edit and copy me',
    pasted: ''
  },

  valueChanged(e) {
    this.setData({
      value: e.detail.value
    })
  },

  copy() {
    wx.setClipboardData({
      data: this.data.value,
      success() {
        wx.showToast({
          title: i18n['clipboard1'],
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  paste() {
    const self = this
    wx.getClipboardData({
      success(res) {
        self.setData({
          pasted: res.data
        })
        wx.showToast({
          title: i18n['clipboard2'],
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['clipboard0']
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
