import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['share-button1'],
      path: 'packageAPI/pages/api/share-button/share-button'
    }
  },
  handleTapShareButton() {
    if (!((typeof wx.canIUse === 'function') && wx.canIUse('button.open-type.share'))) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['share-button2'],
        content: i18n['share-button3'],
        showCancel: false
      })
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Forward button']
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
