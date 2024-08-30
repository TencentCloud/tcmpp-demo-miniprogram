const USER_LOGIN = "USER_LOGIN";
const isOffline = true;
const appid = "mpjpb3vq8du7ibcv";
const host = "https://tcmpp.woyaojianfei.club"; // 不要以/结尾

const login = (id) => {
  wx.setStorageSync(USER_LOGIN, id);
};

const getUser = () => {
  return wx.getStorageSync(USER_LOGIN);
};

const logout = () => {
  wx.setStorageSync(USER_LOGIN, "");
};

const loginFromServer = function loginFromServer(code, success, fail) {
  if(isOffline){
    setTimeout(() =>{
      success?.("offlineUser");  
    }, 1000)
    return;
  }
  wx.request({
    url: `${host}/getUserInfo`,
    method: "POST",
    data: { appid, code },
    fail() {
      fail?.();
    },
    success(res) {
      console.log("mp server resp :", res);
      const { code = -1 } = res?.data || {};
      if (code === 200) {
        // 换取用户信息成功
        success?.(res?.data.data.account);
      } else {
        //console.log("静---------------",)
        fail?.(res?.data?.data?.msg || "login error");
      }
    },
  });
};

/**
 * 统一下单
 * @param {*} total
 * @param {*} attach
 * @param {*} body
 * @param {*} id
 */
const commonPay = function commonPay({ total = 1, body, attach, id, success, fail }) {
  if(isOffline){
    success?();
    return;
  }
  wx.showLoading({ title: "loading order" });
  wx.request({
    url: `${host}/commonOrder`,
    method: "POST",
    data: {
      total,
      appid,
      attach,
      body,
      id,
    },
    fail() {
      wx.hideLoading();
      fail?.();
    },
    success(res) {
      console.log("mp server resp:", res);
      const { code = -1, ...payInfo } = res?.data || {};
      if (code === 200) {
        // 换取用户信息成功
        wx.hideLoading();
        success?.(payInfo);
      } else {
        wx.hideLoading();
        fail?.("pay error");
      }
    },
  });
};

export { loginFromServer, login, logout, getUser, commonPay };
