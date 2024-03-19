// packageAPI/pages/media/video-decoder/video-decoder.js
import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    height: 100
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['videoDecoder3']
    })
    this.setData({
      t: i18n,
      lang
    })
  },
  off() {
    if (!this.decoder) {
      wx.showToast({
        title: i18n['videoDecoder0'],
        icon: 'error'
      })
      return
    }
    this.decoder.off('bufferchange', this.bufferchangeCallback)
  },
  stop() {
    if (!this.decoder) {
      wx.showToast({
        title: i18n['videoDecoder0'],
        icon: 'error'
      })
      return
    }
    this.decoder.stop()
  },
  seek() {
    if (!this.decoder) {
      wx.showToast({
        title: i18n['videoDecoder0'],
        icon: 'error'
      })
      return
    }
    this.decoder.seek(2000)
  },
  bufferchangeCallback(res) {
    console.log('VideoDecoder.on===bufferchange', res)
  },
  async play() {
    const canvas = await this.getCanvasNode('target1')
    const windowInfo = await wx.getWindowInfo()

    const context = canvas.getContext('2d')

    // Choose a video
    const {
      tempFiles: [{ tempFilePath }]
    } = await wx.chooseMedia({
      mediaType: ['video'],
      count: 1
    })

    console.log('tempFilePath', tempFilePath)

    // Create a decoder
    this.decoder = wx.createVideoDecoder()

    console.log('VideoDecoder===', this.decoder)

    let ended = false

    this.decoder.on('start', (res) => {
      console.log('VideoDecoder.on===start', res)
    })

    this.decoder.on('stop', () => {
      console.log('VideoDecoder.on===stop')
    })

    this.decoder.on('seek', (res) => {
      console.log('VideoDecoder.on===seek', res)
    })

    this.decoder.on('bufferchange', this.bufferchangeCallback)

    this.decoder.on('ended', () => {
      console.log('VideoDecoder.on===ended')
      ended = true
    })

    await this.decoder.start({
      abortAudio: true,
      source: tempFilePath
    })

    let frameData

    // Wait for decoding to start
    do {
      await new Promise(resolve => canvas.requestAnimationFrame(resolve))
      frameData = this.decoder.getFrameData()
    } while (!frameData)

    // Set canvas width and height
    this.setData({
      height: (windowInfo.windowWidth * frameData.height) / frameData.width
    })
    canvas.height = frameData.height
    canvas.width = frameData.width

    const startTime = Date.now()

    const render = ({ data, width, height }) => {
      const imageData = canvas.createImageData(data, width, height)
      context.putImageData(imageData, 0, 0)
    }

    // Loop to draw decoding results
    do {
      if (frameData && frameData.pkPts <= Date.now() - startTime) {
        // Control to display after reaching the specified pts
        render(frameData)
        frameData = null
      } else {
        await new Promise(resolve => canvas.requestAnimationFrame(resolve))
        if (!frameData) frameData = this.decoder.getFrameData()
      }
    } while (!ended)

    console.log('ended')

    // Decoding is complete
    this.decoder.remove().then(() => {
      this.decoder = null
      wx.showToast({
        title: i18n['videoDecoder1'],
        icon: 'success'
      })
    })
  },
  getCanvasNode(id) {
    return new Promise(resolve => {
      this.createSelectorQuery()
        .select('#' + id)
        .node(res => resolve(res.node))
        .exec()
    })
  }
})
