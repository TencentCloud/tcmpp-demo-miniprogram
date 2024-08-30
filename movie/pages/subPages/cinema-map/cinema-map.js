const i18n  = require('../../../i18n/index');

Page({
  data: {
    cinemaData: null,
    markers: []
  },
  onLoad(opt) {
    wx.setNavigationBarTitle({
      title: i18n.t('位置信息')
    });
    this.initData(opt)
  },
  initData(cinemaData) {
    this.setData({
      cinemaData,
      markers: [{
        latitude: cinemaData.latitude,
        longitude: cinemaData.longitude
      }]
    })
  },
  //定位自己的位置
  position() {
    const MapContext = wx.createMapContext('map')
    MapContext.moveToLocation()
  }
})