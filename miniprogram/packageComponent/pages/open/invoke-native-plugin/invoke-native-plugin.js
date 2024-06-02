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
        wx.showToast({ title: "testState:ok" });
      },
      fail: (err) => {
        log('===err[invokeNativePlugin testState]===', err);
        const { errMsg = "" } = err;
        wx.showToast({
          title: `${errMsg}`,
          icon: "error"
        });
      },
      progress: (res) => {
        log('===progress[invokeNativePlugin testState]===', res);
        wx.showToast({
          title: "testState:progress",
          icon: "loading"
        });
      }
    })
  },
  handler2() {
    wx.invokeNativePlugin({
      api_name: 'myRequestPayment',
      data: {
        type: 'test',
        amount: 189
      },
      complete(res) {
        log('===complete===', res);
      },
      success: (res) => {
        wx.showToast({ title: "myRequestPayment:ok" });
        log('===success===', res);
      },
      fail: (err) => {
        log('===err===', err);
        const { errMsg = "" } = err;
        wx.showToast({
          title: `${errMsg}`,
          icon: "error"
        });
      },
      progress: (res) => {
        log('===progress===', res);
        wx.showToast({
          title: "myRequestPayment:progress",
          icon: "loading"
        });
      }
    })
  }
})
