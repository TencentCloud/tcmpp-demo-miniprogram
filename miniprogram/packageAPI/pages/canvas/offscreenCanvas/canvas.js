import { compareVersion, canvasMinVersion } from '../../../../util/util'
Page({
  onShareAppMessage() {
    return {
      title: 'OffscreenCanvas',
      path: 'packageAPI/pages/canvas/offscreenCanvas/canvas'
    }
  },
  data: {
    theme: 'light',
    canIUse: true
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
      wx.createSelectorQuery()
        .select('#canvas2D')
        .fields({
          node: true,
          size: true
        })
        .exec(this.init.bind(this))
    }
  },

  // Get off-screen image data
  async getImageData(url, width, height) {
    // Create an off-screen 2D canvas instance
    const offCanvas = wx.createOffscreenCanvas({ type: '2d', width, height })
    // Get context, make sure it is consistent with the type created
    const offContext = offCanvas.getContext('2d')

    // Create an image
    const image = offCanvas.createImage()
    // Wait for the image to load
    await new Promise((resolve, reject) => {
      image.onload = resolve  // Drawing logic for the image
      image.src = url
    })
    // Draw the image to the off-screen canvas
    offContext.clearRect(0, 0, width, height)
    offContext.drawImage(image, 100, 100, 200, 100)

    offContext.beginPath();
    offContext.arc(400, 150, 50, 0, 2 * Math.PI);
    offContext.stroke();
    // Get the data after drawing
    const imgData = offContext.getImageData(0, 0, width, height)
    return imgData
  },

  init(res) {
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

    this.getImageData('./car.png', this.canvas.width, this.canvas.height).then(imageData => {
      // Draw the off-screen canvas image onto a non-off-screen canvas
      ctx.putImageData(imageData, 0, 0)
    })
  },

  onUnload() {
    // clearInterval(this.interval)
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad() {


    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})
