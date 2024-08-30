const i18n  = require('../i18n/index');
const app = getApp();

const payCallback = ({ vpve, nonceStr, paySign, signType, timeStamp }, cb) => {
  wx.requestPayment({
    package: vpve,
    nonceStr,
    paySign,
    signType,
    timeStamp,
    success: () => {
      wx.hideLoading();
      wx.showToast({
        icon: 'success',
        title: i18n.t('支付成功')
      });

      cb?.();
    },
    fail: (err) => {
      wx.hideLoading();
      console.log('wx.requestPayment fail===', err)
      wx.showModal({
        title: 'wx.requestPayment fail',
        confirmText: i18n.t('确定'),
        content: err.errMsg,
        showCancel: false
      })
    },
  });
}

const onlinePay = ({ appid, attach, body, total, id}, cb) => {
  wx.request({
    url: 'https://tcmpp.woyaojianfei.club/commonOrder',
    method: 'POST',
    data: {
      appid,
      attach,
      body,
      total,
      id
    },
    success: ({ data }) => {
      wx.hideLoading();
      if(data.code === 200){
        const { nonceStr, package: vpve, paySign, signType, timeStamp } = data;
        wx.showLoading({
          title: i18n.t('支付中...')
        });

        payCallback({
          nonceStr,
          vpve,
          paySign,
          signType,
          timeStamp
        }, cb);
      } else {
        console.log('wx.request fail===', res)
        wx.showModal({
          title: 'wx.request fail',
          confirmText: i18n.t('确定'),
          content: 'The returned code is not equal to 200',
          showCancel: false
        })
      }
    },
    fail: (err) => {
      wx.hideLoading();
      console.log('wx.request fail===', err)
      wx.showModal({
        title: 'wx.request fail',
        confirmText: i18n.t('确定'),
        content: err.errMsg,
        showCancel: false
      })
    }
  })
}

const mockPay = (cb) => {
  wx.showLoading({
    title: i18n.t('支付中...')
  });
  payCallback({
    nonceStr: '',
    vpve: 'package',
    paySign: 'MOCK',
    signType: 'RSA',
    timeStamp: Math.floor(Date.now() / 1000),
  }, cb);
}

const payOrder = (data, cb) => {   
   app.globalData.noServer ? mockPay(cb) : onlinePay(data, cb);
}

module.exports = payOrder;