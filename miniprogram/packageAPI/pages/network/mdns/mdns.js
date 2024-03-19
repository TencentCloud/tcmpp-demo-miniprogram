// miniprogram/page/API/pages/mdns/mdns.js
let serviceList = []
let resolveFailList = []
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'mdns',
      path: 'packageAPI/pages/network/mdns/mdns'
    }
  },
  data: {
    serviceList: [],
    resolveFailList: [],
    isStarted: false,
    isListening: true,
    serviceType: ''
  },
  onShow() {
    this.onLocalService()
  },

  serviceTypeChange(e) {
    this.setData({
      serviceType: e.detail.value
    })
  },

  startDiscovery() {
    wx.startLocalServiceDiscovery({
      serviceType: this.data.serviceType || '_http._tcp',
      success: () => {
        console.log('===startLocalServiceDiscovery success===')
        this.setData({
          isStarted: true
        })
        wx.showToast({
          title: i18n['mdns0'],
          icon: 'none',
          duration: 2000
        })
      },
      fail: (err) => {
        wx.showToast({
          title: i18n['mdns1'],
          icon: 'none',
          duration: 2000
        })
        console.log('startLocalServiceDiscovery: fail', err)
      },
      complete: () => {
        console.log('startLocalServiceDiscovery: complete')
      }
    })
  },

  stopDiscovery() {
    wx.stopLocalServiceDiscovery({
      success: () => {
        console.log('===stopLocalServiceDiscovery success===')
        this.setData({
          isStarted: false
        })
        wx.showToast({
          title: i18n['mdns2'],
          icon: 'none',
          duration: 2000
        })
        serviceList = []
        resolveFailList = []
        this.setData({
          serviceList: [],
          resolveFailList: []
        })
      },
      fail: (err) => {
        console.log('stopLocalServiceDiscovery: fail', err)
        wx.showToast({
          title: i18n['mdns3'],
          icon: 'none',
          duration: 2000
        })
      },
      complete: () => {
        console.log('stopLocalServiceDiscovery: complete')
      }
    })
  },


  // Listener list
  onLocalService() {
    this.setData({
      isListening: true
    })
    this.localServiceFoundCb = (obj) => {
      console.log('===onLocalServiceFound===', obj)
      serviceList.push(obj)

      this.setData({
        serviceList
      })
    }
    // Listen for service discovery events
    wx.onLocalServiceFound(this.localServiceFoundCb)

    this.localResolveFailCb = (obj) => {
      console.log('===onLocalServiceResolveFail===', obj)
      resolveFailList.push(obj)
      this.setData({
        resolveFailList
      })
    }
    // Listen for service resolution failure events
    wx.onLocalServiceResolveFail(this.localResolveFailCb)

    this.localServiceLostCb = (obj) => {
      console.log('===onLocalServiceLost===', obj)
    }
    // Listen for service departure
    wx.onLocalServiceLost(this.localServiceLostCb)

    this.localServiceDiscoveryStopCb = () => {
      console.log('Search stop event detected')
      this.setData({
        isStarted: false
      })
    }
    // Listen for search stop
    wx.onLocalServiceDiscoveryStop(this.localServiceDiscoveryStopCb)
  },
  // Cancel listening
  offLocalService() {
    this.setData({
      isListening: false
    })
    console.log('Unsubscribe successful')
    // Cancel listening for service discovery events
    wx.offLocalServiceFound(this.localServiceFoundCb)

    // Cancel listening for service resolution failure events
    wx.offLocalServiceResolveFail(this.localResolveFailCb)

    // Cancel listening for service departure
    wx.offLocalServiceLost(this.localServiceLostCb)

    // Cancel listening for search stop
    wx.offLocalServiceDiscoveryStop(this.localServiceDiscoveryStopCb)
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
  }
})
