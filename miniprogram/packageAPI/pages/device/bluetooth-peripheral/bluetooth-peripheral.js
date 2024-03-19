// packageAPI/pages/device/bluetooth-peripheral/bluetooth-peripheral.js
function getUuid() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c) => {
        const num = Number(c);
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
      };
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (perforNow + random) % 16 | 0;
      perforNow = Math.floor(perforNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
};

function strToArrayBuffer(str) {
  const bufferArray = new ArrayBuffer(str.length);
  let bufferView = new Uint8Array(bufferArray);
  for (let i = 0; i < str.length; i++) {
    bufferView[i] = str.charCodeAt(i);
  }
  return bufferArray;
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    server: null,
    serviceId: '',
    characteristicId: '',
    devices: [],
    callbackId: null,
    connected: false
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['bluetooth-peripheral']
    })
    this.setData({
      t: i18n,
      lang,
      characteristicValue: i18n['bluetooth-peripheral0'],
      descriptorValue: i18n['bluetooth-peripheral1']
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
    this.openBluetoothAdapter()
  },
  bindKeyCharacteristic(e) {
    this.setData({
      characteristicValue: e.detail.value
    })
  },
  bindKeyDescriptor(e) {
    this.setData({
      descriptorValue: e.detail.value
    })
  },
  bindKeyServiceId(e) {
    this.setData({
      serviceId: e.detail.value
    })
  },
  bindKeyCharacteristicId(e) {
    this.setData({
      characteristicId: e.detail.value
    })
  },
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      mode: 'peripheral',
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
      },
      fail: (res) => {
        console.log(res)
        if (res.errCode === 10001) {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['bluetooth-peripheral2'],
            content: i18n['bluetooth-peripheral3'],
            showCancel: false
          })
        }
      }
    })
  },
  createBLEPeripheralServer() {
    wx.createBLEPeripheralServer({
      success: (res) => {
        this.data.devices.push(res.server)
        this.setData({
          server: res.server,
          devices: this.data.devices
        })
        wx.showToast({
          title: i18n['bluetooth-peripheral4']
        })
        console.log('createBLEPeripheralServer===', res.server)
        this.eventListenerInit()
      },
      fail: () => {
        wx.showToast({
          title: i18n['bluetooth-peripheral5'],
          icon: 'none'
        })
      }
    })
  },
  close() {
    this.data.server.close({
      success: () => {
        wx.showToast({
          title: i18n['bluetooth-peripheral6']
        })
      },
      fail: () => {
        wx.showToast({
          title: i18n['bluetooth-peripheral7'],
          icon: 'none'
        })
      }
    })
  },
  addService() {
    if (this.data.characteristicValue && this.data.descriptorValue) {
      const sUuid = getUuid();
      const cRUuid = getUuid();
      const cWUuid = getUuid();
      const dUuid = getUuid();
      this.data.server.addService({
        service: {
          uuid: sUuid,
          characteristics: [{
            uuid: cRUuid,
            properties: {
              write: false,
              writeNoResponse: false,
              read: true,
              notify: false,
              indicate: false
            },
            permission: {
              readable: true,
              writeable: false,
              readEncryptionRequired: true,
              writeEncryptionRequired: false
            },
            value: strToArrayBuffer(this.data.characteristicValue),
            descriptors: [{
              uuid: dUuid,
              permission: {
                write: true,
                read: true
              },
              value: strToArrayBuffer(this.data.descriptorValue)
            }]
          }, {
            uuid: cWUuid,
            properties: {
              write: true,
              writeNoResponse: true,
              read: true,
              notify: true,
              indicate: true
            },
            permission: {
              readable: true,
              writeable: true,
              readEncryptionRequired: true,
              writeEncryptionRequired: true
            }
          }]
        },
        success: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral8']
          })
          this.setData({
            serviceId: sUuid,
            characteristicId: cWUuid
          })
          console.log('service uuid===', sUuid)
          console.log('characteristic Read uuid===', cRUuid)
          console.log('characteristic Write uuid===', cWUuid)
          console.log('descriptor uuid===', dUuid)
        },
        fail: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral9'],
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['bluetooth-peripheral10'],
        content: i18n['bluetooth-peripheral11']
      })
    }
  },
  removeService() {
    if (this.data.serviceId) {
      this.data.server.removeService({
        serviceId: this.data.serviceId,
        success: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral12']
          })
        },
        fail: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral13'],
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['bluetooth-peripheral14'],
        content: i18n['bluetooth-peripheral15']
      })
    }
  },
  startAdvertising() {
    if (this.data.serviceId) {
      this.data.server.startAdvertising({
        advertiseRequest: {
          connectable: true,
          deviceName: 'miniBluetoothDemo',
          serviceUuids: [this.data.serviceId]
        },
        powerLevel: 'medium',
        success: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral16']
          })
        },
        fail: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral17'],
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['bluetooth-peripheral18'],
        content: i18n['bluetooth-peripheral19']
      })
    }
  },
  stopAdvertising() {
    this.data.server.stopAdvertising({
      success: () => {
        wx.showToast({
          title: i18n['bluetooth-peripheral20']
        })
      },
      fail: () => {
        wx.showToast({
          title: i18n['bluetooth-peripheral21'],
          icon: 'none'
        })
      }
    })
  },
  writeCharacteristicValue() {
    if (this.data.serviceId && this.data.characteristicValue) {
      this.data.server.writeCharacteristicValue({
        serviceId: this.data.serviceId,
        characteristicId: this.data.characteristicId,
        value: typeof this.data.characteristicValue === 'string' ? strToArrayBuffer(this.data.characteristicValue) : this.data.characteristicValue,
        needNotify: true,
        callbackId: this.data.callbackId,
        success: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral22']
          })
        },
        fail: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral23'],
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: i18n['bluetooth-peripheral24'],
        content: i18n['bluetooth-peripheral25']
      })
    }
  },
  onBLEPeripheralConnectionStateChangedCallback(res) {
    this.setData({
      connected: res.connected
    })
    console.log('onBLEPeripheralConnectionStateChanged===', res)
  },
  onCharacteristicReadRequestCallback(res) {
    console.log('onCharacteristicReadRequest===', res)
    this.setData({
      serviceId: res.serviceId,
      characteristicId: res.characteristicId,
      callbackId: res.callbackId
    })
    this.writeCharacteristicValue()
  },
  onCharacteristicSubscribedCallback(res) {
    console.log('onCharacteristicSubscribed===', res)
  },
  onCharacteristicUnsubscribedCallback(res) {
    console.log('onCharacteristicUnsubscribed===', res)
  },
  onCharacteristicWriteRequestCallback(res) {
    console.log('onCharacteristicWriteRequest===', res)
    this.setData({
      serviceId: res.serviceId,
      characteristicId: res.characteristicId,
      callbackId: res.callbackId,
      characteristicValue: res.value
    })
    this.writeCharacteristicValue()
  },
  eventListenerInit() {
    wx.onBLEPeripheralConnectionStateChanged(this.onBLEPeripheralConnectionStateChangedCallback)
    this.data.server.onCharacteristicReadRequest(this.onCharacteristicReadRequestCallback)
    this.data.server.onCharacteristicSubscribed(this.onCharacteristicSubscribedCallback)
    this.data.server.onCharacteristicUnsubscribed(this.onCharacteristicUnsubscribedCallback)
    this.data.server.onCharacteristicWriteRequest(this.onCharacteristicWriteRequestCallback)
  },
  offCharacteristicReadRequest() {
    this.data.server.offCharacteristicReadRequest(this.onCharacteristicReadRequestCallback)
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  offCharacteristicSubscribed() {
    this.data.server.offCharacteristicSubscribed(this.onCharacteristicSubscribedCallback)
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  offCharacteristicUnsubscribed() {
    this.data.server.offCharacteristicUnsubscribed(this.onCharacteristicUnsubscribedCallback)
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  offCharacteristicWriteRequest() {
    this.data.server.offCharacteristicWriteRequest(this.onCharacteristicWriteRequestCallback)
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  offBLEPeripheralConnectionStateChanged() {
    wx.offBLEPeripheralConnectionStateChanged(this.onBLEPeripheralConnectionStateChangedCallback)
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter(
      {
        success: (res) => {
          console.log('====closeBluetoothAdapter success', res)
          wx.showToast({
            title: i18n['bluetooth-peripheral27']
          })
        },
        fail: (res) => {
          console.log('====closeBluetoothAdapter fail', res)
          wx.showToast({
            title: res.errMsg,
            icon: 'none'
          })
        }
      }
    )
    this._discoveryStarted = false
  },

  onUnload() {
    this.closeBluetoothAdapter()
  },

  onShareAppMessage() {
    return {
      title: i18n['bluetooth-peripheral'],
      path: 'packageAPI/pages/device/bluetooth-peripheral/bluetooth-peripheral'
    }
  }
})