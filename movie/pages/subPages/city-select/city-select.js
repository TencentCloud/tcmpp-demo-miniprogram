const app = getApp();
const util = require('../../../utils/util.js');
const i18n  = require('../../../i18n/index');

const throttle = util.throttle;

Page({
  data: {
    cities: {},
    citylist: [],
    navTop: 0, //侧边导航距离窗口顶部的距离,
    navItemHeight: 0, //侧边导航项的高度
    sections: [], //所有section，保存每个section的节点在文档的位置信息
    inNavbar: false, //手指是否在侧边导航，主要是区别后面wx.pageScrollTo触发的滚动还是直接触发的滚动
    searchValue: '', //查询值
    result: [], //城市查询结果列表
    $language: wx.getSystemInfoSync().language
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n.t('选择城市'),
    })
    this.getCites();
    // this.normalizeCityList(citys)
  },

  onUnload(){
    wx.hideToast()
  },

  getCites() {
    wx.showLoading({
      title: i18n.t('正在加载...')
    });
    wx.request({
      url: '/api/cities',
      success: ({ data }) => {
        const { language } = app.globalData;
        let cityList = [];
        if(language.indexOf('zh') !== -1) {
          cityList = data.cts;
        } else {
          cityList = data.cts.map(item => {
            item.nm = item.py;
            return item;
          });
        }

        this.setData({
         cities: cityList
        });
        wx.hideLoading();
        this.handleCityList(cityList);
      },
      fail: err => {
        console.log(err);
        wx.hideLoading();
      }
    })
  },

  //页面滚动监听，使用函数节流优化
  onPageScroll: throttle(function(e){
    if (this.data.inNavbar || this.data.searchValue) {
      return //如果是侧边栏的wx.pageScrollTo触发的滚动则不执行下面的程序
    }
    const sections = this.data.sections
    const scrollTop = e.scrollTop
    this.handlePageScroll(sections, scrollTop)
  }),

  //页面滚动的处理程序
  handlePageScroll(sections, scrollTop) {
    for (let item of sections) {
      if (scrollTop >= item.top && scrollTop < item.top + item.height) {
        wx.showToast({
          title: item.title,
          icon: 'none',
          duration:500
        })
        break;
      }
    }
  },

  handleCityList(cts) {
    // 创建索引
    let map = {};
    cts.forEach(item => {
      const key = item.py.substr(0, 1).toUpperCase();
      //如果没有该字母索引，就创建该字母索引
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(item);
    });

    let list = [];
    for (let [index, value] of Object.entries(map)) {
      list.push(value)
    }
    //按字母顺序排序
    list.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))

     //创建热门城市
     const hot = {
      title: i18n.t('热门城市'),
      index: i18n.t('热门'),
      style: 'inline',
      items: cts.slice(0, 11)
    }
    list.unshift(hot);

    //创建当前定位城市
    let current = {
      title: i18n.t('当前定位城市'),
      index: i18n.t('定位'),
      style: 'inline',
      items:[]
    };
    //判断是否获得用户定位城市
    if (app.globalData?.userLocation?.status === 1){
      let city = cts.find(item => item.nm.toLowerCase() === app.globalData.userLocation.cityName?.toLowerCase()) || { nm: i18n.t('定位失败，请点击重试') }
      current.items = [city]
    } else {
      current.items = [{
        nm: i18n.t('定位失败，请点击重试'),
        py: i18n.t('定位失败，请点击重试')
      }]
    }
    list.unshift(current);

    this.setData({
      citylist: list
    }, () => {
      this.handleSelectionHeight();
    });
  },

  handleSelectionHeight() {
    const query = wx.createSelectorQuery()
    query.select('.citylist-nav').boundingClientRect();
    query.select('.citylist-nav-item').boundingClientRect();
    query.selectAll('.section').fields({
      dataset: true,
      size: true,
      rect: true
    });
    query.exec((res) => {
      let sections = []
      let Y = 0
      res[2].forEach(item => {
        sections.push({
          top: Y,
          height: item.height,
          title: item.dataset.title
        })
        Y += item.height
      })
      this.setData({
        navTop: res[0].top,
        navItemHeight: res[1].height,
        sections
      })
    })
  },

  //处理API返回的城市列表数据
  normalizeCityList(citys) {
    let map = {}
    citys.forEach(item => {
      const key = item.city_pre.toUpperCase()
      //如果没有该字母索引，就创建该字母索引
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(item)
    })
    let list = []
    for (let [index, value] of Object.entries(map)) {
      list.push(value)
    }
    //按字母顺序排序
    list.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
    //创建热门城市
    const hot = {
      title: i18n.t('热门城市'),
      index: i18n.t('热门'),
      style: 'inline',
      items: citys.slice(0, 10)
    }
    list.unshift(hot)
    //创建当前定位城市
    let current = {
      title: i18n.t('当前定位城市'),
      index: i18n.t('定位'),
      style: 'inline',
      items:[]
    };
    //判断是否获得用户定位城市
    if (app.globalData.userLocation.status===1){
      let city = citys.find(item => item.city_name === app.globalData.userLocation.cityName) || { city_name: i18n.t('定位失败，请点击重试')}
      current.items = [city]
    } else {
      current.items = [{
        city_name: i18n.t('定位失败，请点击重试')
      }]
    }
    list.unshift(current)

    this.setData({
      citylist: list
    })
  },

  //点击城市的事件处理程序
  selectCity(e) {
    const { nm: cityName, py, id } =  e.currentTarget.dataset.city;
    if (cityName === i18n.t('定位失败，请点击重试')){
      wx.showModal({
        title: '',
        content: i18n.t('需要先授权定位才可获得您的位置信息'),
        confirmText: i18n.t("打开定位"),
        success(res){
          if (res.confirm){
            wx.openSetting({
              success(data){
                if (data.authSetting['scope.userLocation']){
                  //app的globalData改变不能重新触发页面渲染？
                  app.initPage()
                }
              }
            })
          }
        }
      })
    } else {
      const { latitude, longitude } = app.globalData?.selectCity || {};
      app.globalData.selectCity = { 
        cityName: app.globalData.language.indexOf('zh') !== -1 ? cityName : py,
        cityId: id,
        latitude, 
        longitude
      }
      
      wx.switchTab({
        url: '/pages/tabBar/movie/movie'
      });
    }
  },
  //侧边栏导航的点击事件处理
  navSelect(e) {
    const {
      citylist,
      sections
    } = this.data
    const index = e.currentTarget.dataset.index
    wx.showToast({
      icon: 'none',
      title: citylist[index].title
    })
    wx.pageScrollTo({
      scrollTop: sections[index].top,
      duration: 0
    })
  },
  //在侧边栏上滑动的事件处理,使用函数节流优化
  handleTouchmove: throttle(function(e){
    const {
      navTop,
      navItemHeight,
      citylist,
      sections
    } = this.data
    let index = Math.floor((e.changedTouches[0].clientY - navTop) / navItemHeight)
    if (index < 0 || index > citylist.length - 1) {
      return
    }
    wx.showToast({
      icon: 'none',
      title: citylist[index].title,
      duration: 500
    })
    wx.pageScrollTo({
      scrollTop: sections[index].top,
      duration: 0
    })
  }),
  //input框输入是的查询事件
  search(e) {
    const value = e.detail.value.trim().toUpperCase()
    let result = []
    if (value) {
      result = this.data.cities.filter(item => {

        return item.nm.includes(value) || item.py.toUpperCase().includes(value) || item.py.toUpperCase().includes(value)
      })
    }
    this.setData({
      searchValue: value,
      result,
    })
  },
  //设置手指在侧边导航中
  handleTouchstart() {
    this.setData({
      inNavbar: true
    })
  },
  //设置手指离开侧边导航中
  handleTouchend() {
    this.setData({
      inNavbar: false
    })
  }
})