// page/one/index.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    tabs: [],
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: ''
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
        desc: 'This video series course，From Tencent Class NEXT The college and WeChat team jointly produced，Through actual combat cases，Explain in a simpler way。'
      }
    ]
    this.setData({tabs})
    // setTimeout(() => {
    // this.initInteraction()
    // }, 5000)
  }
})
