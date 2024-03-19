import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? `0${color}` : color
    rgb.push(color)
  }
  return `#${rgb.join('')}`
}

Page({
  onShareAppMessage() {
    return {
      title: 'video',
      path: 'packageComponent/pages/media/video/video'
    }
  },

  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onHide() {

  },

  inputValue: '',
  data: {
    theme: 'light',
    enableAutoRotation: false,
    src: "https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindVideoEnterPictureInPicture() {
    log('Enter small window mode')
  },

  bindVideoLeavePictureInPicture() {
    log('Exit small window mode')
  },

  bindPlayVideo() {
    this.videoContext.play()
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  changeSrc() {
    this.setData({
      src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400?t=112'
    })
  },

  videoErrorCallback(e) {
    log('Video error message:')
    log(e.detail.errMsg)
    this.setData({
      src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    })
  },
  handleSwitchChange(e) {
    this.setData({
      enableAutoRotation: e.detail.value
    })
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang,
      danmuList:
        [{
          text: i18n['video15'],
          color: '#ff0000',
          time: 1
        }, {
          text: i18n['video16'],
          color: '#ff00ff',
          time: 3
        }]
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
