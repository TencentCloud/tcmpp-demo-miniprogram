
import { getLang } from '../i18n/lang'
// *******google地图API请求地址*******
const googleMapUrl = 'https://maps.googleapis.com/maps/api'
const googleMapApi = {
  textsearch: `${googleMapUrl}/place/textsearch/json`, // Places API 地点搜索——文本搜索
  autocomplete: `${googleMapUrl}/place/autocomplete/json`, // Places API 地点自动补全
  geocode: `${googleMapUrl}/geocode/json`, // Geocoding API 地理编码请求和响应
  directions: `${googleMapUrl}/directions/json`, // Directions API 查询路线
  distancematrix: `${googleMapUrl}/distancematrix/json`, // Distance Matrix API 距离矩阵请求
}

// Google Maps Directions API 返回的路线数据中，overview_polyline 是一个经过压缩和编码的字符串。这个编码字符串使用了一种称为 Polyline Encoding 的算法，以减少数据传输的大小。为了在地图上绘制这条路线，我们需要将这个编码字符串解码为一系列的经纬度坐标点。
function decodePolyline(encoded) {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push({ latitude: (lat / 1e5), longitude: (lng / 1e5) });
    }

    return points;
}

class MapServiceAdapter {
  constructor(serviceType, apiKey) {
    // serviceType预留地图类型，方便后续接入其他类型地图，目前仅支持[GoogleMaps]
    this.serviceType = serviceType;
    this.apiKey = apiKey;

    if (serviceType === 'GoogleMaps') {
      // Google Maps API 不需要实例化
      this.service = null;
    } else {
      throw new Error('Unsupported service type');
    }
  }

