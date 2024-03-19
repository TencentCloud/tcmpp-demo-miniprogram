import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['menuBounding1'],
      path: 'packageAPI/pages/page/menu-bounding/menu-bounding'
    }
  },

  actionSheetTap() {
    const res = wx.getMenuButtonBoundingClientRect();
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['menuBounding2'],
      content: JSON.stringify(res)
    });
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['menuBounding0']
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
  },

  onShow() {
    wx.nextTick(() => {
      wx.showToast({
        icon: 'none',
        title: i18n['menuBounding3']
      })
    })
  }
})
