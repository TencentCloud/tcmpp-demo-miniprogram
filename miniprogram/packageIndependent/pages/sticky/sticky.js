import CustomPage from '../../base/CustomPage'
import { i18n } from '../../../i18n/lang'

CustomPage({
  onShareAppMessage() {
    return {
      title: 'sticky',
      path: 'packageIndependent/pages/extend/sticky/sticky'
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['sticky']
    })
    this.setData({
      t: i18n
    })
  },

  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container')
    })
  },

  onScroll(e) {
    console.log('onScroll', e)
  }
})