  // 必填及类型校验
  validateOptions(options, requiredFields, optionalFields = { success: 'function', fail: 'function', complete: 'function' }) {
    requiredFields.forEach(field => {
      if (typeof options[field] === 'undefined') {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    Object.keys(optionalFields).forEach(field => {
      if (typeof options[field] !== 'undefined' && typeof options[field] !== optionalFields[field]) {
        throw new Error(`Invalid type for ${field}, expected ${optionalFields[field]}`);
      }
    });
  }

  search(options) {
    this.validateOptions(options, ['keyword']);

    const {
      keyword,
      location,
      success,
      fail,
      complete
      } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey,
        query: keyword
      };

      if(location) {
        data.location = typeof location === 'string' ? location : `${location.latitude},${location.longitude}`
      }

      wx.request({
        url: googleMapApi.textsearch,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            success(res.data, res.data.results);
          } else {
            fail({ message: res.data.error_message });
          }
        },
        fail,
        complete
      });
    }
  }

  getSuggestion(options) {
    this.validateOptions(options, ['keyword']);

    const {
      keyword,
      location,
      success,
      fail,
      complete
      } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey,
        input: keyword
      };

      if(location) {
        data.location = location
      }

      wx.request({
        url: googleMapApi.autocomplete,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            success(res.data, res.data.results);
          } else {
            fail({ message: res.data.error_message });
          }
        },
        fail,
        complete
      });
    }
  }

  reverseGeocoder(options) {
    this.validateOptions(options, ['location']);

    const {
      location,
      success,
      fail,
      complete
      } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey
      };

      data.latlng = typeof location === 'string' ? location : `${location.latitude},${location.longitude}`

      wx.request({
        url: googleMapApi.geocode,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            const result = res.data.results[0]
            const gRes = {
              status: 0,
              message: 'query ok',
              result: {
                address: result.formatted_address,
                formatted_addresses: {
                  recommend: result.formatted_address,
                  rough: result.plus_code.compound_code
                },
                address_component: {},
                ad_info: {
                  adcode: result.plus_code.global_code,
                  name: result.plus_code.compound_code,
                  location: result.geometry.location
                },
                address_reference: {},
                pois: {}
              }
            }
            for (const component in result.addressComponents) {
              if (component.types.includes('country')) {
                  gRes.result.address_component.nation = component.long_name;
                  gRes.result.ad_info.nation = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                  gRes.result.address_component.province = component.long_name;
                  gRes.result.ad_info.province = component.long_name;
              }
              if (component.types.includes('administrative_area_level_2')) {
                  gRes.result.address_component.city = component.long_name;
                  gRes.result.ad_info.city = component.long_name;
              }
              if (component.types.includes('sublocality_level_1')) {
                  gRes.result.address_component.district = component.long_name;
                  gRes.result.ad_info.district = component.long_name;
              }
              if (component.types.includes('route')) {
                  gRes.result.address_component.street = component.long_name;
              }
              if (component.types.includes('street_number')) {
                  gRes.result.address_component.street_number = component.long_name;
              }
            }
            success(gRes, gRes.result);
          } else {
            fail({ message: res.data.error_message });
          }
        },
        fail,
        complete
      });
    }
  }

  geocoder(options) {
    this.validateOptions(options, ['address']);

    const {
      address,
      success,
      fail,
      complete
      } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey,
        address,
      };

      wx.request({
        url: googleMapApi.geocode,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            success(res.data, res.data.results);
          } else {
            fail({ message: res.data.error_message });
          }
        },
        fail,
        complete
      });
    }
  }

  direction(options) {
    this.validateOptions(options, ['from', 'to']);

    const {
      mode,
      from,
      to,
      departure_time,
      success,
      fail,
      complete
    } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey,
        mode
      };

      if(departure_time) {
        data.departure_time = departure_time
      }
      data.origin = typeof from === 'string' ? from : `${from.latitude},${from.longitude}`
      data.destination = typeof to === 'string' ? to : `${to.latitude},${to.longitude}`

      wx.request({
        url: googleMapApi.directions,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            const gRes = {
              status: 0,
              message: 'Success',
              result: {
                routes: []
              }
            }
            gRes.result.routes = res.data.routes.map(route => {
              return {
                mode: mode.toUpperCase(),
                tags: [],
                distance: route.legs[0].distance.value,
                duration: route.legs[0].duration.value,
                direction: '',
                restriction: {},
                polyline: decodePolyline(route.overview_polyline.points),
                waypoints: route.legs[0].via_waypoint,
                taxi_fare: {},
                steps: route.legs[0].steps.map(step => {
                  return {
                    instruction: step.html_instructions,
                    polyline_idx: [],
                    road_name: '',
                    dir_desc: '',
                    distance: step.distance.value,
                    act_desc: '',
                    accessorial_desc: ''
                  }
                })
              }
            })
            success(gRes, gRes.result);
          } else {
            fail({ message: res.data.error_message || res.data.status });
          }
        },
        fail,
        complete
      });
    }
  }

  calculateDistance(options) {
    this.validateOptions(options, ['from', 'to']);

    const {
      mode,
      from,
      to,
      success,
      fail,
      complete
    } = options;

    if (this.serviceType === 'GoogleMaps') {
      const data = {
        language: getLang(),
        key: this.apiKey,
        mode
      };

      data.origins = typeof from === 'string' ? from : `${from.latitude},${from.longitude}`
      data.destinations = typeof to === 'string' ? to.replace(/;/g, '|') : to.map(loc => loc.location ? `${loc.location.latitude},${loc.location.longitude}` : `${loc.latitude},${loc.longitude}`).join('|')

      wx.request({
        url: googleMapApi.distancematrix,
        data,
        success: res => {
          if (res.data.status === 'OK') {
            const gRes = {
              status: res.data.status,
              result: {
                elements: res.data.rows[0].elements.map(el => {
                  return {
                    distance: el.distance?.value,
                    duration: el.duration?.value
                  }
                })
              }
            }
            success(gRes, gRes.result);
          } else {
            fail({ message: res.data.error_message || res.data.status });
          }
        },
        fail,
        complete
      });
    }
  }

  getCityList(options) {
    this.validateOptions(options, []);

    if (this.serviceType === 'GoogleMaps') {
      // Google Maps API 没有直接的 getCityList 方法
      options.fail({ message: 'Google Maps API does not support getCityList' });
    }
  }

  getDistrictByCityId(options) {
    this.validateOptions(options, ['id']);

    if (this.serviceType === 'GoogleMaps') {
      // Google Maps API 没有直接的 getDistrictByCityId 方法
      options.fail({ message: 'Google Maps API does not support getDistrictByCityId' });
    }
  }
}

module.exports = MapServiceAdapter;