import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['soter0'],
      path: 'packageAPI/pages/api/soter-authentication/soter-authentication'
    }
  },

  startAuth() {
    const startSoterAuthentication = () => {
      wx.startSoterAuthentication({
        authContent: i18n['soter1'],
        success: () => {
          console.log('startSoterAuthentication success')
          wx.showToast({
            title: i18n['soter2']
          })
        },
        fail: (err) => {
          console.log('startSoterAuthentication fail')
          console.error(err)
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['soter3'],
            content: i18n['soter4'],
            showCancel: false
          })
        }
      })
    }

    const checkIsEnrolled = () => {
      wx.checkIsSoterEnrolledInDevice({
        success: (res) => {
          console.log(res)
          if (!res.isEnrolled) {
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              title: i18n['soter5'],
              content: i18n['soter6'],
              showCancel: false
            })
            return
          }
          startSoterAuthentication()
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }

    const notSupported = () => {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['soter7'],
        content: i18n['soter8'],
        showCancel: false
      })
    }

    wx.checkIsSupportSoterAuthentication({
      success: () => {
        console.log('checkIsSupportSoterAuthentication success')
        checkIsEnrolled()
      },
      fail: () => {
        console.log('checkIsSupportSoterAuthentication fail')
        notSupported()
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Biological certification']
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
