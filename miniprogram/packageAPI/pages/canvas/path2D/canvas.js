import { compareVersion, canvasMinVersion } from '../../../../util/util'
Page({
  onShareAppMessage() {
    return {
      title: 'Path2D',
      path: 'packageAPI/pages/canvas/Path2D/canvas'
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

    // Drawing circles - start
    const circle = this.canvas.createPath2D();
    circle.arc(150, 150, 50, 0, 2 * Math.PI);
    ctx.fillStyle = '#674ea7';
    ctx.fill(circle);


    const angle = (Math.PI * 2) / 12;
    let angleCounter = 0;

    this.interval = setInterval(() => {
      angleCounter = angleCounter + angle;
      let cheese = this.drawCircle(150, 150, 5, angleCounter, 50);
      let color = '#ff9966';
      if (angleCounter > 180) {
        color = 'pink';
      }
      ctx.fillStyle = color;
      ctx.fill(cheese);
    }, 500);

    // Drawing circles - end
  },

  drawCircle(cx, cy, width, angle, originRadius) {
    const dot = this.canvas.createPath2D();
    var x = cx + originRadius * Math.cos(angle);
    var y = cy + originRadius * Math.sin(angle)
    dot.arc(x, y, width, 0, 2 * Math.PI);
    return dot;
  },

  onUnload() {
    clearInterval(this.interval)
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
