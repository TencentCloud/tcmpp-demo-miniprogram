const requestUrl = require('../../../../config').requestUrl

const duration = 2000
let requestTask = null

import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    isListenHeader: false,
    isListenChunk: false,
    isAbort: false
  },
  onShareAppMessage() {
    return {
      title: i18n['request0'],
      path: 'packageAPI/pages/network/request/request'
    }
  },

  toggleAbort(e) {
    this.setData({
      isAbort: e.detail.value
    })
  },
  toggleHeader(e) {
    this.setData({
      isListenHeader: e.detail.value
    })
  },
  toggleChunk(e) {
    this.setData({
      isListenChunk: e.detail.value
    })
  },

  makeRequest() {
    const self = this

    self.setData({
      loading: true
    })

    requestTask = wx.request({
      url: 'https://http-cookie-demo.netlify.app',
      data: {
        theme: 'light',
        noncestr: Date.now()
      },
      enableChunked: true,
      success(result) {
        wx.showToast({
          title: i18n['request1'],
          icon: 'success',
          mask: true,
          duration
        })
        self.setData({
          loading: false
        })
        console.log('request success', result)
      },

      fail({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })

    if (this.data.isAbort) {
      this.abortRequest()
    } else {
      requestTask.onHeadersReceived(this.listenHeaderHandler)
      if (!this.data.isListenHeader) {
        requestTask.offHeadersReceived(this.listenHeaderHandler)
      }

      requestTask.onChunkReceived(this.listenChunkHandler)
      if (!this.data.isListenChunk) {
        requestTask.offChunkReceived(this.listenChunkHandler)
      }
    }
  },
  abortRequest() {
    requestTask.abort()
  },
  listenHeaderHandler(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['request1'],
      content: i18n['request3']
    })
    console.log('onHeadersReceived===', res)
  },
  listenHeader() {
    if (requestTask) {
      if (this.data.isListenHeader) {
        requestTask.offHeadersReceived(this.listenHeaderHandler)
      } else {
        requestTask.onHeadersReceived(this.listenHeaderHandler)
      }
      this.setData({
        isListenHeader: !this.data.isListenHeader
      })
    } else {
      wx.showToast({
        title: i18n['request4'],
        icon: 'error',
        mask: true,
        duration
      })
    }
  },

  listenChunkHandler(res) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['request5'],
      content: i18n['request6']
    })
    console.log('onChunkReceived===ArrayBuffer', res)
  },
  listenChunk() {
    if (requestTask) {
      if (this.data.isListenChunk) {
        requestTask.offChunkReceived(this.listenChunkHandler)
      } else {
        requestTask.onChunkReceived(this.listenChunkHandler)
      }
      this.setData({
        isListenChunk: !this.data.isListenChunk
      })
    } else {
      wx.showToast({
        title: i18n['request7'],
        icon: 'error',
        mask: true,
        duration
      })
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['request0']
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
