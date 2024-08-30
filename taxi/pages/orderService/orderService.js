import util from '../../utils/index';
import { i18n, getLang } from '../../i18n/lang'

const app = getApp();
const ImageMap = {
  'zh_CN': '../../assets/images/driver.png',
  'en_US': '../../assets/images/driver-en.png',
  'id_ID': '../../assets/images/driver-id.png',
  'fr_FR': '../../assets/images/driver-fr.png'
}
Page({
  data: {
    scale: 14,
    hiddenLoading:false,
    includePoints: [],
    status: 'waiting',
    i18n,
    driverImg: '../../assets/images/driver.png'
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
        title: i18n['等待服务']
    })
    this.MapSdk = getLang() === 'zh_CN' ? app.globalData.TMapSdk : app.globalData.GMapSdk
    let { strLatitude, strLongitude, endLatitude, endLongitude} = app.globalData
    this.setData({
      i18n,
      driverImg: ImageMap[getLang()],
      markers: [{
        iconPath: "../../assets/images/str.png",
        id: 0,
        latitude: strLatitude,
        longitude: strLongitude,
        width: 30,
        height: 30,
        zIndex: 1
      },{
        iconPath: "../../assets/images/end.png",
        id: 1,
        latitude: endLatitude,
        longitude: endLongitude,
        width: 30,
        height: 30,
        zIndex: 1
      },{
        iconPath: "../../assets/images/mapCar.png",
        id: 2,
        latitude: strLatitude + 0.002,
        longitude: strLongitude + 0.002,
        width: 20,
        height: 38,
        zIndex: 5
      }]
    });
    this.drivingLine(`${strLatitude},${strLongitude}`, `${endLatitude},${endLongitude}`)
  },

  onShow(){
    this.requesDriver();
    this.mapCtx = wx.createMapContext("didiMap");
  },
  drivingLine(from, to) {
    const _this = this;
    //调用距离计算接口
    this.MapSdk.direction({
      mode: 'driving',
      //from参数不填默认当前地址
      from,
      to, 
      success: function (res) {
        console.log('direction===success', res)
        let coors = res.result.routes[0].polyline;
        let pl = [];
        if(getLang() === 'zh_CN') { // TMapSdk
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          let kr = 1000000;
          for (let i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (let i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
          }
        } else { // GMapSdk
          pl = coors;
        }
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#5cb85c',
            borderColor: '#224a10',
            width: 4,
            borderWidth: 2
          }]
        })
      },
      fail: function (error) {
        wx.showModal({
          title: 'Location To Address Fail',
          confirmText: i18n['确定'],
          content: res.message,
          showCancel: false
        })
        console.log('direction===fail', error)
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  requesDriver(){
    util.request({
      url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
      mock: true,
    }).then((res)=>{
      
      const drivers = res.data.drivers
      const driver = drivers[Math.floor(Math.random()*drivers.length)];
      wx.setStorage({
        key:"driver",
        data:driver
      });
      this.setData({
        hiddenLoading:true,
        driver:driver
      })
    })

  },
  bindcontroltap: (e)=>{
    console.log("hello")
  },
 
  bindregionchange: (e)=>{

  },
  toCancel(){
    wx.navigateTo({
      url: "/pages/cancel/cancel"
    })
   
  },
  sendSms(){
    wx.sendSms({
      phoneNumber: '+1 (555) 123-4567', //仅为示例，并非真实的电话号码
      content: "I've arrived at the pick-up point",
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
  toEvaluation(){
    if(this.data.status === 'waiting') {
      let that = this;
      wx.showModal({
        content: i18n['确认已上车?'],
        confirmText: i18n['确定'],
        cancelText: i18n['取消'],
        success (res) {
          if (res.confirm) {
            let { strLatitude, strLongitude, endLatitude, endLongitude } = app.globalData
            that.mapCtx.translateMarker({
              markerId: 2,
              destination: {
                latitude: strLatitude, // 新的纬度
                longitude: strLongitude // 新的经度
              },
              autoRotate: true,
              rotate: 0,
              duration: 1000,
              animationEnd() {
                console.log(i18n['车车位置修改完成']);
              }
            })
            that.setData({
              status: "start",
              includePoints: [
              { latitude: strLatitude, longitude: strLongitude },
              { latitude: endLatitude, longitude: endLongitude },
              ]
            });
          }
        }
      })
    } else {
      wx.showModal({
      content: i18n['确认已到达?'],
      confirmText: i18n['确定'],
      cancelText: i18n['取消'],
      success (res) {
        if (res.confirm) {
          wx.redirectTo({
            url:"/pages/evaluation/evaluation",
          })
        }
      }
    })
    }
  },
  onReady: function () {
    wx.getLocation({
      type: "gcj02",
      success:(res)=>{
        this.setData({
          longitude:res.longitude,
          latitude: res.latitude
        })
      }
      })
     
  },
})