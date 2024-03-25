import { i18n } from '../../../i18n/lang'
Component({
  /**
   * Component attribute list
   */
  properties: {
    space: {
      type: String,
      value: ''
    },
    decode: {
      type: Boolean,
      value: false
    },
    placement: {
      type: String,
      value: 'top'
    },
    showCopyBtn: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    }
  },
  observers: {
    onDocumentTap() {
      this.setData({
        showToolTip: false
      })
    }
  },
  attached(){
    this.setData({
      t: i18n
    })
  },
  /**
   * Component initial data
   */
  data: {
    showToolTip: false
  },

  /**
   * Component method list
   */
  methods: {
    handleLongPress() {
      if (!this.data.showCopyBtn) return
      this.setData({
        showToolTip: true
      })
    },
    handleCopy() {
      this.setData({
        showToolTip: false
      })
      wx.setClipboardData({
        data: this.data.value
      })
      this.triggerEvent('copy', {})
    },
    stopPropagation: function stopPropagation(e) {}
  }
})
