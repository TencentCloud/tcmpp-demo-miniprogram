// packageAPI/pages/media/media-recorder/media-recorder.js
import { createScopedThreejs } from 'threejs-miniprogram'
import { i18n,lang } from '../../../../i18n/lang'
Page({
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['mediaRecorder0']
    })
    this.setData({
      t: i18n,
      lang
    })
  },
  videoError(e) {
    console.error(e)
  },
  async testWebglCanvas(canvas, targetProps) {
    try {
      console.log('--testWebglCanvas--', canvas);
      // this._render(canvas)
      const render = await this.drawWebGLCanvas(canvas)
      const fps = 24
      const recorder = wx.createMediaRecorder(canvas, {
        fps,
        videoBitsPerSecond: 1000
      })
      console.log('--recorder--', recorder);
      recorder.on('start', (e) => {
        console.log('----on start:', e)
      })
      recorder.on('stop', (e) => {
        console.log('----on stop:', e)
        this.setData({
          videoSrc1: e.tempFilePath
        })
      })
      recorder.on('timeupdate', (e) => {
        // console.log('----on timeupdate:', e)
      })
      let isPause = false
      recorder.on('pause', (e) => {
        console.log('----on pause:', e)
        isPause = true
      })
      recorder.on('resume', (e) => {
        console.log('----on resume:', e)
        isPause = false
      })
      const ons = await new Promise(resolve => {
        recorder.on('start', resolve)
        const r = recorder.start()
      })
      this.recorder = recorder
      let frames = fps * 15
      while (frames) {
        if (isPause) {
          await this.sleep(1000);
          continue;
        }
        render()
        frames--
        await new Promise(resolve => recorder.requestFrame(resolve))
      }
      const result = await new Promise(resolve => {
        recorder.on('stop', resolve)
        recorder.stop()
        console.log('---stop---')
      })
      console.log('stop result:', result, result.tempFilePath)

      recorder.destroy()

      this.setData({
        videoSrc1: result.tempFilePath
      })
    } catch (error) {
      console.log('testWebglCanvas', error);
    }
    console.log('videoSrc1:', this.data.videoSrc1)
  },

  async testMediaRecorderWithCanvas() {
    const query = wx.createSelectorQuery()
    try {
      query.select('#target1').node().exec((res) => {
        console.log('==== Obtained canvas node information', res)
        this.testWebglCanvas(
          // await this.getCanvasNode('target1'),
          res[0].node,
          'videoSrc1'
        )
      })
    } catch (error) {
      console.log('=====', error);
    }
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  testMediaRecorderPause() {
    if (this.recorder) {
      this.recorder.pause();
      console.warn('--------', 'pause')
    }
  },
  testMediaRecorderResume() {
    console.warn('--------1', 'resume')
    if (this.recorder) {
      this.recorder.resume();
      console.warn('--------', 'resume')
    }
  },

  getCanvasNode(id) {
    return new Promise((resolve) => {
      this.createSelectorQuery()
        .select('#' + id)
        .node(res => resolve(res.node))
        .exec();
    });
  },

  async drawWebGLCanvas(canvas) {
    console.log('---', canvas, canvas.width, canvas.height);
    const THREE = createScopedThreejs(canvas)
    var camera, scene, renderer;
    var mesh;
    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = await new Promise(resolve => new THREE.TextureLoader().load('../../../image/icon_foot_zh.png', resolve));
    texture.minFilter = THREE.LinearFilter
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(1);
    renderer.setSize(canvas.width, canvas.height);

    return function render() {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.1;
      renderer.render(scene, camera);
    }
  }
})