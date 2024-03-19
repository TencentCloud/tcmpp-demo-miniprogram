import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    theme: 'light',
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    canIUseGetUserProfile: false
  },

  onShareAppMessage() {
    return {
      title: 'button',
      path: 'packageComponent/pages/form/button/button'
    }
  },

  setDisabled() {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  setPlain() {
    this.setData({
      plain: !this.data.plain
    })
  },

  setLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },

  handleContact(e) {
    log(e.detail)
  },

  handleGetPhoneNumber(e) {
    log(e.detail)
  },

  handleOpenSetting(e) {
    log(e.detail.authSetting)
  },

  handleGetUserInfo(e) {
    log('getUserInfo: ', e.detail.userInfo)
  },
  handleGetUserProfile(e) {
    wx.getUserProfile({
      desc: `${i18n['button14']} wx.getUserProfile`, // State the use of the user's personal information, it will be displayed in the pop -up window, please fill in it with caution
      success: (res) => {
        log('wx.getUserProfile: ', res.userInfo)
      }
    })
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
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  }
}

for (let i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function () {
      const key = `${type}Size`
      const changedData = {}
      changedData[key] = this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  }(types[i]))
}

Page(pageObject)
