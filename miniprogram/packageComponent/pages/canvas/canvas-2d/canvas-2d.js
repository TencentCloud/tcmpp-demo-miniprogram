import { log } from '../../../../util/util'
import { i18n, lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'canvas',
      path: 'packageComponent/pages/canvas/canvas-2d/canvas-2d'
    }
  },
  data: {
    t: i18n,
    lang,
    theme: 'light',
    canIUse: true
  },
  onShow() {
    // Address compatibility issues for base libraries below version 2.7.0
    const { SDKVersion } = wx.getSystemInfoSync()
    log(SDKVersion)
    this.position2D = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }
    this.x = -100
    this.init()
  },

  init(res) {
    // const width = res[0].width
    // const height = res[0].height

    // const canvas = res[0].node

    // Does not support 2D
    // if (!canvas) {
    //   this.setData({
    //     canIUse: false,
    //   })
    //   return
    // }

    // const dpr = wx.getSystemInfoSync().pixelRatio
    // canvas.width = 100 * dpr
    // canvas.height = 200 * dpr
    // ctx.scale(dpr, dpr)

    // const renderLoop = () => {
    //   this.render(canvas, ctx)
    //   canvas.requestAnimationFrame(renderLoop)
    // }
    // canvas.requestAnimationFrame(renderLoop)

    // const img = canvas.createImage()
    // img.onload = () => {
    //   this._img = img
    // }
    // img.src = './car.png'

    const ctx = wx.createCanvasContext('canvas2D')
    log('=====ctx', ctx)

    ctx.setStrokeStyle('#00ff00')
    ctx.setLineWidth(5)
    ctx.rect(0, 0, 200, 200)
    ctx.stroke()
    ctx.setStrokeStyle('#ff0000')
    ctx.setLineWidth(2)
    ctx.moveTo(160, 100)
    ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
    ctx.moveTo(140, 100)
    ctx.arc(100, 100, 40, 0, Math.PI, false)
    ctx.moveTo(85, 80)
    ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
    ctx.moveTo(125, 80)
    ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)
    ctx.stroke()
    ctx.draw()
  },

  render(canvas, ctx) {
    ctx.clearRect(0, 0, 305, 305)
    this.drawBall2D(ctx)
    this.drawCar(ctx)
  },

  drawBall2D(ctx) {
    const p = this.position2D
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    function ball(x, y) {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#1aad19'
      ctx.strokeStyle = 'rgba(1,1,1,0)'
      ctx.fill()
      ctx.stroke()
    }

    ball(p.x, 150)
    ball(150, p.y)
    ball(300 - p.x, 150)
    ball(150, 300 - p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)
  },

  drawCar(ctx) {
    if (!this._img) return
    if (this.x > 350) {
      this.x = -100
    }
    ctx.drawImage(this._img, this.x++, 150 - 25, 100, 50)
    ctx.restore()
  },

  onUnload() {
  },
  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
