// packageAPI/pages/media/audio-add2/audio-add2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    isFilter: false,
    isPanner: false,
  },
  createDealBefore() {
    this.audioCtxB = wx.createWebAudioContext()

    this.audioCtxB.onstatechange = () => {
      this.setData({
        state: this.audioCtxB.state,
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
      this.sourceCacheB.add(this.bufferSourceNodeB) // Tips：缓存住 source，防止被GC掉，GC掉的话音频会中断
      this.bufferSourceNodeB.onended = () => {
        this.sourceCacheB.delete(this.bufferSourceNodeB) // Tips：播放完之后，再清掉source缓存
      }
      this.bufferSourceNodeB.start()
      wx.showToast({
        title: 'Audio开始播放',
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

      this.panner.panningModel = "HRTF";
      this.panner.distanceModel = "inverse";
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
        state: this.audioCtx.state,
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
      this.sourceCache.add(this.bufferSourceNode) // Tips：缓存住 source，防止被GC掉，GC掉的话音频会中断
      this.bufferSourceNode.onended = () => {
        this.sourceCache.delete(this.bufferSourceNode) // Tips：播放完之后，再清掉source缓存
      }
      this.bufferSourceNode.start()
      wx.showToast({
        title: 'Audio开始播放',
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
    // 创建 ConstantSourceNode
    const constantSourceNode = this.audioCtxC.createConstantSource();

    // 设置音频信号的值
    constantSourceNode.offset.value = 0.5; // 设置为 0.5，可以根据需要调整

    // 连接到目标（这里连接到音频目标，实际应用中可以连接到其他音频节点）
    constantSourceNode.connect(this.audioCtxC.destination);

    // 启动 ConstantSourceNode
    constantSourceNode.start();

    // 在一定时间后停止音频
    setTimeout(() => {
      constantSourceNode.stop();
    }, 3000); // 停止音频播放
  },
  createOscillator() {
    this.audioCtxD = wx.createWebAudioContext()

    // 定义周期波形的样本点
    const real = [0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2];
    const imag = new Float32Array(real.length).fill(0);

    // 创建周期波形
    const periodicWave = this.audioCtxD.createPeriodicWave(real, imag);

    // 创建 OscillatorNode
    const oscillator = this.audioCtxD.createOscillator();

    oscillator.setPeriodicWave(periodicWave);

    // 创建波形整形器节点
    const waveShaper = this.audioCtxD.createWaveShaper();

    // 设置波形曲线
    const curve = new Float32Array([0, 0.25, 0.5, 0.75, 1]);
    waveShaper.curve = curve;

    // 创建 DelayNode
    const delay = this.audioCtxD.createDelay();

    // 设置波形类型（这里选择正弦波）
    // oscillator.type = 'sine';

    // 设置频率和音量
    oscillator.frequency.value = 440; // 设置频率为 440 Hz，可以调整
    oscillator.detune.value = 0; // 设置音调偏移

    // 设置延迟时间
    delay.delayTime.value = 0.5; // 0.5 秒的延迟，可以调整

    // 连接节点
    oscillator.connect(waveShaper);
    // 连接振荡器节点到波形整形器节点
    waveShaper.connect(delay);
    delay.connect(this.audioCtxD.destination); // 连接到音频目标

    // 启动 OscillatorNode
    oscillator.start();

    // 在一定时间后停止音频
    setTimeout(() => {
      oscillator.stop();
    }, 3000); // 停止音频播放
  },
  /**
   * 生命周期函数--监听页面加载
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})