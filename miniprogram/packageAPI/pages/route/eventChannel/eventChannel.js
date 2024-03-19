import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    eventChannel: null,
    type: 'on'
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: i18n['route0']
    })
    this.setData({
      t: i18n,
      lang,
      type: option.type
    })
    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
    const eventChannel = this.getOpenerEventChannel()
    this.setData({
      eventChannel
    })

    if (option.type === 'once') {
      this.onceOpenerPage()
    } else {
      this.onOpenerPage()
    }

    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'acceptDataFromRoute',
      content: i18n['eventChannel0']
    })

    eventChannel.emit('acceptDataFromOpenedPage', { data: 'EventChannel' });
    eventChannel.emit('someEvent', { data: 'EventChannel Test' });
  },
  openerPageHandler(data) {
    console.log('acceptDataFromRoute===', data)
  },
  // Listen for the acceptDataFromOpenerPage event to receive data sent from the previous page to the current page through eventChannel
  onOpenerPage() {
    this.data.eventChannel.on('acceptDataFromOpenerPage', this.openerPageHandler)
  },
  offOpenerPage() {
    this.data.eventChannel.off('acceptDataFromOpenerPage', this.openerPageHandler)
    wx.showToast({
      icon:'none',
      title: i18n['eventChannel1']
    })
  },
  onceOpenerPage() {
    this.data.eventChannel.once('acceptDataFromOpenerPage', this.openerPageHandler)
  }
})