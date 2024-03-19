import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['system11'],
      path: 'packageAPI/pages/base/system/system',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    systemInfo: '',
    systemInfoSync: '',
    windowInfo: '',
    systemSetting: '',
    systemInfoAsync: '',
    deviceInfo: '',
    appBaseInfo: '',
    appAuthorizeSetting: '',
    rendererUserAgentPromise: '',
    rendererUserAgentInvoke: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['system0']
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
  openSystemBluetoothSetting() {
    wx.openSystemBluetoothSetting({
      success(res) {
        console.log('Successfully navigated to the system Bluetooth settings page ===', res)
      }
    })
  },
  openAppAuthorizeSetting() {
    wx.openAppAuthorizeSetting({
      success(res) {
        console.log('Successfully navigated to the App system authorization management page ===', res)
      }
    })
  },
  getWindowInfo() {
    this.setData({
      windowInfo: JSON.stringify(wx.getWindowInfo())
    })
  },
  getRendererUserAgentPromise() {
    wx.getRendererUserAgent().then(res => {
      this.setData({
        rendererUserAgentPromise: res.userAgent ? JSON.stringify(res.userAgent) : ''
      })
      console.log('userAgent===promise', res)
    })
  },
  getRendererUserAgentInvoke() {
    wx.getRendererUserAgent({
      success: (result) => {
        this.setData({
          rendererUserAgentInvoke: JSON.stringify(result.userAgent)
        })
        console.log('userAgent===invoke', result)
      }
    })
  },
  getDeviceInfo() {
    const deviceInfo = wx.getDeviceInfo()
    this.setData({
      deviceInfo: deviceInfo ? JSON.stringify(deviceInfo) : ''
    })
  },
  getAppBaseInfo() {
    const appBaseInfo = wx.getAppBaseInfo()
    this.setData({
      appBaseInfo: appBaseInfo ? JSON.stringify(appBaseInfo) : ''
    })
  },
  getAppAuthorizeSetting() {
    const appAuthorizeSetting = wx.getAppAuthorizeSetting()
    this.setData({
      appAuthorizeSetting: appAuthorizeSetting ? JSON.stringify(appAuthorizeSetting) : ''
    })
  },
  getSystemSetting() {
    this.setData({
      systemSetting: JSON.stringify(wx.getSystemSetting())
    })
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          systemInfo: JSON.stringify(result)
        })
      }
    })
  },
  getSystemInfoSync() {
    this.setData({
      systemInfoSync: JSON.stringify(wx.getSystemInfoSync())
    })
  },

  getSystemInfoAsync() {
    wx.getSystemInfoAsync({
      success: (res) => {
        this.setData({
          systemInfoAsync: JSON.stringify(res)
        })
      }
    })
  }
})
