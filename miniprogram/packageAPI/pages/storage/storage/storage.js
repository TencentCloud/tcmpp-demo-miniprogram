import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['storage0'],
      path: 'packageAPI/pages/storage/storage/storage'
    }
  },

  data: {
    theme: 'light',
    key: '',
    data: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    },
    batchResult: ''
  },

  keyChange(e) {
    this.data.key = e.detail.value
  },

  dataChange(e) {
    this.data.data = e.detail.value
  },

  getStorage() {
    const { key, data } = this.data
    let storageData

    if (key.length === 0) {
      this.setData({
        key,
        data
      })
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['storage1'],
        content: i18n['storage2']
      })
    } else {
      storageData = wx.getStorageSync(key)
      console.log(storageData)
      if (storageData === '') {
        this.setData({
          key,
          data: storageData
        })
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['storage3'],
          content: i18n['storage4']
        })
      } else {
        this.setData({
          key,
          data: storageData
        })
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['storage5'],
          content: storageData
        })
      }
    }
  },

  setStorage() {
    const { key, data } = this.data
    if (key.length === 0) {
      this.setData({
        key,
        data
      })
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['storage6'],
        content: i18n['storage7']
      })
    } else {
      wx.setStorageSync(key, data)
      this.setData({
        key,
        data

      })
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['storage8']
      })
    }
  },

  clearStorage() {
    wx.clearStorageSync()
    this.setData({
      key: '',
      data: ''
    })
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['storage9']
    })
  },

  batchSetStorage() {
    wx.batchSetStorage({
      kvList: [
        {
          key: 'TMF1',
          value: { version: '1.0.1', developer: 'TMF1' }
        },
        {
          key: 'TMF2',
          value: { version: '1.0.2', developer: 'TMF2' }
        },
        {
          key: 'TMF3',
          value: { version: '1.0.3', developer: 'TMF3' }
        }
      ],
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },

  batchSetStorageSync() {
    wx.batchSetStorageSync([
      {
        key: 'TMF3',
        value: { version: '1.0.3', developer: 'TMF3_Sync' }
      },
      {
        key: 'TMF4',
        value: { version: '1.0.4', developer: 'TMF4' }
      }
    ]);
  },

  batchGetStorage() {
    wx.batchGetStorage({
      keyList: ['TMF1', 'TMF2', 'TMF3'],
      success: (res) => {
        console.log('success>>>>>>>>', res);
      },
      fail: (res) => {
        console.log('fail', res);
      },
      complete: (res) => {
        this.setData({ batchResult: JSON.stringify(res.dataList) });
      }
    });
  },

  batchGetStorageSync() {
    const valueList = wx.batchGetStorageSync(['TMF3']);
    console.log('batchGetStorageSync>>>>>>', valueList)
    this.setData({ batchResult: JSON.stringify(valueList) });
  },

  saveObject() {
    wx.setStorage({
      key: 'TMF',
      data: { version: '1.0.0', developer: 'lfw' },
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  saveBoolean() {
    wx.setStorage({
      key: 'caniuse',
      data: true,
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  saveNumber() {
    wx.setStorage({
      key: 'num',
      data: 10,
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  saveString() {
    wx.setStorage({
      key: 'text',
      data: 'TMF',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  saveArray() {
    wx.setStorage({
      key: 'arr',
      data: [1, '2', { a: '1' }, false],
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  syncSaveObject() {
    wx.setStorageSync('TMF', { version: '1.1.1', developer: 'lfwlfw' });
  },
  syncSaveBoolean() {
    wx.setStorageSync('caniuse', true);
  },
  syncSaveNumber() {
    wx.setStorageSync('num', 10);
  },
  syncSaveString() {
    wx.setStorageSync('text', 'TMF');
  },
  syncSaveArray() {
    wx.setStorageSync('arr', [1, '2', { a: '1' }, false]);
  },
  getObject() {
    const that = this;
    wx.getStorage({
      key: 'TMF',
      success(res) {
        console.log('success>>>>>>>>', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        const result = { result: res, type: typeof res.data };
        that.setData({ result: JSON.stringify(result) });
      }
    });
  },
  getBoolean() {
    const that = this;
    wx.getStorage({
      key: 'caniuse',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
        const result = { result: res, type: typeof res.data };
        that.setData({ result: JSON.stringify(result) });
      }
    });
  },
  getNumber() {
    const that = this;
    wx.getStorage({
      key: 'num',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
        const result = { result: res, type: typeof res.data };
        that.setData({ result: JSON.stringify(result) });
      }
    });
  },
  getString() {
    const that = this;
    wx.getStorage({
      key: 'text',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
        const result = { result: res, type: typeof res.data };
        that.setData({ result: JSON.stringify(result) });
      }
    });
  },
  getArray() {
    const that = this;
    wx.getStorage({
      key: 'arr',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
        const result = { result: res, type: Array.isArray(res.data) ? 'array' : undefined };
        that.setData({ result: JSON.stringify(result) });
      }
    });
  },
  syncGetObject() {
    const data = wx.getStorageSync('TMF');
    console.log('getStorageSync>>>>>', data);
    const res = { result: data, type: typeof data };
    this.setData({ result: JSON.stringify(res) });
  },
  syncGetBoolean() {
    const data = wx.getStorageSync('caniuse');
    console.log('getStorageSync>>>>>', data);
    const res = { result: data, type: typeof data };
    this.setData({ result: JSON.stringify(res) });
  },
  syncGetNumber() {
    const data = wx.getStorageSync('num');
    console.log('getStorageSync>>>>>', data);
    const res = { result: data, type: typeof data };
    this.setData({ result: JSON.stringify(res) });
  },
  syncGetString() {
    const data = wx.getStorageSync('text');
    console.log('getStorageSync>>>>>', data);
    const res = { result: data, type: typeof data };
    this.setData({ result: JSON.stringify(res) });
  },
  syncGetArray() {
    const data = wx.getStorageSync('arr');
    console.log('getStorageSync>>>>>', data);
    const res = { result: data, type: Array.isArray(data) ? 'array' : undefined };
    this.setData({ result: JSON.stringify(res) });
  },
  delObject() {
    wx.removeStorage({
      key: 'TMF',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  delBoolean() {
    wx.removeStorage({
      key: 'caniuse',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  delNumber() {
    wx.removeStorage({
      key: 'num',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  delString() {
    wx.removeStorage({
      key: 'text',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  delArray() {
    wx.removeStorage({
      key: 'arr',
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  syncDelObject() {
    wx.removeStorageSync('TMF');
  },
  syncDelBoolean() {
    wx.removeStorageSync('caniuse');
  },
  syncDelNumber() {
    wx.removeStorageSync('num');
  },
  syncDelString() {
    wx.removeStorageSync('text');
  },
  syncDelArray() {
    wx.removeStorageSync('arr');
  },
  remove() {
    wx.clearStorage({
      success(res) {
        console.log('success', res);
      },
      fail(res) {
        console.log('fail', res);
      },
      complete(res) {
        console.log('complete', res);
      }
    });
  },
  syncRemove() {
    wx.clearStorageSync();
  },
  getStorageInfo() {
    wx.getStorageInfo({
      success: (option) => {
        console.log('getStorageInfo', option)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['storage10'],
          content: JSON.stringify(option)
        })
      }
    })
  },
  getStorageInfoSync() {
    const storage = wx.getStorageInfoSync();
    console.log('getStorageInfoSync>>>>>>', storage);
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: i18n['storage11'],
      content: JSON.stringify(storage)
    })
    // this.setData({ result: JSON.stringify(storage) });
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['storage0']
    })
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
