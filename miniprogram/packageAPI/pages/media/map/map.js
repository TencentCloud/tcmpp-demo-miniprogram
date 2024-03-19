// packageAPI/pages/media/map/map.js
import { i18n, lang } from '../../../../i18n/lang'
import { log } from '../../../../util/util'

Page({
  onShareAppMessage() {
    return {
      title: 'map',
      path: 'packageComponent/pages/map/map/map'
    }
  },
  showInputDialog(options) {
    const op = Object.assign({
      cancelText: i18n['map0'],
      confirmText: i18n['map1']
    }, options);
    op.show = true;
    this.setData({
      inputOptions: op
    });
  },
  onInutCancel() {
    this.setData({
      'inputOptions.show': false
    });
    this.data.inputOptions.onCancel();
  },
  onInputConfirm(e) {
    this.setData({
      'inputOptions.show': false
    });
    this.data.inputOptions.onConfirm(e.detail.value);
  },
  data: {
    inputOptions: {
      show: false,
      title: '',
      inputs: [],
      placeholder: '',
      cancelText: i18n['map0'],
      confirmText: i18n['map1'],
      onCancel: () => { },
      onConfirm: () => { }
    },
    mapContext: null,
    theme: 'light',
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 101,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T Creative Park',
      title: 'test111'
    }, {
      id: 103,
      customCallout: { display: 'ALWAYS' },
      joinCluster: true,
      iconPath: '/packageComponent/resources/kind/daytime.png',
      latitude: 23.099994,
      longitude: 113.322520,
      name: i18n['map2'],
      title: 'test222',
      width: 40,
      height: 40,
      label: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        content: 'polymerizationA',
        bgColor: '#ffffff'
      }
    }, {
      id: 104,
      joinCluster: true,
      iconPath: '/packageComponent/resources/kind/daytime.png',
      latitude: 23.099994,
      longitude: 113.326520,
      name: i18n['map2'],
      title: 'test222',
      width: 40,
      height: 40,
      label: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        content: 'polymerizationB',
        bgColor: '#ffffff'
      }
    }, {
      id: 105,
      joinCluster: true,
      iconPath: '/packageComponent/resources/kind/daytime.png',
      latitude: 23.096994,
      longitude: 113.329520,
      name: i18n['map2'],
      title: 'test222',
      width: 40,
      height: 40,
      label: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        content: 'polymerizationC',
        bgColor: '#ffffff'
      }
    }],
    polygons: [{
      points: [
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 23.299994,
          longitude: 113.424520
        }
      ],
      strokeWidth: 3,
      strokeColor: '#FFFFFFAA'
    }],
    polyline: [{
      id: 100,
      points: [
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 23.098994,
          longitude: 113.323520
        },
        {
          latitude: 23.098994,
          longitude: 113.325520
        }
      ],
      color: '#ff0000',
      width: 2
      //dottedLine: true
    }],
    circle: [{
      latitude: 23.099994,
      longitude: 113.324520,
      color: '#ff0000',
      fillColor: '#f99c9c',
      radius: 10,
      strokeWidth: 2
    }],
    subKey: 'B5QBZ-7JTLU-DSSVA-2BRJ3-TNXLF-2TBR7',
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
    enableSatellite: false,
    enableTraffic: false,
    drawPolyline: true,
    drawCircle: false,
    drawArc: false,
    drawCustomLayer: false,
    drawGroundOverlay: false,
    drawMarkers: true,
    drawVisualLayer: false,
    visualLayerEventHasOn: false,
    markerClusterCreateHasOn: false,
    markerClusterClickHasOn: false,
    setting: {
      enableTraffic: true
    }
  },
  createMapContext() {
    this.setData({
      mapContext: wx.createMapContext('myMap')
    })
    wx.showToast({
      title: i18n['map3']
    })
    log('mapContext=======', this.data.mapContext)
  },
  toggleArc() {
    log('ARC', this.data.drawArc);
    if (this.data.drawArc) {
      this.data.mapContext.removeArc({
        id: 1,
        success: (ret) => {
          log('success', ret);
          this.setData({
            drawArc: !this.data.drawArc
          })
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'success',
            content: JSON.stringify(ret)
          });
        },
        fail: (ret) => {
          log('fail', ret);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'fail',
            content: JSON.stringify(ret)
          });
        },
        complete: (ret) => {
          log('complete', ret);
        }
      })
    } else {
      this.data.mapContext.addArc({
        id: 1,
        start: {
          longitude: 113.325352,
          latitude: 23.100769
        },
        pass: {
          longitude: 113.324052,
          latitude: 23.100133
        },
        end: {
          longitude: 113.323654,
          latitude: 23.099154
        },
        angle: 90,
        width: 15,
        color: '#ff0000',
        success: (ret) => {
          log('success', ret);
          this.setData({
            drawArc: !this.data.drawArc
          })
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'success',
            content: JSON.stringify(ret)
          });
        },
        fail: (ret) => {
          log('fail', ret);
          wx.showModal({
            confirmText: i18n['confirm'],
            cancelText: i18n['cancel'],
            title: 'fail',
            content: JSON.stringify(ret)
          });
        },
        complete: (ret) => {
          log('complete', ret);
        }
      })
    }
  },
  toggleCustomLayer() {
    if (this.data.drawCustomLayer) {
      this.showInputDialog({
        title: i18n['map4'],
        inputs: [
          {
            key: 'layerId',
            name: 'layerId',
            placeholder: '64ddc7436383'
          }
        ],
        onConfirm: (res) => {
          log(res);
          this.data.mapContext.removeCustomLayer({
            layerId: res.layerId || '64ddc7436383',
            success: (res) => {
              log('success', res);
              this.setData({
                drawCustomLayer: !this.data.drawCustomLayer
              })
              wx.showToast({
                title: i18n['map5']
              })
            },
            fail: (res) => {
              log('fail', res);
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          })
        }
      });
    } else {
      this.showInputDialog({
        title: i18n['map6'],
        inputs: [
          {
            key: 'layerId',
            name: 'layerId',
            placeholder: '64ddc7436383'
          }
        ],
        onConfirm: (res) => {
          log('res:', res);
          this.data.mapContext.addCustomLayer({
            layerId: res.layerId || '64ddc7436383',
            success: (res) => {
              log('success', res);
              this.setData({
                drawCustomLayer: !this.data.drawCustomLayer
              })
              wx.showToast({
                title: i18n['map7']
              })
            },
            fail: (res) => {
              log('fail', res);
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          });
        }
      });
    }
  },
  toggleGroundOverlay() {
    if (this.data.drawGroundOverlay) {
      this.showInputDialog({
        title: i18n['map8'],
        inputs: [
          {
            key: 'id',
            name: i18n['map38'],
            placeholder: `${i18n['map38']}:11`
          }
        ],
        onConfirm: (res) => {
          this.data.mapContext.removeGroundOverlay({
            id: Number(res.id) || 11,
            success: (res) => {
              log('success', res);
              this.setData({
                drawGroundOverlay: !this.data.drawGroundOverlay
              })
            },
            fail: (res) => {
              log('fail', res);
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          });
        }
      });
    } else {
      this.showInputDialog({
        title: i18n['map9'],
        inputs: [
          {
            key: 'id',
            name: i18n['map38'],
            placeholder: `${i18n['map38']}:11`
          },
          {
            key: 'src',
            name: i18n['map39'],
            placeholder: `${i18n['map39']}:https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg`
          }
        ],
        onConfirm: (res) => {
          log(res);
          this.data.mapContext.addGroundOverlay({
            id: Number(res.id) || 11,
            src: res.src || 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
            bounds: {
              southwest: {
                latitude: 23.098994,
                longitude: 113.323520
              },
              northeast: {
                latitude: 23.099994,
                longitude: 113.324520
              }
            },
            visible: true,
            zIndex: 1,
            opacity: 1,
            success: (res) => {
              log('success', res);
              this.setData({
                drawGroundOverlay: !this.data.drawGroundOverlay
              })
            },
            fail: (res) => {
              log('fail', res);
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          });
        }
      });
    }
  },
  updateGroundOverlay() {
    this.showInputDialog({
      title: i18n['map10'],
      inputs: [
        {
          key: 'id',
          name: i18n['map38'],
          placeholder: `${i18n['map38']}:11`
        },
        {
          key: 'src',
          name: i18n['map39'],
          placeholder: `${i18n['map39']}:http://resource.gsbankchina.com/res/userIcon/38696951687741122101.png`
        }
      ],
      onConfirm: (res) => {
        log(res);
        this.data.mapContext.updateGroundOverlay({
          id: Number(res.id) || 11,
          src: res.src || 'http://resource.gsbankchina.com/res/userIcon/38696951687741122101.png',
          bounds: {
            southwest: {
              longitude: 113.323654,
              latitude: 23.099154
            },
            northeast: {
              longitude: 113.325352,
              latitude: 23.100769
            }
          },
          visible: true,
          zIndex: 1,
          opacity: 1,
          success: (res) => {
            log('success', res);
          },
          fail: (res) => {
            log('fail', res);
            this.showResult(JSON.stringify(res));
          },
          complete: (res) => {
            log('complete', res);
          }
        })
      }
    });
  },
  showResult(msg) {
    wx.showModal({
      confirmText: i18n['confirm'],
      cancelText: i18n['cancel'],
      title: 'Result',
      content: msg,
      showCancel: false,
      complete: (res) => {
        if (res.cancel) {

        }

        if (res.confirm) {

        }
      }
    })
  },
  toggleMarkers() {
    if (this.data.drawMarkers) {
      this.data.mapContext.removeMarkers({
        markerIds: [101, 103, 104, 105],
        success: (res) => {
          log('removeMarkers success', res)
          this.setData({
            drawMarkers: !this.data.drawMarkers
          })
        },
        fail: (err) => {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    } else {
      this.data.mapContext.addMarkers({
        markers: this.data.markers,
        clear: false,
        success: (res) => {
          log('addMarkers success', res)
          this.setData({
            drawMarkers: !this.data.drawMarkers
          })
        },
        fail: (err) => {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    }
  },
  toggleVisualLayer() {
    if (this.data.drawVisualLayer) {
      this.showInputDialog({
        title: i18n['map11'],
        inputs: [
          {
            key: 'layerId',
            name: 'layerId',
            placeholder: `${i18n['map40']}:ae488bf9ec44`
          }
        ],
        onConfirm: (res) => {
          this.data.mapContext.removeVisualLayer({
            layerId: res.layerId ? res.layerId : 'ae488bf9ec44',
            success: (res) => {
              log('success', res);
              this.setData({
                drawVisualLayer: !this.data.drawVisualLayer
              });
            },
            fail: (res) => {
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          })
        }
      });
    } else {
      this.showInputDialog({
        title: i18n['map12'],
        inputs: [
          {
            key: 'layerId',
            name: 'layerId',
            placeholder: `${i18n['map40']}:ae488bf9ec44`
          }
        ],
        onConfirm: (res) => {
          this.data.mapContext.addVisualLayer({
            layerId: res.layerId ? res.layerId : 'ae488bf9ec44',
            zIndex: 1,
            opacity: 1,
            interval: 20,
            success: (res) => {
              log('success', res)
              this.setData({
                drawVisualLayer: !this.data.drawVisualLayer
              });
            },
            fail: (res) => {
              this.showResult(JSON.stringify(res));
            },
            complete: (res) => {
              log('complete', res);
            }
          });
        }
      });
    }
  },
  eraseLines() {
    this.showInputDialog({
      title: i18n['map13'],
      inputs: [
        {
          key: 'id',
          name: 'id',
          placeholder: `${i18n['map41']}:100`
        },
        {
          key: 'index',
          name: 'index',
          placeholder: `${i18n['map42']}:1`
        },
        {
          key: 'longitude',
          name: 'longitude',
          placeholder: '113.323520'
        },
        {
          key: 'latitude',
          name: 'latitude',
          placeholder: '23.098994'
        }
      ],
      onConfirm: (res) => {
        const id = Number(res.id) || 100;
        const index = Number(res.index) || 1;
        const longitude = Number(res.longitude) || 113.323520;
        const latitude = Number(res.latitude) || 23.098994;
        log(res, id, index, longitude, latitude);
        this.data.mapContext.eraseLines({
          lines: [
            {
              id: id,
              index: index,
              point: {
                latitude: latitude,
                longitude: longitude
              },
              clear: true
            }
          ],
          success: (res) => {
            log('success', res);
          },
          fail: (res) => {
            this.showResult(JSON.stringify(res));
          },
          complete: (res) => {
            log('complete', res);
          }
        });
      }
    });

  },
  executeVisualLayerCommand() {
    this.showInputDialog({
      title: i18n['map14'],
      inputs: [
        {
          key: 'layerId',
          name: 'layerId',
          placeholder: i18n['map26']
        },
        {
          key: 'command',
          name: 'command',
          placeholder: i18n['map27']
        }
      ],
      onConfirm: (res) => {
        log(res);
        this.data.mapContext.executeVisualLayerCommand({
          layerId: res.layerId || '',
          command: res.command || '',
          success: (res) => {
            log('success', res);
            this.showResult(JSON.stringify(res));
          },
          fail: (res) => {
            this.showResult(JSON.stringify(res));
          },
          complete: (res) => {
            log('complete', res);
          }
        });
      }
    });

  },
  mapOn(event) {
    const e = event.target.dataset.event;
    log(event, e);
    switch (e) {
      case 'visualLayerEvent': {
        this.setData({
          visualLayerEventHasOn: true
        })
        break
      }
      case 'markerClusterCreate': {
        this.setData({
          markerClusterCreateHasOn: true
        })
        break
      }
      case 'markerClusterClick': {
        this.setData({
          markerClusterClickHasOn: true
        })
        break
      }
    }
    this.data.mapContext.on(e, (res) => {
      log('on', res);
      this.showResult(JSON.stringify(res));
    });
  },
  fromScreenLocation() {
    this.data.mapContext.fromScreenLocation({
      x: 50,
      y: 50,
      success: (res) => {
        log(res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map15'],
          content: `${i18n['map28']}：${res.longitude}，${i18n['map29']}：${res.latitude}`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getCenterLocation() {
    this.data.mapContext.getCenterLocation({
      success: (res) => {
        log(res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map16'],
          content: `${i18n['map28']}：${res.longitude}，${i18n['map29']}：${res.latitude}`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getRegion() {
    this.data.mapContext.getRegion({
      success: (res) => {
        log(res)
        const { southwest, northeast } = res
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map17'],
          content: `${i18n['map30']}：${i18n['map28']}（${southwest.longitude}），${i18n['map29']}（${southwest.latitude}），${i18n['map31']}：${i18n['map28']}（${northeast.longitude}），${i18n['map29']}（${northeast.latitude}）`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getRotate() {
    this.data.mapContext.getRotate({
      success: (res) => {
        log(res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map18'],
          content: `${i18n['map32']}：${res.rotate}`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getScale() {
    this.data.mapContext.getScale({
      success: (res) => {
        log(res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map19'],
          content: `${i18n['map33']}：${res.scale}`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  getSkew() {
    this.data.mapContext.getSkew({
      success: (res) => {
        log(res)
        wx.showModal({
          confirmText: i18n['confirm'],
          cancelText: i18n['cancel'],
          title: i18n['map20'],
          content: `${i18n['map34']}：${res.skew}`
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  includePoints() {
    this.data.mapContext.includePoints({
      points: this.data.polygons[0].points,
      complete: (res) => {
        log(res)
      }
    })
  },
  initMarkerCluster() {
    this.data.mapContext.initMarkerCluster({
      enableDefaultStyle: true,
      zoomOnClick: true,
      gridSize: 40,
      success: (res) => {
        log('success', res);
      },
      fail: (res) => {
        this.showResult(JSON.stringify(res));
      },
      complete: (res) => {
        log(res)
      }
    });
  },
  setBoundary() {
    this.data.mapContext.setBoundary({
      southwest: {
        longitude: 113.323654,
        latitude: 23.099154
      },
      northeast: {
        longitude: 113.325352,
        latitude: 23.100769
      },
      success: (res) => {
        log('success', res);
        this.showResult(JSON.stringify(res));
      },
      fail: (res) => {
        this.showResult(JSON.stringify(res));
      },
      complete: (res) => {
        log('complete', res);
      }
    });
  },
  setCenterOffset() {
    this.data.mapContext.setCenterOffset({
      offset: [0.5, 0.75],
      success: (res) => {
        log('success', res);
        // this.showResult(JSON.stringify(res));
      },
      fail: (res) => {
        this.showResult(JSON.stringify(res));
      },
      complete: (res) => {
        log('complete', res);
      }
    });
  },
  setLocMarkerIcon() { // Only supported on real devices
    this.showInputDialog({
      title: i18n['map21'],
      inputs: [
        {
          key: 'iconPath',
          name: 'iconPath',
          placeholder: i18n['map22']
        }
      ],
      onConfirm: (res) => {
        this.data.mapContext.setLocMarkerIcon({
          iconPath: res.iconPath || '/packageComponent/resources/kind/map_dark.png',
          success: (res) => {
            log('success', res);
            // this.showResult(JSON.stringify(res));
          },
          fail: (res) => {
            this.showResult(JSON.stringify(res));
          },
          complete: (res) => {
            log('complete', res);
          }
        });
      }
    });

  },
  toScreenLocation() {
    this.data.mapContext.toScreenLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      success: (res) => {
        log('success', res);
        this.showResult(JSON.stringify(res));
      },
      fail: (res) => {
        this.showResult(JSON.stringify(res));
      },
      complete: (res) => {
        log('complete', res);
      }
    });
  },
  moveToLocation() {
    this.data.mapContext.moveToLocation({
      longitude: 113.324620,
      latitude: 23.099494,
      complete: (res) => {
        log(res)
      }
    })
  },
  translateMarker() {
    this.data.mapContext.translateMarker({
      markerId: 101,
      destination: {
        latitude: 23.099494,
        longitude: 113.324620
      },
      autoRotate: true,
      rotate: 0,
      animationEnd: () => {
        log('animationEnd')
      },
      success: (res) => {
        log(res)
        wx.showToast({
          title: i18n['map23']
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  moveAlong() {
    this.data.mapContext.moveAlong({
      markerId: 101,
      // Why the attribute is not taking effect
      autoRotate: true,
      path: [
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 23.099910,
          longitude: 113.324620
        }
      ],
      duration: 1000,
      success: (res) => {
        log(res)
        wx.showToast({
          title: i18n['map24']
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  openMapApp() {
    this.data.mapContext.openMapApp({
      longitude: 113.324620,
      latitude: 23.099494,
      destination: 'T.I.T Creative Park',
      success: (res) => {
        log(res)
        wx.showToast({
          title: i18n['map25']
        })
      },
      fail: (err) => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: i18n['map35']
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

    this.createMapContext();
  },
  onTap(e) {
    log('====onTap', e);
  },
  onMarkerTap(e) {
    log('=======onMarkerTap', e);
  },
  onUpdated(e) {
    log('=======onUpdated', e);
  },
  onRegionChange(e) {
    log('=======onRegionChange', e);
  },
  onAnchorpointTap(e) {
    log('=======onAnchorpointTap', e);
  },
  onPoiTap(e) {
    log('=======onPoiTap', e);
  }
})
