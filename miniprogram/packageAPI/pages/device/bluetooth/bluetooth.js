function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

// Example of converting ArrayBuffer to a hexadecimal string
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return (`00${bit.toString(16)}`).slice(-2)
    }
  )
  return hexArr.join('')
}

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: i18n['bluetooth0'],
      path: 'packageAPI/pages/device/bluetooth/bluetooth'
    }
  },

  data: {
    theme: 'light',
    devices: [],
    connDevices: [],
    totalDevices: [],
    connected: false,
    chs: [],
    isShowGetBLEMTU: false,
    servicesIds: [],
    discoveryId: ''
  },
  onUnload() {
    this.closeBluetoothAdapter()
  },
  openBluetoothAdapter() {
    const that = this
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        that.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        console.log(res)
        if (res.errCode === 10001) {
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: i18n['bluetooth1'],
            content: i18n['bluetooth2'],
            showCancel: false
          })
        }
      }
    })
  },
  openBluetoothAdapter1() {
    wx.openBluetoothAdapter({
      success: (res) => {
        wx.showToast({
          title: i18n['bluetooth3']
        })
        console.log('openBluetoothAdapter success', res)
      },
      fail: (res) => {
        console.log('openBluetoothAdapter fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  bindKeyDiscovery(e) {
    this.setData({
      discoveryId: e.detail.value
    })
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  getBluetoothAdapterState1() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        this.setData({
          state: JSON.stringify(res)
        })
      },
      fail: (res) => {
        console.log('getBluetoothAdapterState fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      services: this.data.discoveryId ? [this.data.discoveryId] : [],
      allowDuplicatesKey: true,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        wx.showToast({
          title: i18n['bluetooth4']
        })
        this.onBluetoothDeviceFound()
      },
      fail: (err) => {
        console.log('startBluetoothDevicesDiscovery fail', err)
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      success: (res) => {
        console.log('stopBluetoothDevicesDiscovery success', res)
        wx.showToast({
          title: i18n['bluetooth5']
        })
        this._discoveryStarted = false
      },
      fail: (err) => {
        console.log('stopBluetoothDevicesDiscovery fail', err)
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  bluetoothDeviceFoundCallback(res) {
    res.devices.forEach(device => {
      if (!device.name && !device.localName && !this.data.discoveryId) {
        return
      }
      // const data = {}
      const foundDevices = this.data.devices
      const idx = inArray(foundDevices, 'deviceId', device.deviceId)
      if (idx === -1) {
        foundDevices[foundDevices.length] = device
      } else {
        foundDevices[idx] = device
      }
      this.setData({
        devices: foundDevices
      })
      // if (idx === -1) {
      //   data[`devices[${foundDevices.length}]`] = device
      // } else {
      //   data[`devices[${idx}]`] = device
      // }
      // this.setData(data)
    })
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound(this.bluetoothDeviceFoundCallback)
  },
  offBluetoothDeviceFound() {
    wx.offBluetoothDeviceFound()
    wx.showToast({
      title: i18n['bluetooth6']
    })
  },
  makeBluetoothPair(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    wx.showLoading()
    wx.makeBluetoothPair({
      deviceId,
      pin: '1234',
      success: () => {
        wx.showToast({
          title: i18n['bluetooth7']
        })
        console.log('makeBluetoothPair===Bluetooth pairing successful')
        wx.isBluetoothDevicePaired({
          deviceId,
          success: (res) => {
            wx.showModal({
              confirmText: i18n['confirm'],
              cancelText: i18n['cancel'],
              title: i18n['bluetooth8'],
              content: res.paired ? i18n['bluetooth9'] : i18n['bluetooth10']
            })
            console.log('isBluetoothDevicePaired===', res)
          },
          fail: () => {
            console.log('isBluetoothDevicePaired===Failed to check if the Bluetooth device is paired')
          }
        })
      },
      fail: () => {
        wx.showToast({
          title: i18n['bluetooth11'],
          icon: 'none'
        })
        console.log('makeBluetoothPair===Bluetooth pairing failed')
      }
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    wx.showLoading()
    wx.createBLEConnection({
      deviceId,
      success: () => {
        wx.onBLEMTUChange(this.onBLEMTUChangeCallback)
        this.setData({
          connected: true,
          name,
          deviceId,
          isShowGetBLEMTU: true
        })
        wx.setBLEMTU({
          deviceId,
          mtu: 500,
          success: (res) => {
            console.log('Success: Negotiated Bluetooth Low Energy maximum transmission unit as', res.mtu)
          },
          fail: (res) => {
            console.log('Failure: Negotiating Bluetooth Low Energy maximum transmission unit')
          }
        })
        this.getBLEDeviceServices(deviceId)
      },
      complete() {
        wx.hideLoading()
      }
    })
    wx.onBLEConnectionStateChange(this.bLEConnectionStateChangeCallback)
    this.stopBluetoothDevicesDiscovery()
  },
  onBLEMTUChangeCallback(res) {
    console.log('onBLEMTUChange===', res)
  },
  getBLEMTU() {
    wx.getBLEMTU({
      deviceId: this.data.deviceId,
      success: (res) => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['bluetooth12'],
          content: String(res.mtu)
        })
        console.log('Success: Obtained Bluetooth Low Energy maximum transmission unit as', res.mtu)
      },
      fail: (res) => {
        console.log('Failure: Obtaining Bluetooth Low Energy maximum transmission unit')
      }
    })
  },
  offBLEConnectionStateChange() {
    wx.offBLEConnectionStateChange()
    wx.showToast({
      title: i18n['bluetooth13']
    })
  },
  offBLEMTUChange() {
    wx.offBLEMTUChange(this.onBLEMTUChangeCallback)
    wx.showToast({
      title: i18n['bluetooth14']
    })
  },
  bLEConnectionStateChangeCallback(res) {
    // This method callback can be used to handle unexpected disconnections and other exceptions
    console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
    if (!res.connected) {
      this.setData({
        connected: false,
        deviceId: res.deviceId
      })
    }
  },
  getBLEDeviceRSSI() {
    wx.getBLEDeviceRSSI({
      deviceId: this.data.deviceId,
      success: (res) => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['bluetooth15'],
          content: res.RSSI.toString()
        })
      }
    })
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
      success: () => {
        this.setData({
          connected: false,
          chs: [],
          canWrite: false
        })
      },
      fail: () => {
        wx.showToast({
          title: i18n['bluetooth16'],
          icon: 'none'
        })
      }
    })
  },
  changeMode() {
    wx.navigateTo({
      url: './slave/slave'
    })
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        console.log('getBLEDeviceServices===', res.services)
        for (let i = 0; i < res.services.length; i++) {
          this.data.servicesIds.push(res.services[i].uuid)
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            // return
          }
        }
      },
      fail: () => {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['bluetooth17'],
          content: i18n['bluetooth18']
        })
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)

        for (let i = 0; i < res.characteristics.length; i++) {
          const item = res.characteristics[i]
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              success: () => {
                console.log('readBLECharacteristicValue: Success')
              },
              fail: () => {
                console.log('readBLECharacteristicValue: Failure')
              }
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            console.log('write')
            // this.writeBLECharacteristicValue()
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
              success: () => {
                console.log('Success: Enabled notify functionality for changes in Bluetooth Low Energy device characteristic values')
              },
              fail: () => {
                console.log('Failure: Enabling notify functionality for changes in Bluetooth Low Energy device characteristic values')
              }
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // Listen before performing operations to ensure getting data at the earliest time
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const foundChs = this.data.chs
      if (idx === -1) {
        foundChs[foundChs.length] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        foundChs[idx] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }

      // const data = {}
      // if (idx === -1) {
      //   data[`chs[${this.data.chs.length}]`] = {
      //     uuid: characteristic.characteristicId,
      //     value: ab2hex(characteristic.value)
      //   }
      // } else {
      //   data[`chs[${idx}]`] = {
      //     uuid: characteristic.characteristicId,
      //     value: ab2hex(characteristic.value)
      //   }
      // }
      wx.showToast({
        title: i18n['bluetooth19']
      })
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      // this.setData(data)
      this.setData({
        chs: foundChs
      })
    })
    // Verify the 'off' capability
    // wx.offBLECharacteristicValueChange()
  },
  writeBLECharacteristicValue() {
    // Send a hexadecimal data of 0x00 to the Bluetooth device
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    // eslint-disable-next-line
    dataView.setUint8(0, Math.random() * 19 | 0)
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
      success() {
        console.log('writeBLECharacteristicValue: Success')
      },
      fail() {
        console.log('writeBLECharacteristicValue: Failure')
      },
      complete() {
        console.log('writeBLECharacteristicValue: Completed')
      }
    })
  },
  getBluetoothDevices() {
    wx.getBluetoothDevices({
      success: (res) => {
        console.log('====getBluetoothDevices success', res)
        if (res.devices[0]) {
          this.setData({
            totalDevices: res.devices
          })
        }
      },
      fail: (res) => {
        console.log('====getBluetoothDevices fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getConnectedBluetoothDevices() {
    wx.getConnectedBluetoothDevices({
      services: this.data.servicesIds,
      success: (res) => {
        console.log('====getConnectedBluetoothDevices success', res)
        if (res.devices[0]) {
          this.setData({
            connDevices: res.devices
          })
        }
      },
      fail: (res) => {
        console.log('====getConnectedBluetoothDevices fail', res)
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter(
      {
        success: (res) => {
          console.log('====closeBluetoothAdapter success', res)
          wx.showToast({
            title: i18n['bluetooth20']
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
  offBluetoothAdapterStateChange() {
    wx.offBluetoothAdapterStateChange()
    wx.showToast({
      title: i18n['bluetooth21'],
      icon: 'none'
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['bluetooth0']
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

    wx.onBluetoothAdapterStateChange((res) => {
      this.setData({
        isAvailable: res.available ? i18n['bluetooth9'] : i18n['bluetooth10'],
        isDiscovering: res.discovering ? i18n['bluetooth9'] : i18n['bluetooth10']
      })
    })
  }
})
