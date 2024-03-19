import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Audio-add',
      path: 'packageAPI/pages/media/audio-add/audio-add'
    }
  },
  onReady() {
    const query = wx.createSelectorQuery();
    query.select('#mycanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        this.canvas = res[0].node;
        this.ctx = this.canvas.getContext('2d');
      })
  },
  data: {
    theme: 'light',
    audioSources: '',
    state: '',
    currentTime: '',
    sampleRate: '',
    positionX: '',
    positionY: '',
    positionZ: '',
    forwardX: '',
    forwardY: '',
    forwardZ: '',
    upX: '',
    upY: '',
    upZ: '',
    length: '',
    duration: '',
    numberOfChannels: ''
  },
  getAvailableAudioSources() {
    wx.getAvailableAudioSources({
      success: (res) => {
        this.setData({
          audioSources: res.audioSources.join(',')
        })
        console.log('getAvailableAudioSources===success', res)
      },
      fail: (err) => {
        wx.showToast({
          title: i18n['audio-add0'],
          icon: 'error'
        })
        console.log('getAvailableAudioSources===fail', err)
      }
    })
  },
  createBuffer() {
    // 停掉之前mp3的音频
    this.bufferSourceNode && this.bufferSourceNode.disconnect()
    const audioCtx = wx.createWebAudioContext()
    // 立体声
    const channels = 2;
    // 创建一个 采样率与音频环境 (AudioContext) 相同的 时长 2 秒的 音频片段。
    const frameCount = audioCtx.sampleRate * 2.0;

    const audioBuffer = audioCtx.createBuffer(
      channels,
      frameCount,
      audioCtx.sampleRate,
    );

    this.setData({
      sampleRate: audioBuffer.sampleRate,
      length: audioBuffer.length,
      duration: audioBuffer.duration,
      numberOfChannels: audioBuffer.numberOfChannels
    })

    // 使用白噪声填充;
    // 就是 -1.0 到 1.0 之间的随机数
    for (let channel = 0; channel < channels; channel++) {
      // 这允许我们读取实际音频片段 (AudioBuffer) 中包含的数据
      const nowBuffering = audioBuffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        nowBuffering[i] = Math.random() * 2 - 1;
      }
    }

    // 获取一个 音频片段源节点 (AudioBufferSourceNode)。
    // 当我们想播放音频片段时，我们会用到这个源节点。
    const source = audioCtx.createBufferSource();
    // 把刚才生成的片段加入到 音频片段源节点 (AudioBufferSourceNode)。
    source.buffer = audioBuffer;
    // 把 音频片段源节点 (AudioBufferSourceNode) 连接到
    // 音频环境 (AudioContext) 的终节点，这样我们就能听到声音了。
    source.connect(audioCtx.destination);
    // 开始播放声源
    source.start();
  },
  copyFromToChannel() {
    const audioCtx = wx.createWebAudioContext()
    // 创建一个 采样率与音频环境 (AudioContext) 相同的 时长 2 秒的 音频片段。
    const frameCount = audioCtx.sampleRate * 2.0;
    const myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
    const anotherArray = new Float32Array();
    // Copy channel data from second channel of myArrayBuffer.
    myArrayBuffer.copyFromChannel(anotherArray, 1, 0);
    // Copy data from anotherArray to first channel of myArrayBuffer. Both channels have the same data now.
    myArrayBuffer.copyToChannel(anotherArray, 0, 0);

    const isEqual = this.areChannelsEqual(myArrayBuffer, 0, 1)
    wx.showModal({
      title: '提示',
      content: `复制后两个通道数据${isEqual ? '相同': '不相同'}`,
    })
  },
  areChannelsEqual(buffer, channelIndex1, channelIndex2) {
    const data1 = buffer.getChannelData(channelIndex1);
    const data2 = buffer.getChannelData(channelIndex2);

    // 判断两个通道的数据是否相同
    for (let i = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i]) {
        return false; // 只要有一个样本不相同就返回 false
      }
    }
    return true; // 所有样本都相同
  },
  createWebAudioContext() {
    if(this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    } else {
      this.audioCtx = wx.createWebAudioContext()
      console.log('WebAudioContext===', this.audioCtx)

      const audioListener = this.audioCtx.listener
      console.log('AudioListener===', this.audioCtx.listener)
      this.setData({
        sampleRate: this.audioCtx.sampleRate,
        positionX: audioListener.positionX.value,
        positionY: audioListener.positionY.value,
        positionZ: audioListener.positionZ.value,
        forwardX: audioListener.forwardX.value,
        forwardY: audioListener.forwardY.value,
        forwardZ: audioListener.forwardZ.value,
        upX: audioListener.upX.value,
        upY: audioListener.upY.value,
        upZ: audioListener.upZ.value,
      })

      this.audioCtx.onstatechange = () => {
        this.setData({
          state: this.audioCtx.state,
        })
      }
      this.sourceCache = new Set()
      this.play()
    }
  },
  loadAudio(url) {
    return new Promise((resolve) => {
      wx.request({
        url,
        responseType: 'arraybuffer',
        success: res => {
          console.log('loadAudio res.data===', res.data)
          this.audioCtx.decodeAudioData(res.data, buffer => {
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
  play() {
    this.loadAudio('https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3').then(buffer => {
      this.bufferSourceNode = this.audioCtx.createBufferSource()
      console.log('BufferSourceNode===', this.bufferSourceNode)
      this.bufferSourceNode.buffer = buffer
      this.bufferSourceNode.loop = true
      this.bufferSourceNode.loopStart = 10
      this.bufferSourceNode.loopEnd = 60
      this.bufferSourceNode.connect(this.audioCtx.destination)
      this.sourceCache.add(this.bufferSourceNode) // Tips：Cache the source to prevent it from being garbage collected. If GC occurs, audio may be interrupted.
      this.bufferSourceNode.onended = () => {
        this.sourceCache.delete(this.bufferSourceNode) // Tips: After playback, clear the source cache.
      }
      this.bufferSourceNode.start()
      wx.showToast({
        title: i18n['audio-add1'],
        icon: 'success'
      })
    }).catch(() => {
      console.log('loadAudio fail')
    })
  },
  suspend() {
    this.audioCtx.suspend()
  },
  resume() {
    this.audioCtx.resume()
  },
  close() {
    this.audioCtx.close()
  },
  fast() {
    if(this.bufferSourceNode.playbackRate.value < 2) {
      this.bufferSourceNode.playbackRate.value += 0.1
    }
  },
  slow() {
    if(this.bufferSourceNode.playbackRate.value > 0) {
      this.bufferSourceNode.playbackRate.value -= 0.1
    }
  },
  stop() {
    this.bufferSourceNode.stop()
  },
  getCurrentTime() {
    this.setData({
      currentTime: this.audioCtx.currentTime
    })
  },
  cancelRequestId() {
    this.canvas.cancelAnimationFrame(this.requestId);
  },
  createAnalyser() {
    if(!this.audioCtx) {
      wx.showModal({
        title: '提示',
        content: '请先创建WebAudioContext',
      })
      return
    }
    const analyserNode = this.audioCtx.createAnalyser();
    this.bufferSourceNode.connect(analyserNode);

    analyserNode.fftSize = 2048;
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

     // 绘制当前音频源的波形图
    const draw = () => {
      this.requestId = this.canvas.requestAnimationFrame(draw);

      // 在每一帧中获取最新的音频数据
      analyserNode.getByteTimeDomainData(dataArray);

      this.ctx.fillStyle = "rgb(200, 200, 200)";
      this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "rgb(0, 0, 0)";

      this.ctx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * HEIGHT) / 2;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
      this.ctx.stroke();
    };

    draw();
  },
  createBiquadFilter() {
    if(!this.audioCtx) {
      wx.showModal({
        title: '提示',
        content: '请先创建WebAudioContext',
      })
      return
    }
    const biquadFilterNode = this.audioCtx.createBiquadFilter();
    // 设置滤波器的类型为低频增强滤波器
    biquadFilterNode.type = 'lowshelf';
    // 设置滤波器的截止频率为 1000 Hz
    biquadFilterNode.frequency.value = 1000;
    // 表示该滤波器会对通过的信号进行 25 倍的放大(增益值的大小会影响滤波器对特定频率的信号的放大或减小程度)
    biquadFilterNode.gain.value = 25;

    // 连接音频源和滤波器
    this.bufferSourceNode.connect(biquadFilterNode);
    // 连接滤波器和音频上下文的目标节点（输出设备）
    biquadFilterNode.connect(this.audioCtx.destination)
  },
  async createMediaAudioPlayer() {
    // Create a video decoder, see the CreateVideoDecoder documentation for the specific parameters
    this.videoDecoder = wx.createVideoDecoder()
    console.log('VideoDecoder===', this.videoDecoder)
    // Create media audio player
    this.mediaAudioPlayer = wx.createMediaAudioPlayer()
    console.log('MediaAudioPlayer===', this.mediaAudioPlayer)
    // Choose a video
    const {
      tempFiles: [{ tempFilePath }]
    } = await wx.chooseMedia({
      mediaType: ['video'],
      count: 1
    })
    // Start the video decoder
    await this.videoDecoder.start({
      abortVideo: true,
      source: tempFilePath
    })

    let ended = false

    this.videoDecoder.on('ended', () => {
      ended = true
    })

    // Add a player audio source
    this.mediaAudioPlayer.addAudioSource(this.videoDecoder).then(res => {
      this.videoDecoder.getFrameData() // It is recommended to get each frame of video data in requestAnimationFrame
      console.log('addAudioSource===', res)
    })

    // Set the volume of player
    this.mediaAudioPlayer.volume = 0.5
  },
  removeAudioSource() {
    if (!this.mediaAudioPlayer) {
      wx.showToast({
        title: i18n['audio-add2'],
        icon: 'error'
      })
      return
    }
    // Remove audio source from the player
    this.mediaAudioPlayer.removeAudioSource(this.videoDecoder).then(res => {
      wx.showToast({
        title: i18n['audio-add3'],
        icon: 'success'
      })
      console.log('removeAudioSource===', res)
    })
  },
  startMediaAudioPlayer() {
    if (!this.mediaAudioPlayer) {
      wx.showToast({
        title: i18n['audio-add4'],
        icon: 'error'
      })
      return
    }
    // Start the audio player
    this.mediaAudioPlayer.start().then((res) => {
      wx.showToast({
        title: i18n['audio-add5'],
        icon: 'success'
      })
      console.log('startMediaAudioPlayer===', res)
    })
  },
  stopMediaAudioPlayer() {
    if (!this.mediaAudioPlayer) {
      wx.showToast({
        title: i18n['audio-add6'],
        icon: 'error'
      })
      return
    }
    // Stop the audio player
    this.mediaAudioPlayer.stop().then(res => {
      wx.showToast({
        title: i18n['audio-add7'],
        icon: 'success'
      })
      console.log('stopMediaAudioPlayer===', res)
    })
  },
  destroyMediaAudioPlayer() {
    if (!this.mediaAudioPlayer) {
      wx.showToast({
        title: i18n['audio-add8'],
        icon: 'error'
      })
      return
    }
    // Destroy the audio player
    this.mediaAudioPlayer.destroy().then(res => {
      this.mediaAudioPlayer = null
      wx.showToast({
        title: i18n['audio-add9'],
        icon: 'success'
      })
      console.log('destroyMediaAudioPlayer===', res)
    })
  },
  onUnload() {
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['audio-add10']
    })
    this.setData({
      t: i18n,
      lang,
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  }
})