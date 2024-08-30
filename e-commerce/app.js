import updateManager from "./common/updateManager";
import i18n from "./i18n/index";

App({
  onLaunch: function () {
    i18n.init();
  },
  onShow: function () {
    updateManager();
  },
  globalData: {
    lang: wx.getSystemInfoSync().language
  }
});