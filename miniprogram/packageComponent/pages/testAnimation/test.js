Page({
    data: {
        animationData: {},
        transformStyle: '',
        matrix3DAnimationData: {},
        opacityAnimationData: {},
        rotate3dAnimationData: {},
        rotateXAnimationData: {},
        rotateYAnimationData: {},
        rotateZAnimationData: {},
        scaleAnimationData: {},
        scale3dAnimationData: {},
        scaleXAnimationData: {},
        scaleYAnimationData: {},
        scaleZAnimationData: {},
        scaleZAnimationData2: {},
        skewAnimationData: {},
        skewXAnimationData: {},
        skewYAnimationData: {},
        stepAnimationData: {},
        topAnimationData: {},
        translateAnimationData: {},
        translate3dAnimationData: {},
        translateXAnimationData: {},
        translateYAnimationData: {},
        translateZAnimationData: {},
        widthAnimationData: {},
        bottomAnimationData: {},
        heightAnimationData: {},
        leftAnimationData: {},
        rightAnimationData: {},
        matrixAnimationData: {}
    },
    createAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translateX(100).rotate(45).step();
        this.setData({
            animationData: animation.export()
        });
    },
    matrix3DAnimation: function() {
        const matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            100, 0, 0, 1,
        ];

        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
            delay: 0,
            transformOrigin: '50% 50%'
        });

        animation.matrix3d(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -50, -100, 0, 1
        ).step();

        this.setData({
            matrix3DAnimationData: animation.export()
        });
    },
    opacityAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.opacity(0.5).step();
        this.setData({
            opacityAnimationData: animation.export()
        });
    },
    rotate3dAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.rotate3d(0,1,0,360).step()
        this.setData({
            rotate3dAnimationData: animation.export()
        });
    },
    rotateXAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.rotateX(180).step();
        this.setData({
            rotateXAnimationData: animation.export()
        });
    },
    rotateYAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.rotateY(180).step();
        this.setData({
            rotateYAnimationData: animation.export()
        });
    },
    rotateZAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.rotateZ(180).step();
        this.setData({
            rotateZAnimationData: animation.export()
        });
    },
    scaleAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.scale(2).step();
        this.setData({
            scaleAnimationData: animation.export()
        });
    },
    scale3dAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.scale3d(2,0.5,0.5).step();
        this.setData({
            scale3dAnimationData: animation.export()
        });
    },
    scaleXAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.scaleX(2).step();
        this.setData({
            scaleXAnimationData: animation.export()
        });
    },
    scaleYAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.scaleY(2).step();
        this.setData({
            scaleYAnimationData: animation.export()
        });
    },
    scaleZAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.scaleZ(0.1).translateZ(10).step();
        this.setData({
            scaleZAnimationData: animation.export()
        });
    },
    scaleZAnimation2: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translateZ(10).step();
        this.setData({
            scaleZAnimationData2: animation.export()
        });
    },
    skewAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.skew(90,60).step();
        this.setData({
            skewAnimationData: animation.export()
        });
    },
    skewXAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.skewX(30).step();
        this.setData({
            skewXAnimationData: animation.export()
        });
    },
    skewYAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.skewY(30).step();
        this.setData({
            skewYAnimationData: animation.export()
        });
    },
    stepAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'step-start'
        });
        animation.backgroundColor('blue').step();
        this.setData({
            stepAnimationData: animation.export()
        });
    },
    translateAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translate(50,20).step();
        this.setData({
            translateAnimationData: animation.export()
        });
    },
    translate3dAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translate3d(50,20, 50).step();
        this.setData({
            translate3dAnimationData: animation.export()
        });
    },
    translateXAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translateX(50).step();
        this.setData({
            translateXAnimationData: animation.export()
        });
    },
    translateYAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translateY(50).step();
        this.setData({
            translateYAnimationData: animation.export()
        });
    },
    translateZAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.translateZ(0.5).step();
        this.setData({
            translateZAnimationData: animation.export()
        });
    },
    widthAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.width('100rpx').step();
        this.setData({
            widthAnimationData: animation.export()
        });
    },
    topAnimation: function() {
      const animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease'
      });
      animation.top(100).step();
      this.setData({
          topAnimationData: animation.export()
      });
  },
    bottomAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.bottom(-50).step()
        this.setData({
            bottomAnimationData: animation.export()
        });
    },
    heightAnimation: function() {
        const animation = wx.createAnimation({
          duration: 600,
          timingFunction: 'linear',
          delay: 0
        });
        
        animation.height(50).step();
        this.setData({
            heightAnimationData: animation.export()
        });
    },
    leftAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.left('50%').step();
        this.setData({
            leftAnimationData: animation.export()
        });
    },
    rightAnimation: function() {
      const animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease'
      });
      animation.right('50%').step();
      this.setData({
          rightAnimationData: animation.export()
      });
  },
    matrixAnimation: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease'
        });
        animation.matrix(1, 0, 0, 1, 100, 100).step();
        this.setData({
            matrixAnimationData: animation.export()
        });
    },
});