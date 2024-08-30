//app.js
require('./utils/login-auth');
require('./utils/request');
const QQMapWX = require('./assets/libs/qqmap-wx-jssdk.min.js');
const i18n = require('./i18n/index.js');
const { QMapkey, GMapKey } = require('./tcmpp.config.js')


let qqmapsdk;
qqmapsdk = new QQMapWX({
  key: QMapkey
});

App({
  onLaunch: function () {
    i18n.init();
    this.initPage();
  },
  initPage(){
    // 获取用户授权信息信息,防止重复出现授权弹框
    wx.getSetting({
      success: res => {
        //已有权限直接获得信息，否则出现授权弹框
        if (res.authSetting['scope.userLocation']) {
          this.getUserLocation()
        } else {
          this.getUserLocation()
        }
      }
    });

    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
      this.globalData.userInfo = JSON.parse(userInfo);
    }

    const language = wx.getSystemInfoSync().language;
    this.globalData.language = language;
  },

  // google Map 通过经纬度换地点名称
  gMapLocationToName(latitude, longitude) {
    const { language } = this.globalData;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1&language=${language}&key=${GMapKey}`;
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            success: (res) => {
              if (res.data.status === 'OK') {
                console.log('Places API success:', res.data);
                const { name, place_id} = res.data.results[0];
                resolve({
                  cityName: name,
                  cityId: place_id,
                  status: 1
                });
              } else {
                    console.error('Places API error:', res.data.status);
                    resolve({
                      status: 0
                    });
              }
            },
            fail: (error) => {
                console.error('Places API Request failed:', error);
                resolve({
                  status: 0
                });
            }
        });
    })
  },

  tMapLocationToName(latitude, longitude) {
    return new Promise(resolve => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude,
          longitude
        },
        success: (res) => {
          const cityFullname = res.result.address_component.city;

          resolve({
            cityName: cityFullname.substring(0, cityFullname.length - 1),
            cityId: 1,
            status: 1,
          })
        },
        fail: err => {
          console.log(err);
          resolve({
            status: 0,
          })
        }
      });
    })
  },

  // 经纬度转城市信息
  async reverseGeocoder({latitude, longitude }) {
    const { language } = this.globalData;
    let info = {};

    if (language?.indexOf('zh') !== -1) {
      info = await this.tMapLocationToName(latitude, longitude);
    } else {
      info =  await this.gMapLocationToName(latitude, longitude)
    }

    const cityInfo = {
      latitude,
      longitude,
      cityName: info.cityName,
      cityId: info.cityId,
      status: info.status || 1,
    }

    this.globalData.userLocation = { ...cityInfo}   //浅拷贝对象
    this.globalData.selectCity = { ...cityInfo } //浅拷贝对象

    if (this.userLocationReadyCallback) {
      this.userLocationReadyCallback()
    }
  },

  //获取用户的位置信息
  getUserLocation() {
    wx.getLocation({
      //成功授权
      type: "gcj02",
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        this.reverseGeocoder({
          latitude,
          longitude
        });
      },
      fail:()=>{
        this.globalData.userLocation = {status:0}
        //防止当弹框出现后，用户长时间不选择，
        if (this.userLocationReadyCallback) {
          this.userLocationReadyCallback()
        }
      }
    })
  },

  globalData: {
    userLocation: null, //用户的位置信息
    selectCity: null, //用户切换的城市
    language: 'en',
    userInfo: null, 
    noServer: (wx.getEnterOptionsSync()?.extendData || "").indexOf("noServer=1") !== -1,
      // 设置需要回调的地址
    setCallbackUrl: function(mode) {
      return new Promise((resolve,reject) => {
        let pages = getCurrentPages(); //获取加载的页面
        let currentPage = pages[pages.length - 1]; //获取当前页面的对象
        let urlPage = ''; // 存储的跳转地址
        let url = currentPage.route; //当前页面url
        let argumentsStr = '';
        let options = currentPage.options; //如果要获取url中所带的参数可以查看options
        for (let key in options) {
          let value = options[key];
          argumentsStr += key + '=' + value + '&';
        }
        if(argumentsStr) {
            argumentsStr = argumentsStr.substring(0, argumentsStr.length - 1);
            urlPage = url + '?' + argumentsStr;
        } else {
            urlPage = url;
        }
        let callbackObj = {
            callbackUrl: `/${urlPage}`,
            mode: mode || 'redirectTo'
        }
        wx.setStorageSync('callbackObj', JSON.stringify(callbackObj));
        resolve();
      })
    },

    // 获取本地可以回调的地址
    getCallBackUrl: function() {
      return new Promise((resolve,reject) => {
        const callbackObj = wx.getStorageSync('callbackObj');
        if(callbackObj) {
            let resultObj = JSON.parse(callbackObj);
            let callbackUrl = resultObj.callbackUrl;
            let mode = resultObj.mode;
            mode == 'redirectTo' && wx.redirectTo({url: callbackUrl});
            mode == 'switchTab' && wx.switchTab({url: callbackUrl});
            mode == 'reLaunch' && wx.reLaunch({url: callbackUrl});
            mode == 'navigateTo' && wx.navigateTo({url: callbackUrl});

            wx.removeStorageSync('callbackObj');
            resolve();
        } else {
            reject();
        }
      });
    },
  }
})