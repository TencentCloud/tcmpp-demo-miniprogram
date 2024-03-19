const app = getApp();

const getMoney = (max = 200) => (Math.random() * max).toFixed(2)

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['request-payment4'],
      money,
      path: 'packageAPI/pages/api/request-payment/request-payment'
    }
  },
  data: {
    money: getMoney()
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Initiate payment']
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

  requestPayment() {
    const self = this;
    self.setData({
      loading: true
    });
    wx.invokeNativePlugin({ // Call the custom API
      api_name: 'requestPayment',
      data: {
        money: self.data.money
      },
      complete() {
        setTimeout(() => {
          self.setData({
            loading: false
          });
        }, 200);
      },
      success(res) {
        console.log('Payment call successful---------------', res);
        wx.showToast({
          title: i18n['request-payment5']
        });
        setTimeout(() => {
          self.setData({
            money: getMoney()
          });
        }, 2000)
      },
      fail(err) {
        console.log('Payment call failed---------------', err);
        const msg = err.errMsg;
        wx.showToast({
          title: i18n['request-payment6'] + msg
        });
      }
    });
  }
})
