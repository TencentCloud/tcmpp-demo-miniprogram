// packageAPI/pages/media/editor-context/editor-context.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: i18n['editor0'],
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    safeHeight: 0,
    toolBarHeight: 100
  },

  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },

  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },

  blur() {
    this.editorCtx.blur({
      success: (res) => {
        console.log('editorCtx.blur success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.blur fail===', msg)
      }
    })
  },

  clear() {
    this.editorCtx.clear({
      success: (res) => {
        console.log('editorCtx.clear success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.clear fail===', msg)
      }
    })
  },

  format(e) {
    const { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },

  getContents() {
    this.editorCtx.getContents({
      success: (res) => {
        console.log('editorCtx.getContents success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.getContents fail===', msg)
      }
    })
  },

  getSelectionText() {
    this.editorCtx.getSelectionText({
      success: (res) => {
        console.log('editorCtx.getSelectionText success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.getSelectionText fail===', msg)
      }
    })
  },

  insertDivider() {
    this.editorCtx.insertDivider({
      success: (res) => {
        console.log('editorCtx.insertDivider success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.insertDivider fail===', msg)
      }
    })
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success() {
            console.log('insert image success')
          }
        })
      }
    })
  },

  insertText() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate,
      success: (res) => {
        console.log('editorCtx.insertText success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.insertText fail===', msg)
      }
    })
  },

  undo() {
    this.editorCtx.undo({
      success: (res) => {
        console.log('editorCtx.undo success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.undo fail===', msg)
      }
    })
  },

  redo() {
    this.editorCtx.redo({
      success: (res) => {
        console.log('editorCtx.redo success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.redo fail===', msg)
      }
    })
  },

  removeFormat() {
    this.editorCtx.removeFormat({
      success: (res) => {
        console.log('editorCtx.removeFormat success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.removeFormat fail===', msg)
      }
    })
  },

  scrollIntoView() {
    this.editorCtx.scrollIntoView()
  },

  setContents() {
    this.editorCtx.setContents({
      html: '<h1>Test setContents</h1>',
      delta: {
        ops: [{
          insert: 'Test setContents'
        }, {
          attributes: { header: 1 },
          insert: '\n'
        }]
      },
      success: (res) => {
        console.log('editorCtx.setContents success===', res)
      },
      fail: (msg) => {
        console.log('editorCtx.setContents fail===', msg)
      }
    })
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['editor1']
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
    const {
      platform, safeArea, screenHeight
    } = wx.getSystemInfoSync()
    let safeHeight
    if (safeArea) {
      safeHeight = (screenHeight - safeArea.bottom)
    } else {
      safeHeight = 32
    }
    this._safeHeight = safeHeight
    const isIOS = platform === 'ios'
    this.setData({ isIOS, safeHeight, toolBarHeight: isIOS ? safeHeight + 50 : 100 })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) {
        return
      }
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)
    })
  },

  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const { windowHeight } = wx.getSystemInfoSync()
    let editorHeight = windowHeight
    if (keyboardHeight > 0) {
      editorHeight = windowHeight - keyboardHeight - toolbarHeight
    }
    if (keyboardHeight === 0) {
      this.setData({
        editorHeight: editorHeight - toolbarHeight,
        keyboardHeight,
        toolBarHeight: this.data.isIOS ? 50 + this._safeHeight : 100,
        safeHeight: this._safeHeight
      })
    } else {
      this.setData({
        editorHeight,
        keyboardHeight,
        toolBarHeight: 100,
        safeHeight: 0
      })
    }
  },

  onShareAppMessage() {
    return {
      title: 'editor-context',
      path: 'packageAPI/pages/media/editor-context/editor-context'
    }
  }
})