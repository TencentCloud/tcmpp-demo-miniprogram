const AB2String = (arrayBuffer) => {
  const unit8Arr = new Uint8Array(arrayBuffer)
  const encodedString = String.fromCharCode.apply(null, unit8Arr)
  const decodedString = decodeURIComponent(escape((encodedString)))// Without this step, Chinese characters may be garbled
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
    port: undefined,
    remote_port: undefined,
    inputPort: undefined,
    inputRemotePort: undefined,
    startUDP: false,
    mode: 'local',
    address: 'localhost',
    canIUse: true,
    isOnMessage: true,
    isOnError: true,
    isOnListening: true,
    isOnClose: true,
    ttl: 0
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
    // const canIUse = wx.canIUse('createUDPSocket')
    // if (!canIUse) {
    //   wx.showModal({
    //     title: 'WeChat version is too low, this feature is not supported temporarily'
    //   })
    //   this.setData({
    //     canIUse,
    //   })
    // }

    this.messageCb = (res) => {
      console.log('===onMessage listener===', res)
      const { remoteInfo } = res
      console.log(res)
      if (remoteInfo) {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: `IP:${remoteInfo.address}${i18n['udp0']}`,
          content: AB2String(res.message)
        })
      }
    };

    this.localMessageCb = (res) => {
      console.log('===localMessageCb listener===', res)
      const { remoteInfo } = res
      console.log(res)
      if (remoteInfo) {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: `IP:${remoteInfo.address}${i18n['udp0']}`,
          content: AB2String(res.message)
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
    };
  },
  handlePortChange(e) {
    this.setData({
      inputPort: e.detail.value
    })
  },
  handleRemotePortChange(e) {
    this.setData({
      inputRemotePort: e.detail.value
    })
  },
  handleCreateUDPTap() {
    this.UDPSocket = wx.createUDPSocket()
    this.remoteUDPSocket = wx.createUDPSocket()
    this.port = this.data.inputPort ? this.UDPSocket.bind(Number(this.data.inputPort)) : this.UDPSocket.bind()
    this.remote_port = this.data.inputRemotePort ? this.remoteUDPSocket.bind(Number(this.data.inputRemotePort)) : this.remoteUDPSocket.bind()
    this.setData({
      port: this.port,
      remote_port: this.remote_port,
      startUDP: true
    })
    this.UDPSocket.onMessage(this.localMessageCb)
    this.remoteUDPSocket.onMessage(this.messageCb)
    this.remoteUDPSocket.onError(this.errorCb)
    this.remoteUDPSocket.onListening(this.listeningCb)
    this.remoteUDPSocket.onClose(this.closeCb)
  },

  toggleMessage() {
    if (this.data.isOnMessage) {
      this.remoteUDPSocket.offMessage(this.messageCb)
    } else {
      this.remoteUDPSocket.onMessage(this.messageCb)
    }
    this.setData({
      isOnMessage: !this.data.isOnMessage
    })
  },

  toggleError() {
    if (this.data.isOnError) {
      this.remoteUDPSocket.offError(this.errorCb)
    } else {
      this.remoteUDPSocket.onError(this.errorCb)
    }
    this.setData({
      isOnError: !this.data.isOnError
    })
  },

  toggleListening() {
    if (this.data.isOnListening) {
      this.remoteUDPSocket.offListening(this.listeningCb)
    } else {
      this.remoteUDPSocket.onListening(this.listeningCb)
    }
    this.setData({
      isOnListening: !this.data.isOnListening
    })
  },

  toggleClose() {
    if (this.data.isOnClose) {
      this.remoteUDPSocket.offClose(this.closeCb)
    } else {
      this.remoteUDPSocket.onClose(this.closeCb)
    }
    this.setData({
      isOnClose: !this.data.isOnClose
    })
  },

  handleCloseUDPTap() {
    this.setData({
      startUDP: false,
      mode: 'local'
    })
    console.log(this.data)
    this.UDPSocket.close()
    this.remoteUDPSocket.close()
  },
  handleSendRemoteMessage() {
    this.UDPSocket.send({
      address: this.data.address || 'localhost', // It can be any IP and domain name
      port: this.remote_port,
      message: `port[${this.port}] ${i18n['udp1']} remote-port[${this.remote_port}] ${i18n['udp2']}: Hello Wechat!`
    })
  },
  handleConnectRemote() {
    if (!this.data.remoteConnectPort) {
      wx.showToast({
        icon: 'none',
        title: i18n['udp3']
      })
      return;
    }
    this.remoteUDPSocket.connect({
      address: this.data.address || 'localhost', // It can be any IP and domain name
      port: this.data.remoteConnectPort
    })
  },
  changeMode() {
    this.setData({
      mode: 'remote'
    })
  },
  handleInputChange(e) {
    this.setData({
      address: e.detail.value
    })
  },
  handleInputPortChange(e) {
    this.setData({
      remoteConnectPort: e.detail.value
    })
  },
  handleSendMessage() {
    this.UDPSocket.send({
      address: 'localhost', // It can be any IP and domain name
      port: this.remote_port,
      message: `port[${this.port}] ${i18n['udp4']} remote-port[${this.remote_port}] ${i18n['udp5']}: Hello Wechat!`
    })
  },
  handleConnect() {
    this.UDPSocket.connect({
      address: 'localhost',
      port: this.remote_port
    })
  },
  handleWriteMessage() {
    this.UDPSocket.write({
      address: 'localhost',
      port: this.remote_port,
      message: `port[${this.port}] ${i18n['udp6']} remote-port[${this.remote_port}] ${i18n['udp7']}: Hello Wechat!`
    })
  },
  handleWriteRemoteMessage() {
    this.remoteUDPSocket.write({
      address: 'localhost',
      port: this.data.remoteConnectPort,
      message: `port[${this.port}] ${i18n['udp8']} remote-port[${this.data.remoteConnectPort}] ${i18n['udp9']}: Hello Wechat!`
    })
  },
  handleTTLChange(e) {
    this.setData({
      ttl: e.detail.value
    })
  },
  handleSetTTL() {
    console.log('===ttl', this.data.ttl)
    this.UDPSocket.setTTL(this.data.ttl)
  }
})
