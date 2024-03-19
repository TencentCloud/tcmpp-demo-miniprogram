import { compareVersion, canvasMinVersion } from '../../../../util/util'
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'canvasRenderingContext2D',
      path: 'packageAPI/pages/canvas/canvasRenderingContext2D/canvas'
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

    // Drawing a house - start
    // Set line width
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
    // Drawing a house - end
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
