const util = require('../../../utils/util.js');
const i18n  = require('../../../i18n/index');
const showdays = require('../../../mock/showdays.js');
const app = getApp();

Page({
  data: {
    showTime:'',//影片上映日期
    days: [], // 影片上映日期列表
    isShow: false, //导航下拉框是否展开
    cityCinemaInfo: {}, //影院过滤菜单
    params: { //影院搜索条件
      movieId: 0,
      day: util.getToday(),
      offset: 0,
      limit: 20,
      districtId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId: -1,
      stationId: -1,
      item: '',
      updateShowDay: false,
    },
    cinemas: [], //影院列表 
    loadComplete: false, //数据是否加载完
    nothing: false, //是否有符合过滤的影院
    noSchedule: false, //当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
    $language: wx.getSystemInfoSync().language

  },
  onLoad(options) {
    const title = i18n.t(options.movieId + '_nm');
    wx.setNavigationBarTitle({
      title,
    });
    this.initPage(options)
  },
  initPage(options){
    const movieId = options.movieId
    const movieName = options.movieName
    const showTime = options.showTime //影片上映日期
    const { cityId, latitude, longitude } = app.globalData.selectCity || {};

    const params = { 
      ...this.data.params,
      movieId,
      cityId,
      lat: latitude,
      lng: longitude
    };
    this.setData({
      params
    });
    this.getMovieDays(params, showTime);
    //select-time会触发事件来调用changeTime初始化数据
  },

  // 获取影片上映时间列表
  getMovieDays(params, showTime) {
    wx.request({
      url: '/api/showdays',
      success: ({ data }) => {
        const { dates } = data.data;
        const days = [];

        dates.map(item => {
          days.push({
            title: util.formatDay(item.date),
            day: item.date
          })
          return item;
        });

        this.setData({
          days
        });
      },
      fail: err => {
        console.log(err);
        this.setData({
          showTime
        })
      }
    })
  },

  //获取影院列表
  getCinemas(params) {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: '/api/cinemas',
        method: 'get',
        data: params,
        success({ data }) {
          const { cinemas, paging } = data.data;
          // 缺少了城市ID所以返回值缺少showDays，只能自己模拟时间了
          resolve(cinemas)
          _this.setData({
            cinemas: _this.data.cinemas.concat(cinemas),
            loadComplete: !paging.hasMore
          })
        }
      })
    })
  },

  //当选择的时间变化时触发
  changeTime(e){
    const day = e.detail.day
    this.setData({
      params: { ...this.data.params,day},
      cinemas: [],
      isShow: false, //隐藏过滤下拉框
      noSchedule: false
    },()=>{
      wx.showLoading({
        title: i18n.t('正在加载...')
      })
      this.getCinemas(this.data.params).then((list) => {
        wx.hideLoading()
        if (!list.length) {
          this.setData({
            noSchedule: true
          })
        }
      }).catch(err => {
        wx.hideLoading();
      })
    })
  },
  //当过滤条件变化时调用的函数
  changeCondition(e) {
    const obj = e.detail
    wx.showLoading({
      title: i18n.t('正在加载...')
    })
    this.setData({
      params: {
        ...this.data.params,
        ...obj
      },
      cinemas: [],
      nothing: false
    }, () => {
      this.getCinemas(this.data.params).then((list) => {
        if (!list.length) {
          this.setData({
            nothing: true
          })
        }
        wx.hideLoading()
      })
    })
  },
  //导航下拉框状态变化时的处理，在下拉框展开时禁止滚动穿透
  toggleShow(e) {
    const item = e.detail.item
    this.setData({
      isShow: item !== -1
    })
  },
  //上拉触底加载更多
  onReachBottom() {
    if (this.data.loadComplete) {
      return
    }
    const params = {
      ...this.data.params,
      offset: this.data.cinemas.length
    }
    this.getCinemas(params)
  }
})