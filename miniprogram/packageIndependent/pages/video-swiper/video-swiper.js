import CustomPage from '../../base/CustomPage'
import { i18n } from '../../../i18n/lang'

const urls = [

  'https://res.wx.qq.com/wxaliveplayer/htdocs/video14e1eea.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video24e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video34e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video44e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video54e1eeb.mov'

]

CustomPage({
  onShareAppMessage() {
    return {
      title: 'video-swiper',
      path: 'packageIndependent/pages/extend/video-swiper/video-swiper'
    }
  },
  data: {
    videoList: []
  },
  onLoad() {
    console.log('=====onLoad====')
    wx.setNavigationBarTitle({
      title: i18n['video-swiper']
    })

  },
  onReady() {

  },
  onShow() {
    console.log('=====onShow====')
    const videoList = urls.map((item, index) => ({
      id: index,
      url: item,
      objectFit: 'contain'
    }))
    console.log('videoList', videoList)
    this.setData({
      videoList
    })
  },
  onHide() {

  },
  onUnload() {

  },
  onPlay() { },

  onPause() {
    //  console.log('pause', e.detail.activeId)
  },

  onEnded() { },

  onError() { },

  onWaiting() { },

  onTimeUpdate() { },

  onProgress() { },

  onLoadedMetaData(e) {
    console.log('LoadedMetaData', e)
  }
})
