const i18n  = require('../../../i18n/index');
const app = getApp();

Page({
  data: {
    value: '',
    stype: '',
    placeholder: '',
    movies: {},
    cinemas: {},
    $language: wx.getSystemInfoSync().language
  },
  onLoad(query) {
    wx.setNavigationBarTitle({
      title: i18n.t('搜索'),
    })
   this.initPage(query)
  },
  initPage(query){
    //搜索类型，-1代表搜索影院或电影，2代表搜索影院
    const stype = query.stype
    let placeholder = ''
    if (stype === '-1') {
      placeholder = i18n.t('搜电影、搜影院')
    } else {
      placeholder = i18n.t('搜影院')
    }
    this.setData({
      stype,
      placeholder
    })
  },
  search(e) {
    const value = e.detail.value
    const _this = this
    this.setData({
      value
    });

    const { cityId = 57 } = app.globalData.selectCity || {};
    
    wx.request({
      url: '/api/searchMovie',
      data: {
        kw: value,
        stype: _this.data.stype
      },
      success(res) {
        let movies = res.data.movies ? res.data.movies : []
        movies = movies.map(item=>{
          item.img = item.img.replace('w.h','128.180')
          return item
        })
        _this.setData({
          movies: movies,
          cinemas: res.data.cinemas ? res.data.cinemas : []
        })
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})