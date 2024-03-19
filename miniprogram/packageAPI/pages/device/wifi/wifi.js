import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Wi-Fi',
      path: 'packageAPI/pages/device/wifi/wifi'
    }
  },

  data: {
    theme: 'light',
    wifiList: [],
    password: '12345678',
    wifiInfo: {}
  },

  onUnload() {
    this.stopSearch()
  },

  startWifi() {
    wx.startWifi({
      success(res) {
        console.log('startWifi success', res.errMsg)
      },
      fail: err => {
        console.log('startWifi err', err);
      }
    })
  },

  stopWifi() {
    wx.stopWifi({
      success(res) {
        console.log('stopWifi success', res.errMsg)
      },
      fail: err => {
        console.log('stopWifi err', err);
      }
    })
  },

  startSearch() {
    const getWifiList = () => {
      wx.getWifiList({
        success: (result) => {
          console.log('======getWifiList', result);
          wx.onGetWifiList((res) => {
            console.log('=======wifiList', res.wifiList);
            const wifiList = res.wifiList
              .sort((a, b) => b.signalStrength - a.signalStrength)
              .map(wifi => {
                const strength = Math.ceil(wifi.signalStrength * 4)
                return Object.assign(wifi, { strength })
              })
            this.setData({
              wifiList
            })
          })
        },
        fail(err) {
          console.error(err)
        }
      })
    }

    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        // The user has agreed to allow the app to use location services
        wx.showToast({
          title: i18n['wifi0']
        });
        wx.startWifi({
          success: getWifiList,
          fail(err) {
            console.error(err)
          }
        });
      },
      fail: (err) => {
        console.log('===err', err)
        wx.showToast({
          title: i18n['wifi1'],
          icon: 'none'
        });
      }
    });

    const startWifi = () => {
      wx.startWifi({
        success: getWifiList,
        fail(err) {
          console.error(err)
        }
      })
    }

    wx.getSystemInfo({
      success(res) {
        const isIOS = res.platform === 'ios'
        if (isIOS) {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['wifi2'],
            content: i18n['wifi3'],
            showCancel: false,
            success() {
              startWifi()
            }
          })
          return
        }
        startWifi()
      }
    })
  },

  stopSearch() {
    wx.stopWifi({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.error(err)
      }
    })
  },

  onGetWifiListCb(res) {
    console.log('=======onGetWifiListCb wifiList', res);
  },

  onGetWifiList() {
    wx.onGetWifiList(this.onGetWifiListCb);
    wx.showToast({
      icon: 'none',
      title: i18n['wifi4']
    });

  },

  offGetWifiList() {
    wx.offGetWifiList(this.onGetWifiListCb);
    wx.showToast({
      icon: 'none',
      title: i18n['wifi5']
    });
  },

  setWifiList() {
    wx.onGetWifiList(function (res) {
      console.log('=====wifiList', res);
      if (res.wifiList.length) {
        wx.setWifiList({
          wifiList: [{
            SSID: res.wifiList[0].SSID,
            BSSID: res.wifiList[0].BSSID,
            password: '123456'
          }]
        })
      } else {
        wx.setWifiList({
          wifiList: []
        })
      }
    })
  },

  partialCb(res) {
    console.log('====onWifiConnectedWithPartialInfo cb', res);
  },

  connectCb(res) {
    console.log('====onWifiConnected cb', res);
  },

  onWifiConnectedWithPartialInfo() {
    wx.onWifiConnectedWithPartialInfo(this.partialCb)
    wx.showToast({
      icon: 'none',
      title: i18n['wifi6']
    })
  },

  offWifiConnectedWithPartialInfo() {
    wx.offWifiConnectedWithPartialInfo(this.partialCb)
    wx.showToast({
      icon: 'none',
      title: i18n['wifi7']
    })
  },

  onWifiConnected() {
    wx.onWifiConnected(this.connectCb)
    wx.showToast({
      icon: 'none',
      title: i18n['wifi8']
    });
  },

  offWifiConnected() {
    wx.offWifiConnected(this.connectCb)
    wx.showToast({
      icon: 'none',
      title: i18n['wifi9']
    })
  },

  getConnectedWifi() {
    wx.getConnectedWifi({
      success: res => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'getConnectedWifi success',
          content: JSON.stringify(res)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'getConnectedWifi fail'
        })
        console.log('getConnectedWifi fail', err);
      }
    })
  },

  connectWifi() {
    const { password } = this.data;
    const getWifiList = () => {
      wx.getWifiList({
        success: (result) => {
          console.log('======getWifiList', result);
          wx.onGetWifiList((res) => {
            const wifiList = res.wifiList
              .sort((a, b) => b.signalStrength - a.signalStrength)
              .map(wifi => {
                const strength = Math.ceil(wifi.signalStrength * 4)
                return Object.assign(wifi, { strength })
              });
            console.log('======= Obtained WiFi list', res.wifiList);
            this.setData({
              wifiInfo: wifiList[0]
            });
            console.log('====== WiFi to connect', wifiList[0]);
            wx.connectWifi({
              SSID: wifiList[0].SSID,
              password,
              success(res) {
                console.log(res.errMsg)
              },
              fail: err => {
                console.log('connectWifi fail', err);
              }
            })
          })
        },
        fail(err) {
          console.error(err)
        }
      })
    }
    console.log('=====this.data.password', password);
    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        // The user has agreed to allow the app to use location services
        wx.showToast({
          title: i18n['wifi10']
        });
        wx.startWifi({
          success: getWifiList,
          fail(err) {
            console.error(err)
          }
        });
      },
      fail: (err) => {
        console.log('===err', err)
        wx.showToast({
          title: i18n['wifi11'],
          icon: 'none'
        });
      }
    });

    // wx.getSetting({
    //   success(res) {
    //     console.log('========= Obtained setting permission =======', res);
    //     if (!res.authSetting['scope.userLocation']) {
    //       console.log('==== No scope.userLocation permission ====');

    //     } else {
    //       wx.showToast({
    //         title: 'Authorization already granted, can directly access wifi'
    //       });
    //       wx.startWifi({
    //         success: getWifiList,
    //         fail(err) {
    //           console.error(err)
    //         }
    //       });
    //     }
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: 'getSetting failed callback ===='
    //     });
    //     console.log('getSetting failed', err);
    //   }
    // });
  },

  valueChanged(e) {
    this.setData({
      password: e.detail.value
    });
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
  }
})
