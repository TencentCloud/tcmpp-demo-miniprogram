import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  data: {
    theme: 'light'
  },
  onShareAppMessage() {
    return {
      title: 'invoke-native-plugin',
      path: 'packageComponent/pages/open/invoke-native-plugin/invoke-native-plugin'
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
  },
  handler1() {
    wx.invokeNativePlugin({
      api_name: 'testState',
      data: {
        type: 'test'
      },
      complete(res) {
        log('===complete[invokeNativePlugin testState]===', res);
      },
      success: (res) => {
        log('===success[invokeNativePlugin testState]===', res);
      },
      fail: (err) => {
        log('===err[invokeNativePlugin testState]===', err);
      },
      progress: (res) => {
        log('===progress[invokeNativePlugin testState]===', res);
      }
    })
  },
  handler2() {
    wx.invokeNativePlugin({
      api_name: 'requestPayment',
      data: {
        type: 'test'
      },
      complete(res) {
        log('===complete===', res);
      },
      success: (res) => {
        log('===success===', res);
      },
      fail: (err) => {
        log('===err===', err);
      },
      progress: (res) => {
        log('===progress===', res);
      }
    })
  }
})
