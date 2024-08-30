const request = require('../../../utils/request')
const app = getApp()
const i18n  = require('../../../i18n/index');

Page({
  data: {
    city: i18n.t('正在定位...'),
    cityId: null,
    switchItem: 0, //默认选择‘正在热映’
    //‘正在热映’数据
    movieList0: [],
    movieIds0: [],
    loadComplete0: false, //‘正在上映’数据是否加载到最后一条
    //‘即将上映’数据
    mostExpectedList: [],
    movieList1: [],
    movieIds1: [],
    loadComplete1: false,
    loadComplete2: false, //水平滚动加载的数据是否加载完毕
    $language: wx.getSystemInfoSync().language
    // i18n
  },
  onLoad() {
    const tabBarText = ['电影', '影院', '我的'];
    tabBarText.map((item, index) => {
      wx.setTabBarItem({
          index: index,
          text: i18n.t(item),
      });
    });
    this.initPage();
  },
  initPage() {
    wx.setNavigationBarTitle({
      title: i18n.t('电影'),
    });

    if (app.globalData.userLocation) {
      this.setData({
        city: app.globalData.selectCity ? app.globalData.selectCity.cityName : i18n.t('定位失败'),
        cityId: app.globalData.selectCity ? app.globalData.selectCity.cityId : null
      })
    } else {
      app.userLocationReadyCallback = () => {
        this.setData({
          city: app.globalData.selectCity ? app.globalData.selectCity.cityName : i18n.t('定位失败'),
          cityId: app.globalData.selectCity ? app.globalData.selectCity.cityId : null
        })
      }
    }
    this.firstLoad()
  },
  onShow() {
    if (app.globalData.selectCity) {
      if(this.data.cityId !== app.globalData.selectCity.cityId) {
        this.firstLoad();
      }

      this.setData({
        city: app.globalData.selectCity.cityName,
        cityId: app.globalData.selectCity.cityId
      });
    }

  },
  //上拉触底刷新
  onReachBottom() {
    const {
      switchItem,
      movieList0,
      movieIds0,
      loadComplete0,
      movieList1,
      movieIds1,
      loadComplete1
    } = this.data
    if (this.data.switchItem === 0) {
      this.ReachBottom(movieList0, movieIds0, loadComplete0, 0)
    } else {
      this.ReachBottom(movieList1, movieIds1, loadComplete1, 1)
    }
  },

  //第一次加载页面时请求‘正在热映的数据’
  async firstLoad() {
    wx.showLoading({
      title: i18n.t('正在加载...')
    });

    wx.request({
      url: '/api/hot',
      success: ({ data }) => {
        const {
          hot = [], movieIds = []
        } = data
        let movieList0 = this.formatImgUrl(hot);
        movieList0 = movieList0.map(item => {
          if(!item.version && item.ver) {
            if(item.ver.includes('IMAX')) {
              item.version = item.ver.includes('3D') ? 'v3d imax' : 'v2d imax';
            } else if(item.ver.includes('3D')) {
              item.version = '3d';
            }
          }

          return item;
        });

        this.setData({
          movieIds0: movieIds,
          movieList0
        });
        if (hot.length >= movieIds.length) {
          this.setData({
            loadComplete0: true
          })
        }
        wx.hideLoading();
      },
      fail: err =>{
        console.log(err);
        wx.hideLoading();
      }
    });
  },
  //切换swtch
  async selectItem(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      switchItem: item
    })
    if (item === 1 && !this.data.mostExpectedList.length) {
      wx.showLoading({
        title: i18n.t('正在加载...')
      })

      request({
        url: '/api/mostExpected'
      }).then(([res]) => {
        this.setData({
          mostExpectedList: this.formatImgUrl(res.coming || [], false)
        })
      }).finally(() => {
        wx.hideLoading()
      })


      request({
        url: '/api/comingList',
        data: {
          limit: 10,
          optimus_uuid: 'B52C96001E4B11EA928853AC6CFDBC0221750D6FF9374A35B50A070B3195ED15',
          optimus_risk_level: 71,
          optimus_code: 10,
          token: '',
          ci: this.data.cityId
        }
      }).then(([res]) => {
        this.setData({
          movieIds1: res.movieIds || [],
          movieList1: this.formatImgUrl(res.coming || [])
        })
      })
    }
  },
  //上拉触底刷新的加载函数
  async ReachBottom(list, ids, complete, item) {
    if (complete) {
      return
    }
    const length = list.length

    if (length + 10 >= ids.length) {
      this.setData({
        [`loadComplete${item}`]: true
      });
      return;
    }
    let query = ids.slice(length, length + 10).join('%2C')
    const [res, err] = await request({
      url: '/api/moreComing'
    })
    if(!err){
      const arr = list.concat(this.formatImgUrl(res || []));

      if (arr.length + 10 >= ids.length) {
      this.setData({
        [`loadComplete${item}`]: true
      });
    }
      this.setData({
        [`movieList${item}`]: arr,
      })
    }
  },
  //滚动到最右边时的事件处理函数
  async lower() {
    const {
      mostExpectedList,
      loadComplete2,
      cityId,
    } = this.data
    const length = mostExpectedList.length
    if (loadComplete2) {
      return
    }
  },
  //处理图片url
  formatImgUrl(arr, cutTitle = false) {
    //小程序不能在{{}}调用函数，所以我们只能在获取API的数据时处理，而不能在wx:for的每一项中处理
    if (!Array.isArray(arr)) {
      return
    }
    let newArr = []
    arr.forEach(item => {
      let title = item.comingTitle
      if (cutTitle) {
        title = item.comingTitle.split(' ')[0]
      }
      let imgUrl = item.img.replace('w.h', '128.180')
      newArr.push({
        ...item,
        comingTitle: title,
        img: imgUrl
      })
    })
    return newArr
  },
})