//js
const i18n  = require('../../../i18n/index');
const { appId } = require('../../../tcmpp.config.js')
const app = getApp();

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        show: true,
        $language: wx.getSystemInfoSync().language
    },
    onLoad: function () {
      wx.setNavigationBarTitle({
        title: i18n.t('授权登录'),
      });
    },

    onUnload() {
        wx.removeStorageSync('callbackObj');
    },

    loginCallback(res) {
        const cb = () => {
            const {
                code = -1, data = {}
            } = res?.data || {};
            if (code === 200) { // 换取用户信息成功
                const info = {
                    userName: data.userName,
                    id: data.id
                }
                app.globalData.userInfo = info;
                wx.setStorageSync('userInfo', JSON.stringify(info));
            } else {
                console.log('getUserInfo request fail', res)
                wx.showModal({
                    title: i18n.t('登录失败'),
                    confirmText: i18n.t('确定'),
                    content: 'The returned code is not equal to 200',
                    showCancel: false
                })
            }
        }

        app.globalData.getCallBackUrl()
        .then(() => {
            cb();
        })
        .catch(err => {
            console.log('no data', err);
            cb();
            wx.navigateBack({
                delta: 1
            });
        });
    },

    onlineLogin(code) {
        wx.request({
            url: "https://tcmpp.woyaojianfei.club/getUserInfo",
            method: "POST",
            data: {
                appid: appId,
                code,
            },
            success: (res) => {
               this.loginCallback(res);
            },
            fail: (err) => {
                console.log('getUserInfo request fail', err)
                wx.showModal({
                    title: i18n.t('登录失败'),
                    confirmText: i18n.t('确定'),
                    content: err.errMsg,
                    showCancel: false
                })
            },
        })
    },

    loginMock() {
        this.loginCallback({
            data: {
                code: 200,
                data: {
                    id: 276553733,
                    userName: 'offlineUser'
                }
            }
        })
    },

    bindGetUserInfo: function (event) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.login({
                        success: (res) => {
                            const code = res.code; //login code
                            if (code) {
                             app.globalData.noServer ? this.loginMock()  : this.onlineLogin(code);
                            } else {
                                console.log('get login code failed' + r.errMsg)
                            }
                        },
                        fail: () => {
                            console.log('login faild')
                        }
                    })

                } else {
                    console.log('get setting faild')
                }

            }
        })

    }
})