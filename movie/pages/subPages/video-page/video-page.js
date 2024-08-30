const util = require('../../../utils/util.js');
const i18n  = require('../../../i18n/index');

const getRandom = util.getRandom
Page({
  data: {
    info: null,
    videoList: [], //播放列表
    current: -1, //当前播放视频索引
    $language: wx.getSystemInfoSync().language
  },
  onLoad(opt) {
    const paramsObj = opt.paramsStr ? JSON.parse(decodeURIComponent(opt.paramsStr)) : {};
    this.initData(paramsObj)
  },
  initData(obj) {
    //没有获取video列表的API，所以只能自己模拟一个播放列表
    // const random = getRandom(1, 4)
    // const videoList = new Array(random).fill(obj.video)

    const videoList = [{
        ...obj.video
      }
    ];

    this.getFeedList([], obj)
  },

  getFeedList(videoList, obj) {
    wx.showLoading({
      title: i18n.t('正在加载...')
    });
    wx.request({
      url: '/api/videos',
      data: {
        movieId: obj.id
      },
      success: ({ data }) => {
        wx.hideLoading();
        const { feeds } = data || {};

        if(feeds.length) {
          feeds.map(item => {
            videoList.push({
              videoImg: item.video.imgUrl,
              videoName: item.title,
              videourl: item.video.url,
              feedId: item.id
            });
            return item;
          });
        }

        this.setData({
          videoList,
          info: obj,
        });

        setTimeout(() => {
          this.setCurrent(0)
        }, 50);
      },
      fail: err => {
        console.log(err);
        wx.hideLoading();
        this.setData({
          videoList,
          info: obj,
        }, () => {
          this.setCurrent(0)
        })
      }
    })
  },
  //设置当前播放视频
  setCurrent(current) {
    const {
      info,
      videoList
    } = this.data
    wx.setNavigationBarTitle({
      title: i18n.t(info.id + '_nm'),
    });

    this.setData({
      current,
    });
  },
  //播放列表的点击事件
  selectItem(e) {
    const index = e.currentTarget.dataset.index
    if (index !== this.data.current) {
      this.setCurrent(index);
    }
  },
  //视频播放结束
  endHandle() {
    const {
      current,
      videoList
    } = this.data
    let index = current + 1
    if (index === videoList.length) {
      index = 0
    }
    this.setCurrent(index)
  },
  //播放错误时
  errorHandle() {
    wx.showToast({
      title: i18n.t('播放错误'),
      icon: 'none'
    })
  },
  //购票
  goTo() {
    const info = this.data.info;
    const VideoContext = wx.createVideoContext('my-video', this);
    VideoContext.pause()
    wx.navigateTo({
      url: `/pages/subPages/select-cinema/select-cinema?movieId=${info.id}&movieName=${info.movieName}&showTime=${info.rt}`,
    })
  }
})