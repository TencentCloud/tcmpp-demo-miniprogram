import { i18n,lang } from '../../../i18n/lang';

Page({
  onShareAppMessage() {
    return {
      title: i18n['route0'],
      path: 'packageAPI/pages/route/route',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    envInfo: ''
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['route0']
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

  navigateTo: function (e) {
    wx.navigateTo({
      url: '/packageAPI/pages/route/logs/logs',
      success: function (e) {
        console.log('event===', e)
      }
    });
  },

  navigateToEventChannelOnce: function (e) {
    wx.navigateTo({
      url: '/packageAPI/pages/route/eventChannel/eventChannel?type=once',
      events: {
        // Add a listener for a specific event to receive data sent from the opened page to the current page
        acceptDataFromOpenedPage: function (data) {
          console.log('acceptDataFromEventChannel===', data)
        },
        someEvent: function (data) {
          console.log('acceptDataFromEventChannel===', data)
        }
      },
      success: function (res) {
        console.log('event===', res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'One Trigger navigateTo' })
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'Two Trigger navigateTo' })
        setTimeout(() => {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'Three Trigger navigateTo' })
        }, 5000)
      }
    });
  },
  navigateToEventChannelOn: function (e) {
    wx.navigateTo({
      url: '/packageAPI/pages/route/eventChannel/eventChannel?type=on',
      events: {
        // Add a listener for a specific event to receive data sent from the opened page to the current page
        acceptDataFromOpenedPage: function (data) {
          console.log('acceptDataFromEventChannel===', data)
        },
        someEvent: function (data) {
          console.log('acceptDataFromEventChannel===', data)
        }
      },
      success: function (res) {
        console.log('event===', res)
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'One Trigger navigateTo' })
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'Two Trigger navigateTo' })
        setTimeout(() => {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'Three Trigger navigateTo' })
        }, 5000)
      }
    });
  },
  navigateBack: function (e) {
    wx.navigateBack({
      delta: 1
    });
  },
  reLaunch: function (e) {
    wx.reLaunch({
      url: '/page/component/index', // Close all pages that jump to the tab bar
      success: function (e) {
        console.log(e, 'reLaunch')
      }
    });
  },
  reLaunchTo() {
    wx.reLaunch({
      url: '/packageAPI/pages/route/logs/logs', // Close all pages that jump to non-tab bar pages
      success: function (e) {
        console.log(e, 'reLaunch')
      }
    });
  },
  switchTab: function (e) {
    wx.switchTab({
      url: '/page/component/index',
      success: function (e) {
        console.log(e, 'switchTab');
      }
    })
  },
  redirectTo: function (e) {
    wx.redirectTo({
      url: '/packageAPI/pages/route/logs/logs?name=kbw&age=11'
    });
  }

})
