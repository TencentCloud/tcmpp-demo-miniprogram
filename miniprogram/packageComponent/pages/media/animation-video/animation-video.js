import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'animation-video',
      path: 'packageComponent/pages/media/animation-video/animation-video'
    }
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang,
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
    this.createCtx();
  },
  data: {
    t: i18n,
    lang,
    theme: 'light',
    loop: true,
    leftAlphaSrcPath: 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2020-1/1577964961344/003e2f0dcd81.mp4',
    rightAlphaSrcPath: 'https://b.bdstatic.com/miniapp/assets/docs/alpha-right-example.mp4',
    status: 'pause',
    autoplay: true
  },
  createCtx() {
    this.myAnimationVideo = wx.createAnimationVideoContext('my-video');
  },
  play() {
    this.myAnimationVideo?.play();
  },
  pause() {
    this.myAnimationVideo?.pause();
  },
  seek() {
    this.myAnimationVideo?.seek(2);
  },
  onStarted() {
    log('onStarted----');
  },
  onEnded() {
    log('onEnded----');
  }
})
