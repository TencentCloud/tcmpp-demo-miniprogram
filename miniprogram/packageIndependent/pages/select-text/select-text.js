import CustomPage from '../../base/CustomPage'
import { i18n } from '../../../i18n/lang'

CustomPage({
  onShareAppMessage() {
    return {
      title: 'select-text',
      path: 'packagpackageIndependenteExtend/pages/extend/select-text/select-text'
    }
  },
  data: {
    t: i18n,
    arr: []
  },

  onLoad() {
    wx.setNavigationBarTitle({
      t: i18n,
      title: i18n['selectText5']
    })
    this.setData({
      t: i18n,
      arr: [{
        value: i18n['selectText1'],
        placement: 'top'
      }, {
        value: i18n['selectText2'],
        placement: 'right'
      }, {
        value: i18n['selectText3'],
        placement: 'left'
      }, {
        value: i18n['selectText4'],
        placement: 'bottom'
      }]
    })
  },

  onCopy(e) {
    console.log('onCopy', e)
  },

  handleTouchStart(e) {
    console.log('@@ touchstart', e)
  },

  handleTap(e) {
    console.log('@@ tap', e)
    this.setData({
      evt: e
    })
  }

})
