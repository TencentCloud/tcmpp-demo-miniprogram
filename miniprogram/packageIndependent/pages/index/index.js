import { i18n } from '../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    arr: [
      {
        name: 'select-text',
        path: '/packageIndependent/pages/select-text/select-text'
      },
      {
        name: 'sticky',
        path: '/packageIndependent/pages/sticky/sticky'
      },
      {
        name: 'video-swiper',
        path: '/packageIndependent/pages/video-swiper/video-swiper'
      },
      {
        name: 'vtabs',
        path: '/packageIndependent/pages/vtabs/vtabs'
      }
    ]
  },
  onLoad() {
    this.setData({
      t: i18n,  
      theme: wx.getSystemInfoSync().theme || 'light'
    })
    wx.setNavigationBarTitle({
      title: i18n['independent']
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  },

  toggle(e) {
    const { id } = e.currentTarget;
    wx.navigateTo({
      url: id
    });
  }
})