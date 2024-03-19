import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['toast0'],
      path: 'packageAPI/pages/page/toast/toast'
    }
  },

  showToast() {
    wx.showToast({
      title: i18n['toast1'],
      mask: false,
      icon: 'success',
      duration: 100000
    })
  },

  hideToast() {
    wx.hideToast()
  },

  enableAlertBeforeUnload() {
    wx.enableAlertBeforeUnload({
      message: i18n['toast2'],
      success: () => {
        wx.showToast({
          title: i18n['toast3'],
          icon: 'none'
        })
      }
    })
  },

  disableAlertBeforeUnload() {
    wx.disableAlertBeforeUnload({
      success: () => {
        wx.showToast({
          title: i18n['toast4'],
          icon: 'none'
        })
      }
    })
  },

  showLoading() {
    wx.showLoading({
      title: 'loading...',
      mask: false,
      success(e) {
        console.log('mini showLoading success', e)
      },
      fail(e) {
        console.log('mini showLoading fail', e)
      },
      complete(e) {
        console.log('mini showLoading complete', e)
      }
    })
  },

  hideLoading() {
    wx.hideLoading({
      success: (res) => {
        console.log('mini hideLoading success', res)
      },
      fail: (res) => {
        console.log('mini hideLoading fail', res)
      },
      complete: (res) => {
        console.log('mini hideLoading complete', res)
      }
    })
  },

  showModal() {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'showModal title',
      content: 'showModal content',
      showCancel: this.data.showCancel,
      cancelColor: '#F836F7',
      confirmColor: '#F836F7',
      success: (res) => {
        console.log('mini showModal success', res)
      },
      fail: (res) => {
        console.log('mini showModal fail', res)
      },
      complete: (res) => {
        console.log('mini showModal complete', res)
      }
    })
  },

  showActionSheet() {
    wx.showActionSheet({
      alertText: 'showActionSheet',
      itemList: ['A', 'B', 'C'],
      itemColor: '#F836F7',
      success: (res) => {
        console.log('mini showActionSheet success', res)
      },
      fail: (res) => {
        console.log('mini showActionSheet fail', res)
      },
      complete: (res) => {
        console.log('mini showActionSheet complete', res)
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['toast7']
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
