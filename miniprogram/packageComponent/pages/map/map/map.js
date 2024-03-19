import { i18n,lang } from '../../../../i18n/lang'
Page({
  onShareAppMessage() {
    return {
      title: 'map',
      path: 'packageComponent/pages/map/map/map'
    }
  },

  data: {
    t: i18n,
    lang,
    theme: 'light',
    // latitude: 23.099994,
    // longitude: 113.324520,
    latitude: 22.27453693935466,
    longitude: 114.18188093885226,
    markers: [{
      // latitude: 23.099994,
      // longitude: 113.324520,
      // name: 'T.I.T Creative Park',
      // title: 'marker1',
      latitude: 22.27453693935466,
      longitude: 114.18188093885226,
      name: 'Emperor Group Center',
      title: 'marker1',
      callout: { content: 'callout111', display: 'ALWAYS' },
      anchor: {
        x: .5,
        y: 1
      },
      label: {
        content: 'label111'
      }
    }],
    polygons: [{
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
      strokeWidth: 3,
      strokeColor: '#ff0000'
    }],
    polyline: [{
      points: [
        {
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          id: 1,
          latitude: 23.098994,
          longitude: 113.323520
        },
        {
          id: 2,
          latitude: 23.098994,
          longitude: 113.325520
        }
      ],
      id: 0,
      color: '#ff0000',
      width: 2,
      dottedLine: true
    }],
    circle: [{
      latitude: 23.099994,
      longitude: 113.324520,
      color: '#ff0000',
      fillColor: '#f99c9c',
      radius: 50,
      strokeWidth: 2
    }],
    includePoints: [],
    showLocation: false,
    subKey: 'B5QBZ-7JTLU-DSSVA-2BRJ3-TNXLF-2TBR7',
    enable3d: false,
    showCompass: false,
    showScale: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
    enableSatellite: false,
    enableTraffic: false,
    drawPolyline: false,
    drawCircle: false,
    scale: 15,
    setting: {
      // enableTraffic: true,
      // scale: 3,
    },
    enablePoi: true,
    enableBuilding: true
  },
  toggleScale() {
    if (this.data.scale !== 3) {
      this.setData({
        scale: 3
      })
    } else {
      this.setData({
        scale: 18
      })
    }
  },
  togglePosition() {
    if (this.data.latitude !== 23.099994) {
      this.setData({
        latitude: 23.099994,
        longitude: 113.324520
      })
    } else {
      this.setData({
        latitude: 22.27453693935466,
        longitude: 114.18188093885226
      })
    }
  },
  toggle3d() {
    this.setData({
      enable3d: !this.data.enable3d
    });
  },
  toggleEnablePoi() {
    this.setData({
      enablePoi: !this.data.enablePoi
    });
  },
  toggleEnableBuilding() {
    this.setData({
      enableBuilding: !this.data.enableBuilding
    });
  },
  toggleShowCompass() {
    this.setData({
      showCompass: !this.data.showCompass
    });
  },
  toggleShowScale() {
    this.setData({
      showScale: !this.data.showScale
    })
  },
  toggleOverlooking() {
    this.setData({
      enableOverlooking: !this.data.enableOverlooking
    });
  },
  toggleZoom() {
    this.setData({
      enableZoom: !this.data.enableZoom
    })
  },
  toggleScroll() {
    this.setData({
      enableScroll: !this.data.enableScroll
    })
  },
  toggleRotate() {
    this.setData({
      enableRotate: !this.data.enableRotate
    });
  },
  togglePolygon() {
    this.setData({
      drawPolygon: !this.data.drawPolygon
    })
  },
  togglePolyline() {
    this.setData({
      drawPolyline: !this.data.drawPolyline
    });
  },
  toggleCircle() {
    this.setData({
      drawCircle: !this.data.drawCircle
    });
  },
  toggleSatellite() {
    this.setData({
      enableSatellite: !this.data.enableSatellite
    })
  },
  toggleTraffic() {
    this.setData({
      enableTraffic: !this.data.enableTraffic
    })
  },
  toggleShowLocation() {
    this.setData({
      showLocation: !this.data.showLocation
    });
  },
  toggleIncludePoints() {
    this.setData({
      includePoints: [
        {
          latitude: 23.099994,
          longitude: 113.324520
        },
        {
          latitude: 22.27453693935466,
          longitude: 114.18188093885226
        }
      ]
    })
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
  },
  onTap(e) {
    console.log('====onTap', e);
  },
  onLabelTap(e) {
    console.log('====onLabelTap', e);
  },
  onControltap(e) {
    console.log('====onControltap', e);
  },
  onCalloutap(e) {
    console.log('====onCalloutap', e);
  },
  onAnchorpointtap(e) {
    console.log('====onAnchorpointtap', e);
  },
  onMarkerTap(e) {
    console.log('=======onMarkerTap', e);
  },
  onUpdated(e) {
    console.log('=======onUpdated', e);
  },
  onRegionChange(e) {
    console.log('=======onRegionChange', e);
  },
  onAnchorpointTap(e) {
    console.log('=======onAnchorpointTap', e);
  },
  onPoiTap(e) {
    console.log('=======onPoiTap', e);
  }
})
