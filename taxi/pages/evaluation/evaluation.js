import { i18n, getLang } from '../../i18n/lang'
const app = getApp()
const ImageMap = {
  'zh_CN': '../../assets/images/driver.png',
  'en_US': '../../assets/images/driver-en.png',
  'id_ID': '../../assets/images/driver-id.png',
  'fr_FR': '../../assets/images/driver-fr.png'
}
Page({
  data: {
      star: 0,
      starMap: [
         '','','','','',
      ],
      play:'',
      i18n,
      driverImg: '../../assets/images/driver.png'
  },
  myStarChoose(e) {
      let star = parseInt(e.target.dataset.star) || 0;
      this.setData({
          star: star,
      });
  },
  onLoad(){
    wx.getStorage({
      key:'driver',
      success: (res)=>{
          this.setData({
            driver:res.data
          })
      } 
    })

    this.setData({
      driverImg: ImageMap[getLang()],
      play: app.globalData.play,
      i18n,
    })
  },
  sendSms(){
    wx.sendSms({
      phoneNumber: '+1 (555) 123-4567', //仅为示例，并非真实的电话号码
      content: "Thank you so much",
      fail: (err) => {
        console.log('sendSms===fail', err)
      }
    })
  },
  makePhoneCall(){
    wx.makePhoneCall({
      phoneNumber: '18511111111', //仅为示例，并非真实的电话号码
      fail: (err) => {
        console.log('makePhoneCall===fail', err)
      }
    })
  },
  requestPayment(obj) {
    const { nonceStr, package:vpve,paySign,signType,timeStamp } = obj;
    wx.requestPayment({
      package:vpve,
      nonceStr,
      paySign,
      signType,
      timeStamp,
      success: () => {
        wx.showLoading({
          title: i18n['支付成功']
        })
        setTimeout(() => {
          app.globalData = Object.assign(app.globalData, {
            bluraddress: '',
            destination: '',
            id: '0',
            strLatitude: 0,
            strLongitude: 0,
            endLatitude: 0,
            endLongitude: 0,
            play: '18.7'
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1000)
      },
      fail: (err) => {
        wx.hideLoading();
        console.log('wx.requestPayment fail===', err)
        wx.showModal({
          title: 'wx.requestPayment fail',
          confirmText: i18n['确定'],
          content: err.errMsg,
          showCancel: false
        })
      },
    });
  },
  payOrder(){   
    wx.showLoading({
      title: i18n['提交中']
    })
    if(app.globalData.noServer) {
      this.requestPayment({
        package:"fake",
        timeStamp: Math.floor(Date.now() / 1000),
        nonceStr: "",
        signType: "RSA",
        paySign: "MOCK"
      })
    } else {
      wx.request({
        url: 'https://tcmpp.woyaojianfei.club/commonOrder',
        method: 'POST',
        data: {
          appid: 'mpf3vd8c3d50q4ip',
          attach: "Take a taxi",
          body: "Taxi pay order",
          total: app.globalData.play,
          id: app.globalData.userInfo?.id
        },
        success: (res) => {
          wx.hideLoading();
          if(res.data.code === 200){
            this.requestPayment(res.data)
          } else {
            console.log('wx.request fail===', res)
            wx.showModal({
              title: 'wx.request fail',
              confirmText: i18n['确定'],
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
            confirmText: i18n['确定'],
            content: err.errMsg,
            showCancel: false
          })
        }
      })
    }
  }
});