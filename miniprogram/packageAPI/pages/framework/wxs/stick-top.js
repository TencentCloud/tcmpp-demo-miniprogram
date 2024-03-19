const height = wx.getSystemInfoSync().windowHeight
const app = getApp()
import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    sticky: false,
    opacity: 0,
    height,
    tabs: []
  },
  // Rolling bar monitoring
  onPageScroll() {
    // console.log('page scroll')
  },
  onShow() {

  },
  onReady() {
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
    const tabs = [
      {
        title: 'Technical development',
        title2: 'Advanced small program development',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
        desc: 'This video series is jointly produced by Tencent Classroom Next College and WeChat team.。'
      },
      {
        title: 'Product analysis',
        title2: 'WeChat Mini Program Live',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
        desc: 'WeChat Mini Program Live series courses continuously updated，Help everyone understand better、Apply WeChat Mini Program Live Function Function。'
      },
      {
        title: 'Operating specifications',
        title2: 'Common problems and solutions',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSGqys4ibO2a8L9nnIgH0ibjNXfbicNbZQQYfxxUpmicQglAEYQ2btVXjOhY9gRtSTCxKvAlKFek7sRUFA/0?wx_fmt=jpeg',
        desc: 'Improve the quality of review'
      },
      {
        title: 'Marketing experience',
        title2: 'Flow main applet',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSH2Eic4Lt0HkZeEN08pWXTticVRgyNGgBVHMJwMtRhmB0hE4m4alSuwsBk3uBBOhdCr91bZlSFbYhFg/0?wx_fmt=jpeg',
        desc: 'There are four sections in this course，Show in stages to develop the main function of how to open the traffic、How to access advertising components、Suggestions for different types of applet access，And how to use tools to tune mini -program monetization efficiency。'
      },
      {
        title: 'University competition',
        title2: '2020 Chinese University Computer Contest',
        img: 'http://mmbiz.qpic.cn/mmbiz_jpg/TcDuyasB5T3Eg34AYwjMw7xbEK2n01ekiaicPiaMInEMTkOQtuv1yke5KziaYF4MLia4IAbxlm0m5NxkibicFg4IZ92EA/0?wx_fmt=jpeg',
        desc: 'WeChat Ministry Application Development Tournament'
      }
    ]
    this.setData({tabs})
  }
})
