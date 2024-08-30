import util from '../../utils/index';
import { i18n, getLang } from '../../i18n/lang'
const app = getApp()
Page({
    data: {
        currentTab: 1,
        currentCost: 0,
        navScrollLeft: 0,
        duration: 1000,
        interval: 5000,
        isLoading: true,
        color:"#cccccc",
        callCart: true,
        destination: '',
        bluraddress : '',
        index: '',
        i18n,
    },
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: i18n['打车出行']
        })
        this.setData({
            i18n,
        })
        this.MapSdk = getLang() === 'zh_CN' ? app.globalData.TMapSdk : app.globalData.GMapSdk
        wx.getLocation({
            type: "gcj02",
            success:(res)=>{
                console.log('getLocation===success', res)
                var that = this;
                app.globalData.strLatitude = res.latitude
                app.globalData.strLongitude= res.longitude
                this.MapSdk.reverseGeocoder({
                    location: {
                        latitude:  res.latitude,
                        longitude: res.longitude,
                    },
                    success: function (res) {
                        console.log('reverseGeocoder===success', res)
                        app.globalData.bluraddress = res.result.formatted_addresses.recommend
                        that.setData({
                            bluraddress: res.result.formatted_addresses.recommend
                        });
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: 'Location To Address Fail',
                            confirmText: i18n['确定'],
                            content: res.message,
                            showCancel: false
                        })
                        console.log('reverseGeocoder===fail', res)
                    }
                });
            },
            fail: (err) => {
                console.log('getLocation===fail', err)
                wx.showModal({
                    title: 'wx.getLocation fail',
                    confirmText: i18n['确定'],
                    content: err.errMsg,
                    showCancel: false
                })
            }
        })
       this.requestCart();
       this.requestWaitingtime();
    },
    chooseLocation(e) {
        const that = this
        const type = e.currentTarget.dataset.type
        wx.chooseLocation({
            success(res) {
                console.log('chooseLocation===success', res)
                if(type === 'start') {
                    app.globalData.strLatitude = res.latitude
                    app.globalData.strLongitude= res.longitude
                    app.globalData.bluraddress=res.name
                    that.setData({
                        bluraddress: res.name
                    });
                }
                if(type === 'end') {
                    app.globalData.endLatitude = res.latitude
                    app.globalData.endLongitude= res.longitude
                    app.globalData.destination=res.name
                    that.setData({
                        destination: res.name
                    });
                }
                if(!that.data.callCart) {
                    that.toCast()
                }
            },
            fail: err => {
                console.log('chooseLocation===fail', err)
                wx.showModal({
                    title: 'wx.chooseLocation fail',
                    confirmText: i18n['确定'],
                    content: err.errMsg,
                    showCancel: false
                })
            }
        })
    },
    requestCart(e){
        util.request({
            url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
            mock: true,
          }).then((res)=>{
       
            const navData = res.data.navData;
            const imgUrls = res.data.imgUrls;
            const cost = res.data.cost
            const navDataMap = navData.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {})
            this.setData({
                navData,
                navDataMap,
                imgUrls,
                cost,
                cart: navDataMap[app.globalData.id]
            })
          })
    },
    onShow(){
        this.setData({
            destination:app.globalData.destination,
            currentTab:app.globalData.id,
        })
    },
    requestWaitingtime(){
        setTimeout(() => {
            util.request({
                url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
                mock: true,
                data: {
                }
              }).then((res)=>{
              const arr = res.data.waitingTimes;
            //   console.log(arr)
                var index = Math.floor((Math.random()*arr.length));
                // console.log(arr[index])
                this.setData({
                isLoading:false,
                waitingTimes: arr[index]
                })
              })
        }, 1000);
    },
    notSupport(){
        wx.showToast({
            title: i18n['暂不支持'],
            icon: 'success',
            duration: 1000
        })
    },

    toCast(){
        if(app.globalData.userInfo && app.globalData.userInfo.phone){
            const destination =this.data.destination
            if(destination==''){
                wx.showToast({
                    title: i18n['目的地不能为空'],
                    icon: 'fail',
                mask: true,
                    duration: 1000
                })
            }else{
                let {endLatitude, endLongitude, strLatitude, strLongitude} = app.globalData
                this.MapSdk.calculateDistance({
                mode: 'driving',
                from: {
                    latitude: strLatitude,
                    longitude: strLongitude
                },
                to:[{
                    latitude: endLatitude,
                    longitude:endLongitude
                }],
                success: (res)=> {
                    console.log('calculateDistance===success', res.result.elements[0])
                    var num1 = 8+1.9*(res.result.elements[0].distance/1000)
                    var num2= 12+1.8*(res.result.elements[0].distance/1000)
                    var num3= 16+2.9*(res.result.elements[0].distance/1000)
                    var play1 = num1.toFixed(1)
                    var play2 = num2.toFixed(1)
                    var play3 = num3.toFixed(1)
                    this.setData({
                        play1:play1,
                        play2:play2,
                        play3:play3,
                    })
                    app.globalData.play = play1
                },
                fail: (res) => {
                    wx.showModal({
                        title: 'Calculate Distance Fail',
                        confirmText: i18n['确定'],
                        content: res.message,
                        showCancel: false
                    })
                    console.log('calculateDistance===fail', res)
                } 
                });
                this.setData({
                    callCart: false
                })
            }
        }else{
            wx.navigateTo({
                url:  "/pages/login/login",
            })
        }
    },
    toWait(e){
        wx.reLaunch({
            url:  "/pages/wait/wait",
        }),
        wx.setTopBarText({
            text: i18n['等待应答']
        })
    },
    switchNav(event){
        this.requestWaitingtime();
        const cart = event.currentTarget.dataset.name
        let text = this.data.navData;
        var cur = event.currentTarget.dataset.current; 
        var singleNavWidth = this.data.windowWindth/6;
        
        this.setData({
            navScrollLeft: (cur - 1) * singleNavWidth,
            currentTab: cur,
            cart,
            isLoading:true,
            waitingTimes: ''
        })   
        app.globalData.id = cur
    },
    switchCart(e){
        const id = e.currentTarget.dataset.index;
        this.setData({
          index:id,
        })
        app.globalData.play = this.data[`play${Number(id)+1}`]
       
    },
    switchTab(event){
        var cur = event.detail.current;
        var singleNavWidth =55;
        this.setData({
            currentTab: cur,
            navScrollLeft: (cur - 1) * singleNavWidth
        });
    },
    showUser(){
    // 如果全局未存手机号进入登录页
    if(app.globalData.userInfo && app.globalData.userInfo.phone){
        wx.showModal({
            title: i18n['已登录账号'],
            confirmText: i18n['确定'],
            content: app.globalData.userInfo.phone,
            showCancel: false
        })
    }else{
        wx.navigateTo({
        url:  "/pages/login/login",
        })
    }
    },
    onChange(e){
        const currentCost = e.target.dataset.index;
        this.setData({
            currentCost
        })
      
    }
})