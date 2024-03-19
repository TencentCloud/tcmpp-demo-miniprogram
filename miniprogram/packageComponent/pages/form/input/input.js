import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'input',
      path: 'packageComponent/pages/form/input/input'
    }
  },

  data: {
    theme: 'light',
    focus: false,
    inputValue: ''
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindReplaceInput(e) {
    const value = e.detail.value
    let pos = e.detail.cursor
    let left
    if (pos !== -1) {
      // Cursor in the middle
      left = e.detail.value.slice(0, pos)
      // Calculate the cursor position
      pos = left.replace(/11/g, '2').length
    }

    // Directly return an object, which can filter and process the input while controlling the cursor position
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // Alternatively, directly return a string, with the cursor at the end
    // return value.replace(/11/g,'2'),
  },

  bindHideKeyboard(e) {
    if (e.detail.value === '123') {
      // Close the keyboard
      wx.hideKeyboard()
    }
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
