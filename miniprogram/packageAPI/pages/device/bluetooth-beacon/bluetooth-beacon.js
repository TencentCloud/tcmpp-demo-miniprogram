// packageAPI/pages/device/bluetooth-beacon/bluetooth-beacon.js
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

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  data: {
    theme: 'light',
    server: null,
    devices: [],
    serviceId: '',
    characteristicId: '',
    callbackId: null,
    beacons: []
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['bluetooth-beacon2']
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
            value: strToArrayBuffer(i18n['bluetooth-peripheral0']),
            descriptors: [{
              uuid: dUuid,
              permission: {
                write: true,
                read: true
              },
              value: strToArrayBuffer(i18n['bluetooth-peripheral1'])
            }]
          }]
        },
        success: () => {
          wx.showToast({
            title: i18n['bluetooth-peripheral8']
          })
          this.setData({
            serviceId: sUuid,
            characteristicId: cRUuid
          })
          console.log('service uuid===', sUuid)
          console.log('characteristic Read uuid===', cRUuid)
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
  startAdvertising() {
    if (this.data.serviceId) {
      this.data.server.startAdvertising({
        advertiseRequest: {
          connectable: false,
          deviceName: 'bluetoothBeaconDemo',
          serviceUuids: [this.data.serviceId],
          beacon: {
            uuid: 'AECB82DD-E442-47DB-877F-F55604DD99AB',
            major: 22,
            minor: 333
          }
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
  offBeaconUpdate() {
    wx.offBeaconUpdate()
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  onBeaconServiceChangeCallback(res) {
    this.setData({
      isAvailable: res.available ? i18n['bluetooth-peripheral32'] : i18n['bluetooth-peripheral33'],
      isDiscovering: res.discovering ? i18n['bluetooth-peripheral32'] : i18n['bluetooth-peripheral33']
    })
  },
  offBeaconServiceChange() {
    wx.offBeaconServiceChange()
    wx.showToast({
      title: i18n['bluetooth-peripheral26']
    })
  },
  eventListenerInit() {
    wx.onBeaconUpdate(this.onBeaconUpdateCallback)
    wx.onBeaconServiceChange(this.onBeaconServiceChangeCallback)
  },
  startBeaconDiscovery() {
    wx.startBeaconDiscovery({
      uuids: ['AECB82DD-E442-47DB-877F-F55604DD99AB'],
      success: (res) => {
        console.log('startBeaconDiscovery success', res)
        wx.showToast({
          title: i18n['bluetooth-beacon0']
        })
        this.eventListenerInit()
      },
      fail: (err) => {
        console.log('startBeaconDiscovery fail', err)
      }
    })
  },
  onBeaconUpdateCallback(res) {
    res.beacons.forEach(beacon => {
      const foundBeacons = this.data.beacons
      const idx = inArray(foundBeacons, 'uuid', beacon.uuid)
      if (idx === -1) {
        foundBeacons[foundBeacons.length] = beacon
      } else {
        foundBeacons[idx] = beacon
      }
      this.setData({
        beacons: foundBeacons
      })
    })
  },
  stopBeaconDiscovery() {
    wx.stopBeaconDiscovery({
      success: (res) => {
        console.log('stopBeaconDiscovery success', res)
        wx.showToast({
          title: i18n['bluetooth-beacon1']
        })
      },
      fail: (err) => {
        console.log('stopBeaconDiscovery fail', err)
      }
    })
  },
  getBeacons() {
    wx.getBeacons({
      success: (res) => {
        console.log('====getBeacons success', res)
      },
      fail: (res) => {
        console.log('====getBeacons fail', res)
      }
    })
  },

  onUnload() {
    this.closeBluetoothAdapter()
  },

  onShareAppMessage() {
    return {
      title: i18n['bluetooth-beacon2'],
      path: 'packageAPI/pages/device/bluetooth-beacon/bluetooth-beacon'
    }
  }
})