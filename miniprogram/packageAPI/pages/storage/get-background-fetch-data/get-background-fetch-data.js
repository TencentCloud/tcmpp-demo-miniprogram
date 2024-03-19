// When using periodic data, you need to call setBackgroundFetchToken first. Specific examples can be found in app.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Cyclical cache',
      path: 'packageAPI/pages/storage/get-background-fetch-data/get-background-fetch-data'
    }
  },
  onShow() {
    // Retrieve cached periodic update data
    // this.getBackgroundFetchData()
  },
  data: {
    theme: 'light',
    openid: '',
    appid: '',
    canIUse: true
  },
  // getBackgroundFetchData() {
  //   console.log('Reading periodic update data')
  //   const that = this
  //   if (wx.getBackgroundFetchData) {
  //     wx.getBackgroundFetchData({
  //       // When type = 'periodic', the WeChat client will request data from the server every 12 hours.
  //       fetchType: 'periodic',
  //       success(res) {
  //         console.log(res)
  //         const {fetchedData} = res
  //         const result = JSON.parse(fetchedData)
  //         that.setData({
  //           appid: result.appid,
  //           openid: result.openid,
  //         })
  //         console.log('Successfully read periodic update data')
  //       },
  //       fail() {
  //         console.log('Failed to read periodic update data')
  //         wx.showToast({
  //           title: 'No cached data',
  //           icon: 'none'
  //         })
  //       },
  //       complete() {
  //         console.log('Reading complete')
  //       }
  //     })
  //   } else {
  //     this.setData({
  //       canIUse: false
  //     })
  //     wx.showModal({
  //       title: 'WeChat version is too low, this feature is not supported temporarily',
  //     })
  //   }
  // },
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
  }
})
