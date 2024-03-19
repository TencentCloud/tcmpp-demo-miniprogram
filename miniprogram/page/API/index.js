import { i18n, lang } from '../../i18n/lang';

Page({
  onShareAppMessage() {
    return {
      title: 'Application interface ability display',
      path: 'page/API/index'
    }
  },
  loadI18n() {
    let newList = [{
      id: 'api',
      name: i18n['OpenInterface'],
      open: false,
      pages: [
        {
          name: i18n['Data report'],
          url: 'analysis/analysis'
        }, {
          name: i18n['Picture sharing'],
          url: 'share-image/share-image'
        }, {
          name: i18n['copy Link'],
          url: 'copy-url/copy-url'
        }, {
          name: i18n['Forward'],
          url: 'share/share'
        }, {
          name: i18n['Forward button'],
          url: 'share-button/share-button'
        }, {
          name: i18n['Biological certification'],
          url: 'soter-authentication/soter-authentication'
        }, {
          name: i18n['set up'],
          url: 'setting/setting'
        }]
    }, {
      id: 'file',
      name: i18n['File'],
      open: false,
      pages: [{
        name: i18n['Basic file operation'],
        url: 'base/base'
      }, {
        name: i18n['File system'],
        url: 'file-system/file-system'
      }]
    }, {
      id: 'base',
      name: i18n['Basic'],
      open: false,
      pages: [{
        name: i18n['Basic interface'],
        url: 'common/common'
      }, {
        name: i18n['system'],
        url: 'system/system'
      }, {
        name: i18n['renew'],
        url: 'update/updateManager'
      }, {
        name: i18n['Applets'],
        url: 'mini/mini'
      }, {
        name: i18n['debug'],
        url: 'debug/debug'
      }, {
        name: i18n['performance'],
        url: 'performance/get-performance/get-performance'
      }, {
        name: i18n['encryption'],
        url: 'encrypt/encrypt'
      }]
    }, {
      id: 'route',
      name: i18n['Route'],
      open: false,
      pages: [{
        name: i18n['Page route'],
        url: 'route'
      }]
    }, {
      id: 'jump',
      name: i18n['Jump'],
      open: false,
      pages: [{
        name: i18n['Applet jump'],
        url: 'jump'
      }]
    },
    {
      id: 'forward',
      name: i18n['Forward'],
      open: false,
      pages: [{
        name: i18n['Get forward information'],
        url: 'forward/forward'
      }]
    },
    {
      id: 'page',
      name: i18n['Interface'],
      open: false,
      pages: [{
        name: i18n['Interaction'],
        url: 'toast/toast'
      }, {
        name: i18n['Navigation Bar'],
        url: 'navigation-bar/navigation-bar'
      }, {
        name: i18n['background'],
        url: 'background/background'
      }, {
        name: i18n['Tab'],
        url: '@set-tab-bar'
      }, {
        name: i18n['Font'],
        url: 'load-font-face/load-font-face'
      }, {
        name: i18n['Pull down to refresh'],
        url: 'pull-down-refresh/pull-down-refresh'
      }, {
        name: i18n['scroll'],
        url: 'page-scroll/page-scroll'
      }, {
        name: i18n['Animation'],
        url: 'animation/animation'
      }, {
        name: i18n['menu'],
        url: 'menu-bounding/menu-bounding'
      }, {
        name: i18n['window'],
        url: 'window/window'
      }, {
        name: i18n['Get wxml node information'],
        url: 'get-wxml-node-info/get-wxml-node-info'
      }, {
        name: i18n['WXML node layout state intersect'],
        url: 'intersection-observer/intersection-observer'
      }]
    }, {
      id: 'device',
      name: i18n['Device'],
      open: false,
      pages: [{
        name: i18n['Bluetooth'],
        url: 'bluetooth/bluetooth'
      }, {
        name: i18n['Bluetooth-peripheral equipment'],
        url: 'bluetooth-peripheral/bluetooth-peripheral'
      }, {
        name: i18n['Bluetooth-beacon'],
        url: 'bluetooth-beacon/bluetooth-beacon'
      }, {
        name: i18n['Memory'],
        url: 'memory/memory'
      }, {
        name: i18n['Direction'],
        url: 'device-motion/device-motion'
      }, {
        name: i18n['NFC'],
        url: 'nfc/nfc'
      },
      // {
      // name: i18n['HCE'],
      // url: 'hce/hce'
      // },
      {
        name: i18n['Wi-Fi'],
        url: 'wifi/wifi'
      }, {
        name: i18n['calendar'],
        url: 'calendar/calendar'
      }, {
        name: i18n['Contact person'],
        url: 'add-contact/add-contact'
      }, {
        name: i18n['Non barrier'],
        url: 'accessibility/accessibility'
      }, {
        name: i18n['Electricity'],
        url: 'get-battery-info/get-battery-info'
      }, {
        name: i18n['Shear'],
        url: 'clipboard-data/clipboard-data'
      }, {
        name: i18n['network'],
        url: 'get-network-type/get-network-type'
      }, {
        name: i18n['Monitor mobile phone network changes'],
        url: 'on-network-status-change/on-network-status-change'
      }, {
        name: i18n['encryption'],
        url: 'encrypt/encrypt'
      }, {
        name: i18n['Screen'],
        url: 'screen-brightness/screen-brightness'
      }, {
        name: i18n['keyboard'],
        url: 'keyboard/keyboard'
      }, {
        name: i18n['Telephone'],
        url: 'make-phone-call/make-phone-call'
      }, {
        name: i18n['Gravity sensing acceleration meter'],
        url: 'on-accelerometer-change/on-accelerometer-change'
      }, {
        name: i18n['compass'],
        url: 'on-compass-change/on-compass-change'
      }, {
        name: i18n['Gyro'],
        url: 'gyroscope/gyroscope'
      }, {
        name: i18n['Scan code'],
        url: 'scan-code/scan-code'
      },
      // {
      // name: i18n['iBeacon'],
      //   url: 'ibeacon/ibeacon'
      // },  
      {
        name: i18n['Short message'],
        url: 'sms/sms'
      }, {
        name: i18n['vibration'],
        url: 'vibrate/vibrate'
      }]
    }, {
      id: 'network',
      name: i18n['Network'],
      open: false,
      pages: [
        {
          name: i18n['Initiate a request'],
          url: 'request/request'
        },
        {
          name: i18n['WebSocket'],
          url: 'web-socket/web-socket'
        },
        {
          name: i18n['upload files'],
          url: 'upload-file/upload-file'
        },
        {
          name: i18n['download file'],
          url: 'download-file/download-file'
        },
        {
          name: i18n['UDPSocket'],
          url: 'udp-socket/udp-socket'
        },
        {
          name: i18n['TCPSocket'],
          url: 'tcp-socket/tcp-socket'
        },
        {
          name: i18n['mDNS'],
          url: 'mdns/mdns'
        }
      ]
    }, {
      id: 'media',
      name: i18n['Media'],
      open: false,
      pages: [{
        name: i18n['map'],
        url: 'map/map'
      }, {
        name: i18n['picture'],
        url: 'image/image'
      }, {
        name: i18n['Audio'],
        url: 'audio/audio'
      }, {
        name: i18n['Audio (newly added)'],
        url: 'audio-add/audio-add'
      }, {
        name: i18n['Audio (processing)'],
        url: 'audio-add2/audio-add2'
      }, {
        name: i18n['Voice'],
        url: 'voice/voice'
      }, {
        name: i18n['Voice (Old Edition)'],
        url: 'voice-old/voice-old'
      }, {
        name: i18n['Background audio'],
        url: 'background-audio/background-audio'
      }, {
        name: i18n['Background Audio (Old Edition)'],
        url: 'background-audio-old/background-audio-old'
      }, {
        name: i18n['document'],
        url: 'file/file'
      }, {
        name: i18n['video'],
        url: 'video/video'
      }, {
        name: i18n['camera'],
        url: 'camera/camera'
      },
      // {
      // name: i18n['Audio and video synthesis'],
      //   url: 'media-container/media-container'
      // },
      {
        name: i18n['Rich text'],
        url: 'editor-context/editor-context'
      },
      {
        name: i18n['Screen recording device'],
        url: 'media-recorder/media-recorder'
      }
        // {
        //   name: i18n['Video decoder'],
        //   url: 'video-decoder/video-decoder'
        // }
      ]
    }, {
      id: 'location',
      name: i18n['Location'],
      open: false,
      pages: [{
        name: i18n['Get the current position'],
        url: 'get-location/get-location'
      }, {
        name: i18n['Change monitoring'],
        url: 'location-change/location-change'
      }, {
        name: i18n['View location with native maps'],
        url: 'open-location/open-location'
      }, {
        name: i18n['Use the native map to select location'],
        url: 'choose-location/choose-location'
      }]
    }, {
      id: 'storage',
      name: i18n['Data Cache'],
      pages: [{
        name: i18n['Local storage'],
        url: 'storage/storage'
      }
        // {
        //   name: i18n['buffer'],
        //   url: 'buffer-url/buffer-url'
        // }
        // {
        // name: i18n['Cyclical update'],
        //   url: 'get-background-fetch-data/get-background-fetch-data'

        // }, {
        // name: i18n['Pre pulling'],
        //   url: 'get-background-prefetch-data/get-background-prefetch-data'
        // }
      ]
    },
    {
      id: 'worker',
      name: i18n['Multithreading'],
      url: 'worker/worker'
    },
    {
      id: 'canvas',
      name: i18n['Canvas'],
      open: false,
      pages: [{
        name: i18n['Canvas'],
        url: 'canvas/canvas'
      },
      {
        name: i18n['CanvasContext'],
        url: 'canvasContext/canvas'
      },
      {
        name: i18n['Path2D'],
        url: 'path2D/canvas'
      },
      {
        name: i18n['CanvasRenderingContext2D'],
        url: 'canvasRenderingContext2D/canvas'
      }
        // {
        //   name: i18n['OffscreenCanvas'],
        //   url: 'offscreenCanvas/canvas'
        // }
      ]
    },
    // {
    //   id: 'framework',
    //   name: i18n['Framework'],
    //   pages: [{
    // name: i18n['Two way binding'],
    //     url: 'two-way-bindings/two-way-bindings',
    //   }, {
    // name: i18n['WXS'],
    //     url: 'wxs/wxs'
    //   }, {
    // name: i18n['Screen rotation'],
    //     url: 'resizable/resizable'
    //   }]
    // },
    {
      id: 'wxml',
      name: i18n['WXML'],
      open: false,
      pages: [{
        name: i18n['WXML'],
        url: 'wxml/wxml'
      }]
    }, {
      id: 'qapm',
      name: i18n['Performance monitoring'],
      open: false,
      url: 'pages/index/index'
    }
    ];
    wx.setNavigationBarTitle({
      title: i18n['title2']
    })
    this.setData({
      t: i18n,
      lang,
      list: newList
    })
  },
  onTabItemTap() {
    this.loadI18n()
  },
  data: {
    isSetTabBarPage: false,
    theme: 'light'
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },
  onReady() {
    this.loadI18n()
  },
  onShow() {
    this.leaveSetTabBarPage()
  },
  onHide() {
    this.leaveSetTabBarPage()
  },
  kindToggle(e) {
    const id = e.currentTarget.id;
    const list = this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          const path = `../../packageAPI/pages/${list[i].id}/${list[i].url}`
          wx.navigateTo({
            url: path
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  },
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true
    })
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false
    })
  }
})