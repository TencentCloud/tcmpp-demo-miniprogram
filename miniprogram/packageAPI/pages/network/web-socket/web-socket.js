function showModal(title, content) {
  wx.showModal({
    confirmText: i18n['confirm'],
    cancelText: i18n['cancel'],
    title,
    content,
    showCancel: false
  })
}

function showSuccess(title) {
  wx.showToast({
    title,
    icon: 'success',
    duration: 1000
  })
}

import { i18n, lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Web Socket',
      path: 'packageAPI/pages/network/web-socket/web-socket'
    }
  },

  data: {
    theme: 'light',
    socketStatus: 'closed',
    url: 'wss://echo.websocket.org',
    isCorrect: true
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
    const self = this
    self.setData({
      hasLogin: true
    })
    // qcloud.setLoginUrl(loginUrl)

    // qcloud.login({
    //   success: function(result) {
    //     console.log('Login successful', result)
    //     self.setData({
    //       hasLogin: true
    //     })
    //   },

    //   fail: function(error) {
    //     console.log('Login failed', error)
    //   }
    // })
  },

  onUnload() {
    this.closeSocket()
  },

  toggleSocket(e) {
    const turnedOn = e.detail.value

    if (turnedOn && this.data.socketStatus === 'closed') {
      this.openSocket()
    } else if (!turnedOn && this.data.socketStatus === 'connected') {
      const showSuccess = true
      this.closeSocket(showSuccess)
    }
  },

  openSocket() {
    // var socket = this.socket = new qcloud.Tunnel(tunnelUrl)

    wx.onSocketOpen(() => {
      console.log('onSocketOpen=== WebSocket connection opened')
      showSuccess(i18n['websocket0'])
      this.setData({
        socketStatus: 'connected'
      })
    })

    wx.onSocketClose(() => {
      console.log('onSocketClose=== WebSocket connection closed')
      this.setData({ socketStatus: 'closed' })
    })

    wx.onSocketError(error => {
      showModal(i18n['websocket1'], JSON.stringify(error))
      console.error('onSocketError=== WebSocket error event', error)
      this.setData({
        loading: false,
        socketStatus: 'closed'
      })
      this.closeSocket()
    })

    // Listen for server push messages
    wx.onSocketMessage(message => {
      showSuccess(i18n['websocket2'])
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['websocket3'],
        content: message.data
      })
      console.log('onSocketMessage=== WebSocket received a message from the server', message)
      this.setData({
        loading: false
      })
    })

    // Open channel
    wx.connectSocket({
      url: this.data.url,
      header: {
        'Origin': 'https://appservice.tmf.qq.com/'
      },
      success: () => {
        console.log('connectSocket=== WebSocket creation successful')
      },
      fail: (err) => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['websocket4'],
          content: JSON.stringify(err)
        })
      }
    })
  },

  changeUrl() {
    this.setData({
      url: this.data.isCorrect ? 'ws://127.0.0.1:1/' : 'wss://echo.websocket.org',
      isCorrect: !this.data.isCorrect
    })
  },

  closeSocket() {
    if (this.data.socketStatus === 'connected') {
      wx.closeSocket({
        success: () => {
          showSuccess(i18n['websocket5'])
          this.setData({ socketStatus: 'closed' })
        }
      })
    }
  },

  sendMessage() {
    if (this.data.socketStatus === 'connected') {
      wx.sendSocketMessage({
        data: 'Hello, Miniprogram!'
      })
    }
  }
})
