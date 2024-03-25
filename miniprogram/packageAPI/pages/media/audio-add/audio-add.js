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
    // Stop the previous mp3 audio
    this.bufferSourceNode && this.bufferSourceNode.disconnect()
    const audioCtx = wx.createWebAudioContext()
    // Stereo
    const channels = 2;
    // Create an audio clip with a duration of 2 seconds, having the same sample rate as the audio context.
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

    // Fill with white noise;
    // It's a random number between -1.0 and 1.0.
    for (let channel = 0; channel < channels; channel++) {
      // This allows us to read the data contained in the actual audio clip (AudioBuffer).
      const nowBuffering = audioBuffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        nowBuffering[i] = Math.random() * 2 - 1;
      }
    }

    // Get an audio clip source node (AudioBufferSourceNode).
    // We'll use this source node when we want to play the audio clip.
    const source = audioCtx.createBufferSource();
    // Add the generated clip to the audio clip source node (AudioBufferSourceNode).
    source.buffer = audioBuffer;
    // Connect the audio clip source node (AudioBufferSourceNode) to
    // the destination node of the audio context (AudioContext), so we can hear the sound.
    source.connect(audioCtx.destination);
    // Start playing the audio source
    source.start();
  },
  copyFromToChannel() {
    const audioCtx = wx.createWebAudioContext()
    // Create an audio clip with a duration of 2 seconds, having the same sample rate as the audio context (AudioContext).
    const frameCount = audioCtx.sampleRate * 2.0;
    const myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
    const anotherArray = new Float32Array();
    // Copy channel data from second channel of myArrayBuffer.
    myArrayBuffer.copyFromChannel(anotherArray, 1, 0);
    // Copy data from anotherArray to first channel of myArrayBuffer. Both channels have the same data now.
    myArrayBuffer.copyToChannel(anotherArray, 0, 0);

    const isEqual = this.areChannelsEqual(myArrayBuffer, 0, 1)
    wx.showModal({
      title: i18n['audio-add11'],
      content: `${i18n['audio-add12']}${isEqual ? i18n['audio-add13']: i18n['audio-add14']}`
    })
  },
  areChannelsEqual(buffer, channelIndex1, channelIndex2) {
    const data1 = buffer.getChannelData(channelIndex1);
    const data2 = buffer.getChannelData(channelIndex2);

    // Check if the data of the two channels are the same
    for (let i = 0; i < data1.length; i++) {
      if (data1[i] !== data2[i]) {
        return false; // Return false if there is at least one sample that is not the same
      }
    }
    return true; // Return true if all samples are the same
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
        upZ: audioListener.upZ.value
      })

      this.audioCtx.onstatechange = () => {
        this.setData({
          state: this.audioCtx.state
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
  cancelAnimationFrame() {
    this.canvas.cancelAnimationFrame(this.requestId);
  },
  createAnalyser() {
    if(!this.audioCtx) {
      wx.showModal({
        title: i18n['audio-add15'],
        content: i18n['audio-add16']
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

    // Draw the waveform of the current audio source
    const draw = () => {
      this.requestId = this.canvas.requestAnimationFrame(draw);

      // Get the latest audio data in each frame
      analyserNode.getByteTimeDomainData(dataArray);

      this.ctx.fillStyle = 'rgb(200, 200, 200)';
      this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'rgb(0, 0, 0)';

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
        title: i18n['audio-add17'],
        content: i18n['audio-add18']
      })
      return
    }
    const biquadFilterNode = this.audioCtx.createBiquadFilter();
    // Set the filter type to low-frequency boost filter
    biquadFilterNode.type = 'lowshelf';
    // Set the cutoff frequency of the filter to 1000 Hz
    biquadFilterNode.frequency.value = 1000;
    // This indicates that the filter will amplify the passed signal by 25 times (the magnitude of the gain value affects the degree to which the filter amplifies or attenuates signals at specific frequencies)
    biquadFilterNode.gain.value = 25;

    // Connect the audio source and the filter
    this.bufferSourceNode.connect(biquadFilterNode);
    // Connect the filter and the target node of the audio context (output device)
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