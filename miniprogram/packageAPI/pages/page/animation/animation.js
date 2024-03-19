import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['Animation'],
      path: 'packageAPI/pages/page/animation/animation',
      containerStyle1: ''
    }
  },
  data: {
    theme: 'light',
    canIUse: true,
    animationData: {}
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['Animation']
    })
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

    console.log('======this.animate', this.animate);
    const canIUse = this.animate !== undefined
    // if (!canIUse) {
    //   wx.showModal({
    //     title: 'WeChat version is too low, this feature is not supported temporarily'
    //   })
    //   this.setData({
    //     canIUse,
    //   })
    // }
  },

  // Rotation and translation
  onShow() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    console.log('Animation===', animation)

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    // this.setData({
    //   animationData: animation.export()
    // })

    // setTimeout(function () {
    //   animation.translate(30).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 1000)
  },

  matrix() {
    // The values of the matrix correspond to scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY()
    this.animation.matrix(1, 2, 2, 1, 20, 20).backgroundColor('#f0ca30').opacity(0.5).step();
    this.animation.skew(Math.random() * 90, Math.random() * 90).step()
    this.setData({
      animationData: this.animation.export()
    });
  },

  matrix3d() {
    this.animation.matrix3d(
      0.5, 0, -0.866025, 0,
      0.595877, 1.2, -1.03209, 0,
      0.866025, 0, 0.5, 0,
      25.9808, 0, 15, 1
    ).step();
    this.animation.skewX(Math.random() * 90).skewY(Math.random() * 90).step()
    this.setData({ animationData: this.animation.export() });
  },

  rotate3dAndScale3d() {
    // Rotate and scale simultaneously
    this.animation.rotate3d(45, 45, 45, 90).scale3d(2, 2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

  rotateThenScale() {
    // Rotate first, then scale
    this.animation.rotate(45).step()
    this.animation.scale(2, 2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

  sizeAndPostion() {
    // Change position after resizing
    this.animation.width(100).height(100).step()
    this.animation.left(100).top(100).step()
    this.animation.right(100).bottom(100).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

  rotateXrotateYrotateZ() {
    // Rotate and then scale
    this.animation.rotateX(45).rotateY(45).rotateZ(45).step()
    this.animation.scaleX(2).scaleY(2).scaleZ(2).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

  rotateAndScaleThenTranslate() {
    // Rotate and scale simultaneously, then translate
    this.animation.rotate(45).scale(2, 2).step()
    this.animation.translate(100, 100).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },

  translate() {
    this.animation.translate3d(50, 50, 50).step({ duration: 1000 })
    this.animation.translateX(-50).translateY(-50).translateZ(-50).step({ duration: 1000 })
    this.setData({
      animationData: this.animation.export()
    })
  },

  change() {
    this.animate('#container1', [
      { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
      {
        opacity: 0.5, rotate: 45, backgroundColor: '#00FF00', offset: 0.9
      },
      { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' }
    ], 5000, function () {
      this.clearAnimation('#container1', { opacity: true, rotate: true }, function () {
        console.log('Cleared animation properties on #container')
      })
    }.bind(this))
    this.animate('.block1', [
      { scale: [1, 1], rotate: 0, ease: 'ease-out' },
      {
        scale: [1.5, 1.5], rotate: 45, ease: 'ease-in', offset: 0.9
      },
      { scale: [2, 2], rotate: 90 }
    ], 5000, function () {
      this.clearAnimation('.block1', { scale: true, rotate: true }, function () {
        console.log('Cleared animation properties on .block1')
      })
    }.bind(this))
  }
})
