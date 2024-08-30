import util from '../../utils/index';
import { i18n } from '../../i18n/lang'
Page({

  data: {
    reasons:[],
    show: false,
    i18n
  },
  onLoad() {
    wx.setNavigationBarTitle({
        title: i18n['行程取消成功']
    })
    this.setData({
      i18n
    })
    this.requestReasons()
  },
  requestReasons(){
    util.request({
        url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
        mock: true,
      }).then((res)=>{
        const reasons = res.data.reasons;
        this.setData({
            reasons,
        })
      })
  },
  
  bindReasonChange(e){
    let reasons = this.data.reasons;
    let strVal = e.detail.value;
    for(var i = 0, lenI = reasons.length; i < lenI; ++i){
      reasons[i].checked = false;
      for(var j = 0, lenJ = strVal.length; j < lenJ; ++j){
        if(reasons[i].value===strVal[j]){
          reasons[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      reasons
    })
  },
  
  moreReasons(e){
    wx.showLoading({ 
      title: i18n['加载中'], 
      icon: 'loading', 
      duration: 500,
      success: (res)=>{
        util.request({
        url: 'https://www.easy-mock.com/mock/5aded45053796b38dd26e970/comments#!method=get',
        mock: true,
      }).then((res)=>{
        const moreReason = res.data.moreReason;
        const reasons = this.data.reasons;
        const total = reasons.concat(moreReason);
        setTimeout(()=>{
          this.setData({
            show: true,
            reasons: total
          })
          wx.hideLoading()
        },500)
      })
      }
    });  
  },
})