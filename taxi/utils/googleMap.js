const mapKey = require('../tcmpp.config.js');
const language = 'zh-CN';

// 通过经纬度换地点名称
function gMapLocationToName(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1&language=${language}&key=${mapKey.GMapKey}`;
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            success: (res) => {
                if (res.data.status === 'OK') {
                console.log('Places API success:', res.data);
                const placeName = res.data.results[0].name;
                resolve(placeName);
                } else {
                    console.error('Places API error:', res.data.status);
                    reject(res.data.status);
                }
            },
            fail: (error) => {
                console.error('Places API Request failed:', error);
                reject(error);
            }
        });
    })
}

// 通过起始点经纬度获取距离
function gMapCalculateDistance(origin, destination) {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=driving&key=${mapKey.GMapKey}`;
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            success: (res) => {
                if (res.data.status === 'OK') {
                console.log('Distance Matrix API success:', res.data);
                const distance = res.data.rows[0].elements[0].distance.value;
                resolve(distance);
                } else {
                    console.error('Distance Matrix API error:', res.data.status);
                    reject(res.data.status);
                }
            },
            fail: (error) => {
                console.error('Distance Matrix API Request failed:', error);
                reject(error);
            }
        });
    })
}

// 通过起始点经纬度获取驾车的绘制折线数据
function gMapDrivingPolyline(origin, destination) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${mapKey.GMapKey}`;
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            success: (res) => {
                if (res.data.status === 'OK') {
                console.log('Directions API success:', res.data);
                const points = decodePolyline(res.data.routes[0].overview_polyline.points);
                resolve(points);
                } else {
                    console.error('Directions API error:', res.data.status);
                    reject(res.data.status);
                }
            },
            fail: (error) => {
                console.error('Directions API Request failed:', error);
                reject(error);
            }
        });
    })
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

      points.push({
        latitude: (lat / 1e5),
        longitude: (lng / 1e5)
      });
    }

    return points;
  }

module.exports = {
  gMapLocationToName,
  gMapCalculateDistance,
  gMapDrivingPolyline,
}
