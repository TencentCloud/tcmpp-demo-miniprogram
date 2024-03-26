// packageAPI/pages/media/audio-add2/audio-add2.js
import { i18n } from '../../../../i18n/lang'
Page({

  /**
   * Initial data of the page
   */
  data: {
    t: i18n,
    isAdd: false,
    isFilter: false,
    isPanner: false
  },
  createDealBefore() {
    this.audioCtxB = wx.createWebAudioContext()

    this.audioCtxB.onstatechange = () => {
      this.setData({
        state: this.audioCtxB.state
      })
    }
    this.sourceCacheB = new Set()
    this.playB()
  },
  playB() {
    this.loadAudio('https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3', this.audioCtxB).then(buffer => {
      this.bufferSourceNodeB = this.audioCtxB.createBufferSource()
      this.bufferSourceNodeB.buffer = buffer

      this.bufferSourceNodeB.connect(this.audioCtxB.destination)
      this.sourceCacheB.add(this.bufferSourceNodeB) // Tips: Cache the source to prevent it from being GC'd. If it's GC'd, the audio will be interrupted.
      this.bufferSourceNodeB.onended = () => {
        this.sourceCacheB.delete(this.bufferSourceNodeB) // Tips: After playback, clear the source cache.
      }
      this.bufferSourceNodeB.start()
      wx.showToast({
        title: i18n['audio-addTwo1'],
        icon: 'success'
      })  
    }).catch((err) => {
      console.log('loadAudio fail', err)
    })
  },
  suspendB() {
    this.audioCtxB.suspend()
  },
  resumeB() {
    this.audioCtxB.resume()
  },
  createDynamicsCompressor() {
    if(!this.compressor) {
      this.compressor = this.audioCtxB.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-50, this.audioCtxB.currentTime);
      this.compressor.knee.setValueAtTime(40, this.audioCtxB.currentTime);
      this.compressor.ratio.setValueAtTime(12, this.audioCtxB.currentTime);
      this.compressor.attack.setValueAtTime(0, this.audioCtxB.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioCtxB.currentTime);
    }
    if(this.data.isAdd) {
      this.setData({
        isAdd: false
      })
      this.bufferSourceNodeB.disconnect(this.compressor);
      this.compressor.disconnect(this.audioCtxB.destination);
      this.bufferSourceNodeB.connect(this.audioCtxB.destination);
    } else {
      this.setData({
        isAdd: true
      })
      // connect the AudioBufferSourceNode to the destination
      this.bufferSourceNodeB.disconnect(this.audioCtxB.destination);
      this.bufferSourceNodeB.connect(this.compressor);
      this.compressor.connect(this.audioCtxB.destination);
    }
  },
  createIIRFilter() {
    if(!this.iirFilter) {
      // Change this to change the filter - can be 0-3 and will reference the values in the array below
      const filterNumber = 1;
      const lowPassCoefs = [
        {
          frequency: 200,
          feedforward: [0.00020298, 0.0004059599, 0.00020298],
          feedback: [1.0126964558, -1.9991880801, 0.9873035442]
        },
        {
          frequency: 500,
          feedforward: [0.0012681742, 0.0025363483, 0.0012681742],
          feedback: [1.0317185917, -1.9949273033, 0.9682814083]
        },
        {
          frequency: 1000,
          feedforward: [0.0050662636, 0.0101325272, 0.0050662636],
          feedback: [1.0632762845, -1.9797349456, 0.9367237155]
        },
        {
          frequency: 5000,
          feedforward: [0.1215955842, 0.2431911684, 0.1215955842],
          feedback: [1.2912769759, -1.5136176632, 0.7087230241]
        }
      ];
      const feedForward = lowPassCoefs[filterNumber].feedforward
      const feedBack = lowPassCoefs[filterNumber].feedback
      this.iirFilter = this.audioCtxB.createIIRFilter(feedForward, feedBack)
    }
    if(this.data.isFilter) {
      this.setData({
        isFilter: false
      })
      this.bufferSourceNodeB.disconnect(this.iirFilter);
      this.bufferSourceNodeB.connect(this.audioCtxB.destination);
    } else {
      this.setData({
        isFilter: true
      })
      // connect the AudioBufferSourceNode to the destination
      this.bufferSourceNodeB.disconnect(this.audioCtxB.destination);
      this.bufferSourceNodeB.connect(this.iirFilter).connect(this.audioCtxB.destination);
    }
  },
  createPanner() {
    if(!this.panner) {
      const listener = this.audioCtxB.listener;
      this.panner = this.audioCtxB.createPanner();

      this.panner.panningModel = 'HRTF';
      this.panner.distanceModel = 'inverse';
      this.panner.refDistance = 1;
      this.panner.maxDistance = 10000;
      this.panner.rolloffFactor = 1;
      this.panner.coneInnerAngle = 360;
      this.panner.coneOuterAngle = 0;
      this.panner.coneOuterGain = 0;

      if (this.panner.orientationX) {
        this.panner.orientationX.setValueAtTime(1, this.audioCtxB.currentTime);
        this.panner.orientationY.setValueAtTime(0, this.audioCtxB.currentTime);
        this.panner.orientationZ.setValueAtTime(0, this.audioCtxB.currentTime);
      } else {
        this.panner.setOrientation(1, 0, 0);
      }

      if (!listener.forwardX) {
        // Deprecated but still needed (July 2022)
        listener.setOrientation(0, 0, -1, 0, 1, 0);
      } else {
        // Standard way
        listener.forwardX.value = 0;
        listener.forwardY.value = 0;
        listener.forwardZ.value = -1;
        listener.upX.value = 0;
        listener.upY.value = 1;
        listener.upZ.value = 0;
      }

      // listener will always be in the same place for this demo
      if (!listener.positionX) {
        // Deprecated but still needed (July 2022)
        listener.setPosition(this.xPos, this.yPos, 300);
      } else {
        // Standard way
        listener.positionX.value = this.xPos;
        listener.positionY.value = this.yPos;
        listener.positionZ.value = 300;
      }
    }

    if(this.data.isPanner) {
      this.setData({
        isPanner: false
      })
      this.bufferSourceNodeB.disconnect(this.panner);
      this.bufferSourceNodeB.connect(this.audioCtxB.destination);
    } else {
      this.setData({
        isPanner: true
      })
      this.bufferSourceNodeB.disconnect(this.audioCtxB.destination);
      this.bufferSourceNodeB.connect(this.panner)
      // connect the AudioBufferSourceNode to the destination
      this.panner.connect(this.audioCtxB.destination);
      this.positionPanner();
    }
  },
  // panner will move as the boombox graphic moves around on the screen
  positionPanner() {
    this.panner.positionX.value = this.xPos;
    this.panner.positionY.value = this.yPos;
    this.panner.positionZ.value = this.zPos;
  },
  // controls to move left and right past the boom box and zoom in and out
  moveRight() {
    if(!this.panner) {
      this.createPanner();
    }
    this.boomX -= this.xIterator;
    this.xPos -= 1;

    if (this.boomX <= this.leftBound) {
      this.boomX = this.leftBound;
      this.xPos = this.WIDTH / 2 - 5;
    }
    this.positionPanner();
  },
  moveLeft() {
    if(!this.panner) {
      this.createPanner();
    }
    this.boomX += this.xIterator;
    this.xPos += 1;

    if (this.boomX > this.rightBound) {
      this.boomX = this.rightBound;
      this.xPos = this.WIDTH / 2 + 5;
    }
    this.positionPanner();
  },
  zoomIn() {
    if(!this.panner) {
      this.createPanner();
    }
    this.boomZoom += 0.05;
    this.zPos += 0.5;

    if (this.boomZoom > 4) {
      this.boomZoom = 4;
      this.zPos = 299.9;
    }

    this.positionPanner();
  },
  zoomOut() {
    if(!this.panner) {
      this.createPanner();
    }
    this.boomZoom -= 0.05;
    this.zPos -= 0.5;

    if (this.boomZoom <= 0.5) {
      this.boomZoom = 0.5;
      this.zPos = 295;
    }
    this.positionPanner();
  },
  createDealAfter() {
    this.audioCtx = wx.createWebAudioContext()

    this.audioCtx.onstatechange = () => {
      this.setData({
        state: this.audioCtx.state
      })
    }
    this.sourceCache = new Set()
    this.playA()
  },
  loadAudio(url, context) {
    return new Promise((resolve) => {
      wx.request({
        url,
        responseType: 'arraybuffer',
        success: res => {
          context.decodeAudioData(res.data, buffer => {
            console.log('decodeAudioData success', buffer)
            resolve(buffer)
          }, err => {
            console.error('decodeAudioData fail', err)
            reject()
          })
        },
        fail: res => {
          console.error('loadAudio request fail', res)
          reject()
        }
      })
    })
  },
  playA() {
    this.loadAudio('https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3', this.audioCtx).then(buffer => {
      this.bufferSourceNode = this.audioCtx.createBufferSource()
      console.log('BufferSourceNode===', this.bufferSourceNode)
      this.bufferSourceNode.buffer = buffer

      const channelSplitterNode = this.audioCtx.createChannelSplitter(2);
      this.bufferSourceNode.connect(channelSplitterNode);
      const channelMergerNode = this.audioCtx.createChannelMerger(2);

      // Reduce the volume of the left channel only
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = 0.1;
      channelSplitterNode.connect(gainNode, 0);

      // Connect the splitter back to the second input of the merger: we
      // effectively swap the channels, here, reversing the stereo image.
      gainNode.connect(channelMergerNode, 0, 1);
      channelSplitterNode.connect(channelMergerNode, 1, 0);

      channelMergerNode.connect(this.audioCtx.destination)
      this.sourceCache.add(this.bufferSourceNode) // Tips: Cache the source to prevent it from being GC'd. If it's GC'd, the audio will be interrupted.
      this.bufferSourceNode.onended = () => {
        this.sourceCache.delete(this.bufferSourceNode) // Tips: After playback, clear the source cache.
      }
      this.bufferSourceNode.start()
      wx.showToast({
        title: i18n['audio-addTwo1'],
        icon: 'success'
      }) 
    }).catch((err) => {
      console.log('loadAudio fail', err)
    })
  },
  suspend() {
    this.audioCtx.suspend()
  },
  resume() {
    this.audioCtx.resume()
  },
  createConstantSource() {
    this.audioCtxC = wx.createWebAudioContext()
    // Create a ConstantSourceNode
    const constantSourceNode = this.audioCtxC.createConstantSource();

    // Set the value of the audio signal
    constantSourceNode.offset.value = 0.5; // Set to 0.5, adjust as needed

    // Connect to the target (here connected to the audio destination, can be connected to other audio nodes in actual application)
    constantSourceNode.connect(this.audioCtxC.destination);

    // Start ConstantSourceNode
    constantSourceNode.start();

    // Stop audio after a certain time
    setTimeout(() => {
      constantSourceNode.stop();
    }, 3000); // Stop audio playback
  },
  createOscillator() {
    this.audioCtxD = wx.createWebAudioContext()

    // Define sample points of periodic waveform
    const real = [0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2];
    const imag = new Float32Array(real.length).fill(0);

    // Create a periodic waveform
    const periodicWave = this.audioCtxD.createPeriodicWave(real, imag);

    // Create an OscillatorNode
    const oscillator = this.audioCtxD.createOscillator();

    oscillator.setPeriodicWave(periodicWave);

    // Create a wave shaper node
    const waveShaper = this.audioCtxD.createWaveShaper();

    // Set the waveform curve
    const curve = new Float32Array([0, 0.25, 0.5, 0.75, 1]);
    waveShaper.curve = curve;

    // Create a DelayNode
    const delay = this.audioCtxD.createDelay();

    // Set waveform type (here choose sine wave)
    // oscillator.type = 'sine';

    // Set frequency and volume
    oscillator.frequency.value = 440; // Set frequency to 440 Hz, adjust as needed
    oscillator.detune.value = 0; // Set pitch offset

    // Set delay time
    delay.delayTime.value = 0.5; // 0.5 seconds delay, adjust as needed

    // Connect nodes
    oscillator.connect(waveShaper);
    // Connect oscillator node to wave shaper node
    waveShaper.connect(delay);
    delay.connect(this.audioCtxD.destination); // Connect to audio destination

    // Start OscillatorNode
    oscillator.start();

    // Stop audio after a certain time
    setTimeout(() => {
      oscillator.stop();
    }, 3000); // Stop audio playback
  },
  /**
   * Page lifecycle--on page load
   */
  onLoad(options) {
    const WIDTH = 1450;
    const HEIGHT = 1300;
  
    this.xPos = Math.floor(WIDTH / 2);
    this.yPos = Math.floor(HEIGHT / 2);
    this.zPos = 295;
    this.boomX = 0;
    this.boomZoom = 0.5;
    this.xIterator = WIDTH / 150;
    this.leftBound = 50 - this.xPos;
    this.rightBound = this.xPos - 50;
    
    this.setData({
      t: i18n
    })
  },

  /**
   * Page lifecycle--on initial rendering completion
   */
  onReady() {

  },

  /**
   * Page lifecycle--on page display
   */
  onShow() {

  },

  /**
   * Page lifecycle--on page hide
   */
  onHide() {

  },

  /**
   * Page lifecycle--on page unload
   */
  onUnload() {

  },

  /**
   * Page-related event handling functions--listen for user pull-down actions
   */
  onPullDownRefresh() {

  },

  /**
   * Page-related event handling functions--handle page bottom pull-up events
   */
  onReachBottom() {

  },

  /**
   * User clicks on the top right corner to share
   */
  onShareAppMessage() {

  }
})