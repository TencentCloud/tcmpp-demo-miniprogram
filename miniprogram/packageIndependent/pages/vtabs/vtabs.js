import CustomPage from '../../base/CustomPage'
import { i18n } from '../../../i18n/lang'

CustomPage({
  onShareAppMessage() {
    return {
      title: 'vtabs',
      path: 'packageIndependent/pages/extend/vtabs/vtabs'
    }
  },
  data: {
    vtabs: [],
    activeTab: 0
  },

  onLoad() {
    const tabs = [
      {
        title: i18n['vtabs1'],
        title2: i18n['vtabs2'],
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
        desc: i18n['vtabs3']
      },
      {
        title: i18n['vtabs4'],
        title2: i18n['vtabs5'],
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
        desc: i18n['vtabs6']
      },
      {
        title: i18n['vtabs7'],
        title2: i18n['vtabs8'],
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSGqys4ibO2a8L9nnIgH0ibjNXfbicNbZQQYfxxUpmicQglAEYQ2btVXjOhY9gRtSTCxKvAlKFek7sRUFA/0?wx_fmt=jpeg',
        desc: i18n['vtabs9']
      },
      {
        title: i18n['vtabs10'],
        title2: i18n['vtabs11'],
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSH2Eic4Lt0HkZeEN08pWXTticVRgyNGgBVHMJwMtRhmB0hE4m4alSuwsBk3uBBOhdCr91bZlSFbYhFg/0?wx_fmt=jpeg',
        desc: i18n['vtabs12']
      },
      {
        title: i18n['vtabs13'],
        title2: i18n['vtabs14'],
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/TcDuyasB5T3Eg34AYwjMw7xbEK2n01ekiaicPiaMInEMTkOQtuv1yke5KziaYF4MLia4IAbxlm0m5NxkibicFg4IZ92EA/0?wx_fmt=jpeg',
        desc: i18n['vtabs15']
      }
    ]
    wx.setNavigationBarTitle({
      title: i18n['vtabs']
    })
    this.setData({ vtabs: tabs })
  },

  onTabClick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  },
  handleClick() {
    wx.navigateTo({
      url: '../tabs/webview'
    })
  }

})
