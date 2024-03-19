Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'progress',
      path: 'packageComponent/pages/content/progress/progress'
    }
  },
  onLoad() {
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
