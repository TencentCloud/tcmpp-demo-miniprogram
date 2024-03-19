import { compareVersion, canvasMinVersion } from '../../../../util/util'
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'canvas',
      path: 'packageAPI/pages/canvas/canvas/canvas'
    }
  },
  data: {
    theme: 'light',
    canIUse: true,
    isAnimation: true,
    dataUrl: ''
  },
  onShow() {
    setTimeout(() => {
      this._onReady()
    }, 200)
  },
  _onReady() {
    // Resolve compatibility issues with a base library version lower than the minimum required
    const { SDKVersion } = wx.getSystemInfoSync()
    console.log(SDKVersion)
    if (compareVersion(SDKVersion, canvasMinVersion) < 0) {
      console.log('SDKVersion===', SDKVersion)
      this.setData({
        canIUse: false
      })
    } else {
      // canvas2D
      this.position2D = {
        x: 150,
        y: 150,
        vx: 2,
        vy: 2
      }
      this.x = -100
      wx.createSelectorQuery()
        .select('#canvas2D')
        .fields({
          node: true,
          size: true
        })
        .exec(this.init.bind(this))
    }
  },

  animationFrame() {
    this.data.isAnimation ? this.canvas.cancelAnimationFrame(this.requestAnimation) : this.canvas.requestAnimationFrame(this.renderLoop)
    this.setData({
      isAnimation: !this.data.isAnimation
    })
  },

  createImageData() {
    const width = 300
    const height = 300
    const u8Arr = new Uint8ClampedArray(width * height * 4)
    for (var i = 0; i < u8Arr.length; i += 4) {
      u8Arr[i + 0] = 0
      u8Arr[i + 1] = 255
      u8Arr[i + 2] = 0
      u8Arr[i + 3] = 255
    }
    console.log('createImageData===', this.canvas.createImageData(u8Arr, width, height))
  },

  toDataURL() {
    const dataUrl = this.canvas.toDataURL('image/jpeg', 0.5)
    this.setData({
      dataUrl: dataUrl
    })
    console.log('toDataURL===', dataUrl)
  },

  async init(res) {
    const width = res[0].width
    const height = res[0].height

    this.canvas = res[0].node
    // Not supported in 2D
    if (!this.canvas) {
      this.setData({
        canIUse: false
      })
      return
    }
    const ctx = this.canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    this.canvas.width = width * dpr
    this.canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Drawing a moving car - start
    const img = this.canvas.createImage()
    img.onload = () => {
      this._img = img
    }
    // Local image
    img.src = './car.png'
    // Selected local image
    // const { tempFilePaths } = await wx.chooseImage({ count: 1 })
    // img.src = tempFilePaths[0]
    // Online image address
    // img.src = 'https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-pnw.jpeg'
    this.renderLoop = () => {
      this.render(this.canvas, ctx)
      this.requestAnimation = this.canvas.requestAnimationFrame(this.renderLoop)
    }
    this.canvas.requestAnimationFrame(this.renderLoop)
    // Drawing a moving car - end
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
    // clearInterval(this.interval)
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
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
