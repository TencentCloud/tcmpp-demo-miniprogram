const AB2String = (arrayBuffer) => {
  const unit8Arr = new Uint8Array(arrayBuffer)
  const encodedString = String.fromCharCode.apply(null, unit8Arr)
  const decodedString = decodeURIComponent(escape((encodedString)))// Without this step, Chinese will be garbled
  return decodedString
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'UDPSocket',
      path: 'packageAPI/pages/network/udp-socket/udp-socket'
    }
  },
  data: {
    theme: 'light',
    ip: undefined,
    port: undefined,
    startUDP: false,
    mode: 'local',
    address: 'localhost',
    canIUse: true,
    isOnMessage: true,
    isOnError: true,
    isOnConnecting: true,
    isOnClose: true,
    isOnBound: false,
    hasConnected: false,
    isAndroid: wx.getSystemInfoSync()?.platform === 'android',
  },
  onLoad() {
    this.setData({
      t: i18n,
    lang,
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

    this.messageCb = (res) => {
      console.log('===onMessage listener===', res)
      const { remoteInfo } = res
      if (remoteInfo) {
        wx.showModal({
  confirmText: i18n['confirm'],
  cancelText: i18n['cancel'],
          title: `IP:${remoteInfo.address}${i18n['tcp0']}`,
          content: AB2String(res.message),
        })
      }
    };

    this.errorCb = (res) => {
      console.log('===onError listener===', res)
    };

    this.listeningCb = (res) => {
      console.log('===onListening listener===', res)
    };

    this.closeCb = (res) => {
      console.log('===onClose listener===', res)
      this.setData({
        hasConnected: false
      })
    };

    this.connectCb = (res) => {
      console.log('===onConnect listener===', res)
      this.setData({
        hasConnected: true
      })
    };

    this.bindWifiCb = (res) => {
      console.log('===bind wifi listener===', res)
    };
  },
  handleCreateTCPTap() {
    try {
      this.TCPSocket = wx.createTCPSocket()
      console.log('===TCPSocket', this.TCPSocket)
      if (!this.TCPSocket) {
        wx.showToast({
          icon: 'none',
          title: i18n['tcp1'],
        })
        return
      }
      this.setData({
        startTCP: true,
      })
      this.TCPSocket.onMessage(this.messageCb)
      this.TCPSocket.onError(this.errorCb)
      this.TCPSocket.onClose(this.closeCb)
      this.TCPSocket.onConnect(this.connectCb)
      this.data.isAndroid && this.TCPSocket.onBindWifi(this.bindWifiCb)
    } catch (err) {
      console.log('===catch error', err)
      wx.showToast({
        icon: 'none',
        title: JSON.stringify(err),
      })
    }
  },

  ipChange(e) {
    console.log('===ip change===', e)
    this.setData({
      ip: e.detail.value
    })
  },

  portChange(e) {
    console.log('===port change===', e)
    this.setData({
      port: e.detail.value
    })
  },

  handleConnect() {
    const { ip, port } = this.data
    if (!ip || !port) {
      wx.showToast({
        icon: 'none',
        title: i18n['tcp2']
      })
      return
    }
    console.log(`connect ip: ${ip}，port: ${port}`)
    this.TCPSocket.connect({
      address: ip,
      port: port,
    })
  },

  handleWrite() {
    this.TCPSocket.write('hello, how are you?')
  },

  handleClose() {
    this.TCPSocket.close()
    this.setData({
      hasConnected: false
    })
  },

  handleBindWifi() {
    wx.startWifi({
      success: async () => {
        await wx.getConnectedWifi({
          success: ({ wifi }) => {
            console.log('====wifi', wifi)
            if (wifi.BSSID) {
              this.TCPSocket.bindWifi({
                BSSID: wifi.BSSID
              })
            } else {
              console.log('====BSSID not exist')
            }
          }
        })
      },
      fail: (err) => {
        console.log('===startWifi fail===', err)
      }
    })
  },

  toggleMessage() {
    if (this.data.isOnMessage) {
      this.TCPSocket.offMessage(this.messageCb)
    } else {
      this.TCPSocket.onMessage(this.messageCb)
    }
    this.setData({
      isOnMessage: !this.data.isOnMessage
    })
  },

  toggleError() {
    if (this.data.isOnError) {
      this.TCPSocket.offError(this.errorCb)
    } else {
      this.TCPSocket.onError(this.errorCb)
    }
    this.setData({
      isOnError: !this.data.isOnError
    })
  },

  toggleConnecting() {
    if (this.data.isOnConnecting) {
      this.TCPSocket.offConnect(this.connectCb)
    } else {
      this.TCPSocket.offConnect(this.connectCb)
    }
    this.setData({
      isOnConnecting: !this.data.isOnConnecting
    })
  },

  toggleClose() {
    if (this.data.isOnClose) {
      this.TCPSocket.offClose(this.closeCb)
    } else {
      this.TCPSocket.onClose(this.closeCb)
    }
    this.setData({
      isOnClose: !this.data.isOnClose
    })
  },

  toggleBoundWifi() {
    if (this.data.isOnBound) {
      this.TCPSocket.offBindWifi(this.bindWifiCb)
    } else {
      this.TCPSocket.onBindWifi(this.bindWifiCb)
    }
    this.setData({
      isOnBound: !this.data.isOnBound
    })
  },
})
