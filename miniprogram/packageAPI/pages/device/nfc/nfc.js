const baseAction = [
  'connect',
  'close',
  'setTimeout',
  'isConnected',
  'getMaxTransceiveLength',
  'transceive'
];
const actionList = {
  'mifareClassic': baseAction,
  'mifareUltralight': baseAction,
  'nfcB': baseAction,
  'nfcF': baseAction,
  'nfcV': baseAction,
  'isoDep': baseAction.concat('getHistoricalBytes'),
  'nfcA': baseAction.concat('getSak').concat('getAtqa'),
  'ndef': baseAction.concat('writeNdefMessage').concat('onNdefMessage').concat('offNdefMessage')
}
actionList['ndef'] = actionList['ndef'].filter(item => item !== 'transceive').filter(item => item !== 'getMaxTransceiveLength');

import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'nfc',
      path: 'packageAPI/pages/device/nfc/nfc'
    }
  },

  data: {
    tech: [],
    pairTech: [], // Matching protocol
    handleList: [], // Specific methods of the object
    device: '',
    message: '',
    theme: 'light'
  },

  // Listening function
  discovered(res) {
    // function discoverHandler(res) {
    //     if (res.techs.includes(nfc.tech.ndef)) {
    //       console.log(res.messages)
    //       const ndef = nfc.getNdef()
    //       ndef.writeNdefMessage({
    //         uris: [''],
    //         complete(res) {
    //           console.log('res:', res)
    //         }
    //       })
    //       return
    //     }

    //     if (res.techs.includes(nfc.tech.nfcA)) {
    //       const nfcA = nfc.getNFCA()
    //       nfcA.transceive({
    //         data: new ArrayBuffer(0),
    //         complete(res) {
    //           console.log('res:', res)
    //         }
    //       })
    //       return
    //     }
    //   }
    console.log('discovered---------------> res', res);
    const { techs, messages = [i18n['nfc9']] } = res;
    this.setData({
      pairTech: techs,
      message: messages.join(';\n')
    });
  },
  
  newDevice(e) {
    const method = e.currentTarget.dataset.method;
    console.log('Instantiating --------------- method', method);
    this.setData({
      device: method
    })
    const { key, value: newFn, action } = this.fnMap[method];
    console.log('this.fnMap --------------', JSON.stringify(this.fnMap));
    console.log('adapter\'s method', key, ' ---------------called', newFn);
    // Instantiate an object
    this.targetPair = newFn();
    this.setData({
      handleList: action
    });
  },

  doMethod(e) {
    const { device } = this.data;
    const method = e.currentTarget.dataset.method;
    let fn = this.targetPair[method];
    fn = fn.bind(this.targetPair);
    const toastMsg = `${device}-${method}`;

    if (method === 'writeNdefMessage') { // ndef
      fn({
        uris: [1, 2, 3],
        texts: [4, 5, 6],
        records: new ArrayBuffer(8), // Binary object array, specifying id, type, and payload (all of ArrayBuffer type)
        complete(res) {
          console.log(`${toastMsg} complete---------------`, res);
          wx.showToast({
            title: `${toastMsg}--- ${JSON.stringify(res)}`,
            duration: 1000
          })
        }
      })
    } else if (method === 'offNdefMessage') {  // ndef
      console.log('offNdefMessage ---------------call');
      fn((res) => {
        console.log(`${toastMsg} call---------------`, res);
        wx.showToast({
          title: `${toastMsg}offNdefMessage --- ${JSON.stringify(res)}`,
          duration: 1000
        })
      })
    } else if (method === 'onNdefMessage') {  // ndef
      console.log('onNdefMessage ---------------call');
      fn((res) => {
        console.log(`${toastMsg} call---------------`, res);
        wx.showToast({
          title: `${toastMsg}onNdefMessage --- ${JSON.stringify(res)}`,
          duration: 1000
        })
      })
    } else if (method === 'transceive') { // Write a separate case for passing data
      fn({
        data: new ArrayBuffer(16),
        complete(res) {
          console.log(`${toastMsg} complete---------------`, res);
          wx.showToast({
            title: `${toastMsg}--- ${JSON.stringify(res)}`,
            duration: 1000
          })
        }
      })
    } else { // Common examples for success, fail, and complete
      fn({
        success: function (res) {
          console.log(`${toastMsg} success---------------`, res)
          wx.showToast({
            title: `${toastMsg}${i18n['nfc10']}`,
            duration: 1000
          });
        }, fail: function (faile) {
          console.log(`${toastMsg} fail---------------`, faile)
          wx.showToast({
            title: `${toastMsg}${i18n['nfc11']}`,
            duration: 1000
          });
        }
      })
    }
  },

  start() {
    if (this.adapter) {
      console.log('Destroying old instance ---------------');
      this.adapter.offDiscovered(this.discovered);
      this.adapter.stopDiscovery();
      this.adapter = null;
    }
    const adapter = wx.getNFCAdapter();
    if (!adapter) {
      return;
    }
    this.adapter = adapter;
    console.log('Mini-program demo adapter ---------------', this.adapter);
    console.log('Mini-program demo adapter\'s tech ---------------', this.adapter.tech);
    const tech = Object.keys(adapter.tech);

    this.fnMap = {};
    tech.forEach(item => {
      const all = item.split('');
      const firstLetter = all.splice(0, 1);
      const fnName = 'get' + firstLetter.join('').toUpperCase() + all.join('');
      this.fnMap[item] = {
        key: fnName,
        value: adapter[fnName],
        action: actionList[item]
      }
    })
    this.setData({
      tech
    });
    adapter.onDiscovered(this.discovered);
  },

  startDiscovery() {
    this.adapter.startDiscovery({
      success: function (res) {
        wx.showToast({
          title: i18n['nfc0'],
          duration: 1000
        });
      },
      faile: function () {
        wx.showToast({
          title: i18n['nfc1'],
          duration: 1000
        });
      }
    })
  },

  stopDiscovery() {
    this.adapter.stopDiscovery({
      success: function (res) {
        wx.showToast({
          title: i18n['nfc2'],
          duration: 1000
        });
      },
      faile: function () {
        wx.showToast({
          title: i18n['nfc3'],
          duration: 1000
        });
      }
    })
  },

  getNFCAdapter() {
    this.start();
    console.log(this.adapter, '---------------adapter');
  },

  onLoad() {
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
