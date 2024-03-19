const example = require('./example.js')
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['canvas1'],
      path: 'packageAPI/pages/page/canvas/canvas'
    }
  },

  data: {
    imageData: null,
    width: null,
    height: null
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['canvas1']
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
    this.context = wx.createCanvasContext('canvas')

    const methods = Object.keys(example)
    this.setData({
      methods
    })

    const that = this
    methods.forEach(function (method) {
      that[method] = function () {
        example[method](that.context)
      }
    })
  },

  onShow() {
    const ctx = wx.createCanvasContext('myCanvas');
    wx.getImageInfo({
      src: 'https://main.qcloudimg.com/raw/cf516e7b725dc06cbedef8eaeaed294d.svg',
      success: function (res) {
        console.log('=======image res', res)
        ctx.drawImage(res.path, 0, 0, 240, 380)
        ctx.draw()
      },
      fail: err => {
        console.log('====err', err)
      }
    });
  },

  draw() {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.beginPath()
    ctx.arc(20, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(200, 20, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(20, 100, 2, 0, 2 * Math.PI)
    ctx.arc(200, 100, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.setFillStyle('black')
    ctx.setFontSize(12)

    // Draw guides
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(20, 100)
    ctx.lineTo(150, 75)

    ctx.moveTo(200, 20)
    ctx.lineTo(200, 100)
    ctx.lineTo(70, 75)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    // Draw quadratic curve
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
    ctx.setStrokeStyle('black')
    ctx.stroke()

    ctx.draw()
  },

  draw1() {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 50)
    ctx.lineTo(10, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('bevel')
    ctx.setLineWidth(10)
    ctx.moveTo(50, 10)
    ctx.lineTo(140, 50)
    ctx.lineTo(50, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('round')
    ctx.setLineWidth(10)
    ctx.moveTo(90, 10)
    ctx.lineTo(180, 50)
    ctx.lineTo(90, 90)
    ctx.stroke()

    ctx.beginPath()
    ctx.setLineJoin('miter')
    ctx.setLineWidth(10)
    ctx.moveTo(130, 10)
    ctx.lineTo(220, 50)
    ctx.lineTo(130, 90)
    ctx.stroke()

    ctx.draw()
  },

  toTempFilePath() {
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success(res) {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: `${i18n['canvas2']}${res.tempFilePath}`
        })
      },

      fail(res) {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: i18n['canvas3']
        })
      }
    })
  },

  canvasPutImageData() {
    const data = this.data.imageData;
    const { width, height } = this.data;
    if (data) {
      wx.canvasPutImageData({
        canvasId: 'canvas',
        x: 0,
        y: 0,
        width,
        height,
        data,
        success(res) {
          console.log('====canvasPutImageData res', res)
        },
        fail(err) {
          console.log('canvasPutImageData failed', err)
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: i18n['canvas4']
      })
    }

  },

  canvasGetImageData() {
    wx.canvasGetImageData({
      canvasId: 'canvas',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      success: (res) => {
        const { width, height, data } = res;
        console.log(res.width) // 100
        console.log(res.height) // 100
        console.log(res.data instanceof Uint8ClampedArray) // true
        console.log(res.data.length) // 100 * 100 * 4

        this.setData({
          imageData: res.data,
          width,
          height
        });
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['canvas5'],
          content: JSON.stringify({
            width,
            height,
            length: data.length
          })
        })
      },

      fail: err => {
        wx.showToast({
          icon: 'none',
          title: i18n['canvas6']
        })
        console.log('err:', err)
      }
    })
  },

  createLinearGradient() {
    const ctx = wx.createCanvasContext('myCanvas')

    // Create circular gradient
    const grd = ctx.createLinearGradient(30, 10, 120, 10)
    grd.addColorStop(0, 'red')
    grd.addColorStop(0.16, 'orange')
    grd.addColorStop(0.33, 'yellow')
    grd.addColorStop(0.5, 'green')
    grd.addColorStop(0.66, 'cyan')
    grd.addColorStop(0.83, 'blue')
    grd.addColorStop(1, 'purple')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },

  onStart(e) {
    console.log('=====onStart', e)
  },
  onMove(e) {
    console.log('=====onMove', e)
  },
  onEnd(e) {
    console.log('=====onEnd', e)
  },
  onLongtap(e) {
    console.log('=====onLongtap', e)
  },
  onError(e) {
    console.log('=====onError', e)
  }
})
