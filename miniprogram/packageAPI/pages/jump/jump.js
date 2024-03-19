import { i18n,lang } from '../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['Jump'],
      path: 'packageAPI/pages/jump/jump'
    }
  },

  data: {
    theme: 'light',
    setting: {},
    appId: ''
  },

  formInputChange(e) {
    this.setData({
      appId: e.detail.value
    });
  },

  // Open a half-screen mini program
  openhalfscreenminiprogram() {
    if (wx.canIUse('openEmbeddedMiniProgram')) {
      if (!this.data.appId) {
        wx.showToast({
          icon: 'none',
          title: i18n['jump0']
        });
        return;
      }
      wx.openEmbeddedMiniProgram({
        appId: this.data.appId, // Tencent Public Welfare
        extraData: {
          foo: 'bar'
        },
        // envVersion: 'develop',
        success(res) {
          // Successfully opened
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['jump1']
      });
    }
  },

  // Open another mini program
  openanotherminiprogram() {
    if (!this.data.appId) {
      wx.showToast({
        icon: 'none',
        title: i18n['jump2']
      });
      return;
    }
    wx.navigateToMiniProgram({
      appId: this.data.appId,
      extraData: {
        foo: 'bar'
      },
      // envVersion: 'develop',
      success(res) {
        // Successfully opened
      }
    })
  },

  // Return to the previous mini program
  returnminiprogram() {
    wx.navigateBackMiniProgram({
      extraData: {
        foo: 'bar'
      },
      success(res) {
        // Successfully returned
      },
      fail(err) {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['jump3'],
          content: JSON.stringify(err)
        });
      }
    })
  },

  // Exit the current mini program
  exitminiprogram() {
    wx.exitMiniProgram({
      success() {
        wx.showToast({
          title: i18n['jump4'],
          icon: 'none',
          duration: 2000
        })
      },
      fail() {
        wx.showToast({
          title: i18n['jump5'],
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Jump']
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
