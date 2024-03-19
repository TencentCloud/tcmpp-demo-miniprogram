
const uuid3 = '0C76801A-62EB-45E5-96A8-37C8882ABB2B'
const serviceId = 'D0611E78-BBB4-4591-A5F8-487910AE4366'
const characteristicId = '8667556C-9A37-4C91-84ED-54EE27D90049'
// The host's serviceId and characteristicId need to be configured above


// Example of converting ArrayBuffer to a hexadecimal string
// function ab2hex(buffer) {
//   const hexArr = Array.prototype.map.call(
//     new Uint8Array(buffer),
//     function (bit) {
//       return ('00' + bit.toString(16)).slice(-2)
//     }
//   )
//   return hexArr.join('')
// }

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

// slave/slave.js
import { i18n,lang } from '../../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'Bluetooth',
      path: 'packageAPI/pages/device/slave/slave'
    }
  },
  data: {
    t: i18n,
    lang,
    theme: 'light',
    connects: [],
    servers: []
  },

  onLoad() {
    this.setData({
      t: i18n,
      lang
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
    wx.onBLEPeripheralConnectionStateChanged(res => {
      console.log('connect')
      const connects = this.data.connects
      const idx = inArray(connects, 'deviceId', res.deviceId)
      if (idx >= 0) {
        connects[idx] = res
      } else {
        connects.push(res)
      }
      this.setData({connects})
    })
  },

  openBluetoothAdapter() {
    // Initialize the Bluetooth module
    wx.openBluetoothAdapter({
      mode: 'peripheral',
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.createBLEPeripheralServer()
      },
      fail: (res) => {
        console.log(res)
        wx.showToast({
          title: `Failed to create error code: ${res.errCode}`,
          icon: 'none'
        })
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.createBLEPeripheralServer()
            }
          })
        }
      }
    })
  },

  createBLEPeripheralServer() {
    //
    wx.createBLEPeripheralServer().then(res => {
      console.log('createBLEPeripheralServer', res)
      this.data.servers.push(res.server)
      this.server = res.server
      this.setData({
        serverId: this.server.serverId
      })
      wx.showToast({
        title: 'create server '
      })
      this.server.onCharacteristicReadRequest(res => {
        const {serviceId, characteristicId, callbackId} = res
        const buffer = new ArrayBuffer(1)
        const dataView = new DataView(buffer)
        const newValue = Math.ceil(Math.random() * 10)
        dataView.setUint8(0, newValue)
        console.log('onCharacteristicReadRequest', res, newValue)
        this.server.writeCharacteristicValue({
          serviceId,
          characteristicId,
          value: buffer,
          needNotify: true,
          callbackId
        })
      })
      // Listen for received data
      this.server.onCharacteristicWriteRequest(res => {
        console.log('onCharacteristicWriteRequest', res)
        const {
          serviceId, characteristicId, value, callbackId
        } = res
        wx.showToast({
          title: 'Receive the host data'
        })
        this.server.writeCharacteristicValue({
          serviceId,
          characteristicId,
          value,
          needNotify: true,
          callbackId
        })
      })
      return res
    }).catch(() => {})
  },
  closeServer() {
    if (this.server) { 
      this.server.close()
      wx.showToast({
        title: 'closure server'
      })
    }
  },
  chaneMode() {
    wx.navigateBack()
  },
  onConfirm(e) {
    console.log('onConfirm')
    const n = e.detail.value * 1
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    dataView.setUint8(0, n)
    if (!this.server) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'Please create firstserver'
      })
      return
    }
    this.server.writeCharacteristicValue({
      serviceId,
      characteristicId,
      value: buffer,
      needNotify: true
    })
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'Successful writing',
      content: 'Please check at the host'
    })
  },
  showInput() {
    this.setData({
      input: !this.data.input
    })
  },
  addService() {
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    dataView.setUint8(0, 2)
    const descriptorBuffer = new ArrayBuffer(1)
    const dataView2 = new DataView(descriptorBuffer)
    dataView2.setInt8(0, 3)
    const service = {
      uuid: serviceId,
      characteristics: [{
        uuid: characteristicId,
        properties: {
          write: true,
          read: true,
          notify: true,
          indicate: true
        },
        permission: {
          readable: true,
          writeable: true,
          readEncryptionRequired: true,
          writeEncryptionRequired: true
        },
        value: buffer,
        descriptors: [{
          uuid: uuid3,
          permission: {
            write: true,
            read: true
          },
          value: descriptorBuffer
        }]
      }]
    }
    if (!this.server) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'Please create firstserver'
      })
      return
    }
    this.server.addService({
      service
    }).then(res => {
      console.log('add Service', res)
      wx.showToast({
        title: 'Create service'
      })
      return res
    }, (rej) => {
      console.log(rej)
      if (rej.errCode === 10001) {
        wx.showToast({
          title: 'Please open the Bluetooth'
        })
      } else {
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: 'Failed to create',
          content: `error code: ${rej.errCode}`
        })
      }
    }).catch(() => {})
  },
  removeService() {
    if (!this.server) return
    this.server.removeService({
      serviceId
    }).then(res => {
      wx.showToast({
        title: 'Turn off service'
      })
      console.log('removeService', res)
      return res
    }).catch(() => {})
  },
  startAdvertising() {
    if (!this.server) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'Please create firstserver'
      })
      return
    }
    const buffer = new ArrayBuffer(1)
    const dataView = new DataView(buffer)
    dataView.setInt8(0, 4)
    this.server.startAdvertising({
      advertiseRequest: {
        connectable: true,
        deviceName: 'sanford',
        serviceUuids: [serviceId],
        manufacturerData: [{
          manufacturerId: 'sanfordsun-pc0',
          manufacturerSpecificData: buffer
        }]
      },
      powerLevel: 'medium'
    }).then(res => {
      console.log('startAdvertising', res)
      wx.showToast({
        title: 'Start broadcasting'
      })
      return res
    }).catch(() => {})
  },

  stopAdvertising() {
    if (!this.server) {
      wx.showModal({
        confirmText: i18n['confirm'],
        cancelText: i18n['cancel'],
        title: 'Please create firstserver'
      })
      return
    }
    this.server.stopAdvertising()
    wx.showToast({
      title: 'Turn off the broadcast'
    })
  },

  closeBluetoothAdapter() {
    wx.showToast({
      title: 'Ending process'
    })
    wx.closeBluetoothAdapter()
  },

  onUnload() {
    this.data.servers.forEach(() => {
      // server.close()
    })
  }
})
