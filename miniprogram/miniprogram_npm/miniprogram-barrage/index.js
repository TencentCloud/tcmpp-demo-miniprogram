module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Get byte length, counting Chinese as 2 bytes
function getStrLen(str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[^\x00-\xff]/g, 'aa').length;
}

// Retrieve a substring of specified byte length
function substring(str, n) {
  if (!str) return '';

  var len = getStrLen(str);
  if (n >= len) return str;

  var l = 0;
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var ch = str.charAt(i);
    // eslint-disable-next-line no-control-regex
    l = /[^\x00-\xff]/i.test(ch) ? l + 2 : l + 1;
    result += ch;
    if (l >= n) break;
  }
  return result;
}

function getRandom() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Math.floor(Math.random() * (max - min) + min);
}

function getFontSize(font) {
  var reg = /(\d+)(px)/i;
  var match = font.match(reg);
  return match && match[1] || 10;
}

function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

var getType = function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
};
var isArray = function isArray(obj) {
  return getType(obj) === 'Array';
};

module.exports = {
  getStrLen: getStrLen,
  substring: substring,
  getRandom: getRandom,
  getFontSize: getFontSize,
  compareVersion: compareVersion,
  isArray: isArray
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _barrageDom = __webpack_require__(2);

var _barrageDom2 = _interopRequireDefault(_barrageDom);

var _barrageCanvas = __webpack_require__(3);

var _barrageCanvas2 = _interopRequireDefault(_barrageCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    zIndex: {
      type: Number,
      value: 10
    },

    renderingMode: {
      type: String,
      value: 'canvas'
    }
  },

  methods: {
    getBarrageInstance: function getBarrageInstance() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      opt.comp = this;
      this.barrageInstance = this.data.renderingMode === 'dom' ? new _barrageDom2.default(opt) : new _barrageCanvas2.default(opt);
      return this.barrageInstance;
    },
    onAnimationend: function onAnimationend(e) {
      var _e$currentTarget$data = e.currentTarget.dataset,
          tunnelid = _e$currentTarget$data.tunnelid,
          bulletid = _e$currentTarget$data.bulletid;

      this.barrageInstance.animationend({
        tunnelId: tunnelid,
        bulletId: bulletid
      });
    },
    onTapBullet: function onTapBullet(e) {
      var _e$currentTarget$data2 = e.currentTarget.dataset,
          tunnelid = _e$currentTarget$data2.tunnelid,
          bulletid = _e$currentTarget$data2.bulletid;

      this.barrageInstance.tapBullet({
        tunnelId: tunnelid,
        bulletId: bulletid
      });
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    substring = _require.substring,
    getRandom = _require.getRandom,
    getFontSize = _require.getFontSize,
    isArray = _require.isArray;

var Bullet = function () {
  function Bullet() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Bullet);

    this.bulletId = opt.bulletId;
    this.addContent(opt);
  }

  /**
   * image structure
   * {
   *   head: {src, width, height},
   *   tail: {src, width, height},
   *   gap: 4 // Spacing between image and text
   * }
   */


  Bullet.prototype.addContent = function addContent() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaultBulletOpt = {
      duration: 0, // Animation duration
      passtime: 0, // Time taken for the barrage to cross the right boundary
      content: '', // Text
      color: '#000000', // Default color is black
      width: 0, // Barrage width
      height: 0, // Barrage height
      image: {}, // Image
      paused: false // Whether paused
    };
    Object.assign(this, defaultBulletOpt, opt);
  };

  Bullet.prototype.removeContent = function removeContent() {
    this.addContent({});
  };

  return Bullet;
}();

// Tunnel (Track)）


var Tunnel = function () {
  function Tunnel() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tunnel);

    var defaultTunnelOpt = {
      tunnelId: 0,
      height: 0, // Track height
      width: 0, // Track width
      safeGap: 4, // Safe interval between adjacent barrages
      maxNum: 10, // Buffer queue length
      bullets: [], // Barrage
      last: -1, // The sequence number of the last sent barrage
      bulletStatus: [], // 0 idle, 1 occupied
      disabled: false, // Disabled
      sending: false, // Barrage being sent
      timer: null // Timer
    };
    Object.assign(this, defaultTunnelOpt, opt);
    this.bulletStatus = new Array(this.maxNum).fill(0);
    for (var i = 0; i < this.maxNum; i++) {
      this.bullets.push(new Bullet({
        bulletId: i
      }));
    }
  }

  Tunnel.prototype.disable = function disable() {
    this.disabled = true;
    this.last = -1;
    this.sending = false;
    this.bulletStatus = new Array(this.maxNum).fill(1);
    this.bullets.forEach(function (bullet) {
      return bullet.removeContent();
    });
  };

  Tunnel.prototype.enable = function enable() {
    if (this.disabled) {
      this.bulletStatus = new Array(this.maxNum).fill(0);
    }
    this.disabled = false;
  };

  Tunnel.prototype.clear = function clear() {
    this.last = -1;
    this.sending = false;
    this.bulletStatus = new Array(this.maxNum).fill(0);
    this.bullets.forEach(function (bullet) {
      return bullet.removeContent();
    });
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  Tunnel.prototype.getIdleBulletIdx = function getIdleBulletIdx() {
    var idle = this.bulletStatus.indexOf(0, this.last + 1);
    if (idle === -1) {
      idle = this.bulletStatus.indexOf(0);
    }

    return idle;
  };

  Tunnel.prototype.getIdleBulletNum = function getIdleBulletNum() {
    var count = 0;
    this.bulletStatus.forEach(function (status) {
      if (status === 0) count++;
    });
    return count;
  };

  Tunnel.prototype.addBullet = function addBullet(opt) {
    if (this.disabled) return;
    var idx = this.getIdleBulletIdx();
    if (idx >= 0) {
      this.bulletStatus[idx] = 1;
      this.bullets[idx].addContent(opt);
    }
  };

  Tunnel.prototype.removeBullet = function removeBullet(bulletId) {
    if (this.disabled) return;
    this.bulletStatus[bulletId] = 0;
    var bullet = this.bullets[bulletId];
    bullet.removeContent();
  };

  return Tunnel;
}();

// Barrage (control center)


var Barrage = function () {
  function Barrage() {
    var _this = this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Barrage);

    var defaultBarrageOpt = {
      duration: 10, // Barrage animation duration
      lineHeight: 1.2, // Barrage line height
      padding: [0, 0, 0, 0], // Padding around the barrage area
      alpha: 1, // Global transparency
      font: '10px sans-serif', // Global font
      mode: 'separate', // Barrage overlap, not overlap separate
      range: [0, 1], // Vertical range of barrage display, supports two values. [0,1] indicates random distribution of the entire barrage，
      tunnelShow: false, // Display track lines
      tunnelMaxNum: 30, // Maximum buffer length for tunnels
      maxLength: 30, // Maximum byte length of barrage, Chinese characters count as double bytes
      safeGap: 4, // Safe interval during sending
      enableTap: false, // Clicking on a barrage stops the animation and highlights it
      tunnelHeight: 0,
      tunnelNum: 0,
      tunnels: [],
      idleTunnels: null,
      enableTunnels: null,
      distance: 2000,
      comp: null // Component instance
    };
    Object.assign(this, defaultBarrageOpt, opt);
    this._ready = false;
    this._deferred = [];

    var query = this.comp.createSelectorQuery();
    query.select('.barrage-area').boundingClientRect(function (res) {
      _this.init(res);
      _this.ready();
    }).exec();
  }

  Barrage.prototype.ready = function ready() {
    var _this2 = this;

    this._ready = true;
    this._deferred.forEach(function (item) {
      // eslint-disable-next-line prefer-spread
      _this2[item.callback].apply(_this2, item.args);
    });

    this._deferred = [];
  };

  Barrage.prototype._delay = function _delay(method) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    this._deferred.push({
      callback: method,
      args: params
    });
  };

  Barrage.prototype.init = function init(opt) {
    this.width = opt.width;
    this.height = opt.height;
    this.fontSize = getFontSize(this.font);
    this.idleTunnels = new Set();
    this.enableTunnels = new Set();
    this.tunnels = [];
    this.availableHeight = this.height - this.padding[0] - this.padding[2];
    this.tunnelHeight = this.fontSize * this.lineHeight;
    this.tunnelNum = Math.floor(this.availableHeight / this.tunnelHeight);
    for (var i = 0; i < this.tunnelNum; i++) {
      this.idleTunnels.add(i); // Idle tunnel id collection
      this.enableTunnels.add(i); // Available tunnel id collection

      this.tunnels.push(new Tunnel({ // Tunnel collection
        width: this.width,
        height: this.tunnelHeight,
        safeGap: this.safeGap,
        maxNum: this.tunnelMaxNum,
        tunnelId: i
      }));
    }
    this.comp.setData({
      fontSize: this.fontSize,
      tunnelShow: this.tunnelShow,
      tunnels: this.tunnels,
      font: this.font,
      alpha: this.alpha,
      padding: this.padding.map(function (item) {
        return item + 'px';
      }).join(' ')
    });
    // Filter tunnels within the specified range
    this.setRange();
  };

  // Set display range range: [0,1]


  Barrage.prototype.setRange = function setRange(range) {
    var _this3 = this;

    if (!this._ready) {
      this._delay('setRange', range);
      return;
    }

    range = range || this.range;
    var top = range[0] * this.tunnelNum;
    var bottom = range[1] * this.tunnelNum;
    // Release tunnels that meet the requirements
    // Find currently idle tunnels
    var idleTunnels = new Set();
    var enableTunnels = new Set();
    this.tunnels.forEach(function (tunnel, tunnelId) {
      if (tunnelId >= top && tunnelId < bottom) {
        var disabled = tunnel.disabled;
        tunnel.enable();
        enableTunnels.add(tunnelId);

        if (disabled || _this3.idleTunnels.has(tunnelId)) {
          idleTunnels.add(tunnelId);
        }
      } else {
        tunnel.disable();
      }
    });
    this.idleTunnels = idleTunnels;
    this.enableTunnels = enableTunnels;
    this.range = range;
    this.comp.setData({ tunnels: this.tunnels });
  };

  Barrage.prototype.setFont = function setFont(font) {
    if (!this._ready) {
      this._delay('setFont', font);
      return;
    }

    if (typeof font !== 'string') return;
    this.font = font;
    this.comp.setData({ font: font });
  };

  Barrage.prototype.setAlpha = function setAlpha(alpha) {
    if (!this._ready) {
      this._delay('setAlpha', alpha);
      return;
    }

    if (typeof alpha !== 'number') return;
    this.alpha = alpha;
    this.comp.setData({ alpha: alpha });
  };

  Barrage.prototype.setDuration = function setDuration(duration) {
    if (!this._ready) {
      this._delay('setDuration', duration);
      return;
    }

    if (typeof duration !== 'number') return;
    this.duration = duration;
    this.clear();
  };

  // Enable barrages


  Barrage.prototype.open = function open() {
    if (!this._ready) {
      this._delay('open');
      return;
    }

    this._isActive = true;
  };

  // Disable barrages, clear all data


  Barrage.prototype.close = function close() {
    if (!this._ready) {
      this._delay('close');
      return;
    }

    this._isActive = false;
    this.clear();
  };

  Barrage.prototype.clear = function clear() {
    this.tunnels.forEach(function (tunnel) {
      return tunnel.clear();
    });
    this.idleTunnels = new Set(this.enableTunnels);
    this.comp.setData({ tunnels: this.tunnels });
  };

  // Add a batch of barrages, will be discarded when the track is full


  Barrage.prototype.addData = function addData() {
    var _this4 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!isArray(data)) return;

    if (!this._ready) {
      this._delay('addData', data);
      return;
    }

    if (!this._isActive) return;

    data.forEach(function (item) {
      item.content = substring(item.content, _this4.maxLength);
      _this4.addBullet2Tunnel(item);
    });
    this.comp.setData({
      tunnels: this.tunnels
    }, function () {
      _this4.updateBullets();
    });
  };

  // Send a barrage


  Barrage.prototype.send = function send() {
    var _this5 = this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this._ready) {
      this._delay('send', opt);
      return;
    }
    var tunnel = this.getEnableTunnel();
    if (tunnel === null) return;

    var timer = setInterval(function () {
      var tunnel = _this5.getIdleTunnel();
      if (tunnel) {
        _this5.addData([opt]);
        clearInterval(timer);
      }
    }, 16);
  };

  // Add to track


  Barrage.prototype.addBullet2Tunnel = function addBullet2Tunnel() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tunnel = this.getIdleTunnel();
    if (tunnel === null) return;

    var tunnelId = tunnel.tunnelId;
    tunnel.addBullet(opt);
    if (tunnel.getIdleBulletNum() === 0) this.removeIdleTunnel(tunnelId);
  };

  Barrage.prototype.updateBullets = function updateBullets() {
    var _this6 = this;

    var self = this;
    var query = this.comp.createSelectorQuery();
    query.selectAll('.bullet-item').boundingClientRect(function (res) {
      if (!_this6._isActive) return;

      for (var i = 0; i < res.length; i++) {
        var _res$i$dataset = res[i].dataset,
            tunnelid = _res$i$dataset.tunnelid,
            bulletid = _res$i$dataset.bulletid;

        var tunnel = self.tunnels[tunnelid];
        var bullet = tunnel.bullets[bulletid];
        bullet.width = res[i].width;
        bullet.height = res[i].height;
      }
      self.animate();
    }).exec();
  };

  Barrage.prototype.animate = function animate() {
    var _this7 = this;

    this.tunnels.forEach(function (tunnel) {
      _this7.tunnelAnimate(tunnel);
    });
  };

  Barrage.prototype.tunnelAnimate = function tunnelAnimate(tunnel) {
    var _this8 = this;

    if (tunnel.disabled || tunnel.sending || !this._isActive) return;

    var next = (tunnel.last + 1) % tunnel.maxNum;
    var bullet = tunnel.bullets[next];

    if (!bullet) return;

    if (bullet.content || bullet.image.head || bullet.image.tail) {
      var _comp$setData;

      tunnel.sending = true;
      tunnel.last = next;
      var duration = this.duration;
      if (this.mode === 'overlap') {
        duration = this.distance * this.duration / (this.distance + bullet.width);
      }
      var passDistance = bullet.width + tunnel.safeGap;
      bullet.duration = duration;
      // Wait for the previous one to pass the right boundary
      bullet.passtime = Math.ceil(passDistance * bullet.duration * 1000 / this.distance);
      this.comp.setData((_comp$setData = {}, _comp$setData['tunnels[' + tunnel.tunnelId + '].bullets[' + bullet.bulletId + ']'] = bullet, _comp$setData), function () {
        tunnel.timer = setTimeout(function () {
          tunnel.sending = false;
          _this8.tunnelAnimate(tunnel);
        }, bullet.passtime);
      });
    }
  };

  Barrage.prototype.showTunnel = function showTunnel() {
    this.comp.setData({
      tunnelShow: true
    });
  };

  Barrage.prototype.hideTunnel = function hideTunnel() {
    this.comp.setData({
      tunnelShow: false
    });
  };

  Barrage.prototype.removeIdleTunnel = function removeIdleTunnel(tunnelId) {
    this.idleTunnels.delete(tunnelId);
  };

  Barrage.prototype.addIdleTunnel = function addIdleTunnel(tunnelId) {
    this.idleTunnels.add(tunnelId);
  };

  // Randomly pick one from available tunnels


  Barrage.prototype.getEnableTunnel = function getEnableTunnel() {
    if (this.enableTunnels.size === 0) return null;
    var enableTunnels = Array.from(this.enableTunnels);
    var index = getRandom(enableTunnels.length);
    return this.tunnels[enableTunnels[index]];
  };

  // Randomly pick one from tunnels with remaining capacity


  Barrage.prototype.getIdleTunnel = function getIdleTunnel() {
    if (this.idleTunnels.size === 0) return null;
    var idleTunnels = Array.from(this.idleTunnels);
    var index = getRandom(idleTunnels.length);
    return this.tunnels[idleTunnels[index]];
  };

  Barrage.prototype.animationend = function animationend(opt) {
    var _comp$setData2;

    var tunnelId = opt.tunnelId,
        bulletId = opt.bulletId;

    var tunnel = this.tunnels[tunnelId];
    if (!tunnel) return;

    var bullet = tunnel.bullets[bulletId];
    if (!bullet) return;

    tunnel.removeBullet(bulletId);
    this.addIdleTunnel(tunnelId);
    this.comp.setData((_comp$setData2 = {}, _comp$setData2['tunnels[' + tunnelId + '].bullets[' + bulletId + ']'] = bullet, _comp$setData2));
  };

  Barrage.prototype.tapBullet = function tapBullet(opt) {
    var _comp$setData3;

    if (!this.enableTap) return;

    var tunnelId = opt.tunnelId,
        bulletId = opt.bulletId;

    var tunnel = this.tunnels[tunnelId];
    var bullet = tunnel.bullets[bulletId];
    bullet.paused = !bullet.paused;
    this.comp.setData((_comp$setData3 = {}, _comp$setData3['tunnels[' + tunnelId + '].bullets[' + bulletId + ']'] = bullet, _comp$setData3));
  };

  return Barrage;
}();

exports.default = Barrage;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(barrage) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Bullet);

    var defaultBulletOpt = {
      color: '#000000', // Default color is black
      font: '10px sans-serif',
      fontSize: 10, // Global font size
      content: '',
      textWidth: 0,
      speed: 0, // Calculated based on screen stay duration
      x: 0,
      y: 0,
      tunnelId: 0,
      // image: {
      //   head: {src, width, height}, // Add an image at the head of the barrage
      //   tail: {src, width, height}, // Add an image at the tail of the barrage
      //   gap: 4 // Spacing between image and text
      // }
      image: {},
      imageHead: null, // Image object
      imageTail: null
      // status: 0 // 0: Pending, 1: Not fully entered the screen, 2: Fully entered the screen, 3: Completely exited the screen
    };
    Object.assign(this, defaultBulletOpt, opt);

    this.barrage = barrage;
    this.ctx = barrage.ctx;
    this.canvas = barrage.canvas;
  }

  Bullet.prototype.move = function move() {
    var _this = this;

    if (this.image.head && !this.imageHead) {
      var Image = this.canvas.createImage();
      Image.src = this.image.head.src;
      Image.onload = function () {
        _this.imageHead = Image;
      };
      Image.onerror = function () {
        // eslint-disable-next-line no-console
        console.log('Fail to load image: ' + _this.image.head.src);
      };
    }

    if (this.image.tail && !this.imageTail) {
      var _Image = this.canvas.createImage();
      _Image.src = this.image.tail.src;
      _Image.onload = function () {
        _this.imageTail = _Image;
      };
      _Image.onerror = function () {
        // eslint-disable-next-line no-console
        console.log('Fail to load image: ' + _this.image.tail.src);
      };
    }

    if (this.imageHead) {
      var _image$head = this.image.head,
          _image$head$width = _image$head.width,
          width = _image$head$width === undefined ? this.fontSize : _image$head$width,
          _image$head$height = _image$head.height,
          height = _image$head$height === undefined ? this.fontSize : _image$head$height,
          _image$head$gap = _image$head.gap,
          gap = _image$head$gap === undefined ? 4 : _image$head$gap;

      var x = this.x - gap - width;
      var y = this.y - 0.5 * height;
      this.ctx.drawImage(this.imageHead, x, y, width, height);
    }

    if (this.imageTail) {
      var _image$tail = this.image.tail,
          _image$tail$width = _image$tail.width,
          _width = _image$tail$width === undefined ? this.fontSize : _image$tail$width,
          _image$tail$height = _image$tail.height,
          _height = _image$tail$height === undefined ? this.fontSize : _image$tail$height,
          _image$tail$gap = _image$tail.gap,
          _gap = _image$tail$gap === undefined ? 4 : _image$tail$gap;

      var _x2 = this.x + this.textWidth + _gap;
      var _y = this.y - 0.5 * _height;
      this.ctx.drawImage(this.imageTail, _x2, _y, _width, _height);
    }

    this.x = this.x - this.speed;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.content, this.x, this.y);
  };

  return Bullet;
}();

// Tunnel (Track)）


var Tunnel = function () {
  function Tunnel(barrage) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tunnel);

    var defaultTunnelOpt = {
      activeQueue: [], // In-screen list
      nextQueue: [], // To-play list
      maxNum: 30,
      freeNum: 30, // Remaining quantity that can be added
      height: 0,
      width: 0,
      disabled: false,
      tunnelId: 0,
      safeArea: 4,
      sending: false // Barrage being sent
    };
    Object.assign(this, defaultTunnelOpt, opt);

    this.freeNum = this.maxNum;
    this.barrage = barrage; // Control center
    this.ctx = barrage.ctx;
  }

  Tunnel.prototype.disable = function disable() {
    this.disabled = true;
  };

  Tunnel.prototype.enable = function enable() {
    this.disabled = false;
  };

  Tunnel.prototype.clear = function clear() {
    this.activeQueue = [];
    this.nextQueue = [];
    this.sending = false;
    this.freeNum = this.maxNum;
    this.barrage.addIdleTunnel(this.tunnelId);
  };

  Tunnel.prototype.addBullet = function addBullet(bullet) {
    if (this.disabled) return;
    if (this.freeNum === 0) return;
    this.nextQueue.push(bullet);
    this.freeNum--;
    if (this.freeNum === 0) {
      this.barrage.removeIdleTunnel(this.tunnelId);
    }
  };

  Tunnel.prototype.animate = function animate() {
    if (this.disabled) return;
    // No barrage being sent, add one
    var nextQueue = this.nextQueue;
    var activeQueue = this.activeQueue;
    if (!this.sending && nextQueue.length > 0) {
      var bullet = nextQueue.shift();
      activeQueue.push(bullet);
      this.freeNum++;
      this.sending = true;
      this.barrage.addIdleTunnel(this.tunnelId);
    }

    if (activeQueue.length > 0) {
      activeQueue.forEach(function (bullet) {
        return bullet.move();
      });
      var head = activeQueue[0];
      var tail = activeQueue[activeQueue.length - 1];
      // Remove from the front of the queue
      if (head.x + head.textWidth < 0) {
        activeQueue.shift();
      }
      // Tail leaves the safe area
      if (tail.x + tail.textWidth + this.safeArea < this.width) {
        this.sending = false;
      }
    }
  };

  return Tunnel;
}();

var Barrage = function () {
  function Barrage() {
    var _this2 = this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Barrage);

    var defaultBarrageOpt = {
      font: '10px sans-serif',
      duration: 15, // Duration of barrage stay on the screen
      lineHeight: 1.2,
      padding: [0, 0, 0, 0],
      tunnelHeight: 0,
      tunnelNum: 0,
      tunnelMaxNum: 30, // Maximum buffer length for tunnels
      maxLength: 30, // Maximum byte length, Chinese characters count as double bytes
      safeArea: 4, // Safe interval during sending
      tunnels: [],
      idleTunnels: [],
      enableTunnels: [],
      alpha: 1, // Global transparency
      mode: 'separate', // Barrage overlap, not overlap separate
      range: [0, 1], // Vertical range of barrage display, supports two values. [0,1] indicates random distribution of the entire barrage，
      fps: 60, // Refresh rate
      tunnelShow: false, // Display track lines
      comp: null // Component instance
    };
    Object.assign(this, defaultBarrageOpt, opt);
    var systemInfo = wx.getSystemInfoSync();
    this.ratio = systemInfo.pixelRatio;
    this.selector = '#weui-canvas';
    this._ready = false;
    this._deferred = [];

    var query = this.comp.createSelectorQuery();
    query.select(this.selector).boundingClientRect();
    query.select(this.selector).node();
    query.exec(function (res) {
      _this2.canvas = res[1].node;
      _this2.init(res[0]);
      _this2.ready();
    });
  }

  Barrage.prototype.ready = function ready() {
    var _this3 = this;

    this._ready = true;
    this._deferred.forEach(function (item) {
      // eslint-disable-next-line prefer-spread
      _this3[item.callback].apply(_this3, item.args);
    });

    this._deferred = [];
  };

  Barrage.prototype._delay = function _delay(method, args) {
    this._deferred.push({
      callback: method,
      args: args
    });
  };

  Barrage.prototype.init = function init() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.width = opt.width;
    this.height = opt.height;
    this.fontSize = (0, _utils.getFontSize)(this.font);
    this.innerDuration = this.transfromDuration2Canvas(this.duration);

    var ratio = this.ratio; // Device pixel ratio
    this.canvas.width = this.width * ratio;
    this.canvas.height = this.height * ratio;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(ratio, ratio);

    this.ctx.textBaseline = 'middle';
    this.ctx.globalAlpha = this.alpha;
    this.ctx.font = this.font;

    this.idleTunnels = [];
    this.enableTunnels = [];
    this.tunnels = [];

    this.availableHeight = this.height - this.padding[0] - this.padding[2];
    this.tunnelHeight = this.fontSize * this.lineHeight;
    this.tunnelNum = Math.floor(this.availableHeight / this.tunnelHeight);
    for (var i = 0; i < this.tunnelNum; i++) {
      this.idleTunnels.push(i); // Idle tunnel id collection
      this.enableTunnels.push(i); // Available tunnel id collection
      this.tunnels.push(new Tunnel(this, { // Tunnel collection
        width: this.width,
        height: this.tunnelHeight,
        safeArea: this.safeArea,
        maxNum: this.tunnelMaxNum,
        tunnelId: i
      }));
    }
    // Filter tunnels within the specified range
    this.setRange();
    this._isActive = false;
  };

  Barrage.prototype.transfromDuration2Canvas = function transfromDuration2Canvas(duration) {
    // 2000 is the distance moved in the dom
    return duration * this.width / 2000;
  };

  // Set display range range: [0,1]


  Barrage.prototype.setRange = function setRange(range) {
    var _this4 = this;

    if (!this._ready) {
      this._delay('setRange', range);
      return;
    }

    range = range || this.range;
    var top = range[0] * this.tunnelNum;
    var bottom = range[1] * this.tunnelNum;

    // Release tunnels that meet the requirements
    // Find currently idle tunnels
    var idleTunnels = [];
    var enableTunnels = [];
    this.tunnels.forEach(function (tunnel, tunnelId) {
      if (tunnelId >= top && tunnelId < bottom) {
        tunnel.enable();
        enableTunnels.push(tunnelId);
        if (_this4.idleTunnels.indexOf(tunnelId) >= 0) {
          idleTunnels.push(tunnelId);
        }
      } else {
        tunnel.disable();
      }
    });
    this.idleTunnels = idleTunnels;
    this.enableTunnels = enableTunnels;
    this.range = range;
  };

  Barrage.prototype.setFont = function setFont(font) {
    if (!this._ready) {
      this._delay('setFont', font);
      return;
    }

    this.font = font;
    this.fontSize = (0, _utils.getFontSize)(this.font);
    this.ctx.font = font;
  };

  Barrage.prototype.setAlpha = function setAlpha(alpha) {
    if (!this._ready) {
      this._delay('setAlpha', alpha);
      return;
    }

    this.alpha = alpha;
    this.ctx.globalAlpha = alpha;
  };

  Barrage.prototype.setDuration = function setDuration(duration) {
    if (!this._ready) {
      this._delay('setDuration', duration);
      return;
    }

    this.clear();
    this.duration = duration;
    this.innerDuration = this.transfromDuration2Canvas(duration);
  };

  // Enable barrages


  Barrage.prototype.open = function open() {
    if (!this._ready) {
      this._delay('open');
      return;
    }

    if (this._isActive) return;
    this._isActive = true;
    this.play();
  };

  // Disable barrages, clear all data


  Barrage.prototype.close = function close() {
    if (!this._ready) {
      this._delay('close');
      return;
    }

    if (!this._isActive) return;
    this._isActive = false;
    this.pause();
    this.clear();
  };

  // Start barrage scrolling


  Barrage.prototype.play = function play() {
    var _this5 = this;

    this._rAFId = this.canvas.requestAnimationFrame(function () {
      _this5.animate();
      _this5.play();
    });
  };

  // Stop barrage scrolling


  Barrage.prototype.pause = function pause() {
    if (typeof this._rAFId === 'number') {
      this.canvas.cancelAnimationFrame(this._rAFId);
    }
  };

  // Clear screen and buffer data


  Barrage.prototype.clear = function clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.tunnels.forEach(function (tunnel) {
      return tunnel.clear();
    });
  };

  // Add a batch of barrages, will be discarded when the track is full


  Barrage.prototype.addData = function addData() {
    var _this6 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!this._ready) {
      this._delay('addData', data);
      return;
    }

    if (!this._isActive) return;
    data.forEach(function (item) {
      return _this6.addBullet2Tunnel(item);
    });
  };

  // Send a barrage
  // To ensure successful sending, select an available tunnel and replace the head of the waiting queue


  Barrage.prototype.send = function send() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this._ready) {
      this._delay('send', opt);
      return;
    }

    var tunnel = this.getEnableTunnel();
    if (tunnel === null) return;

    opt.tunnelId = tunnel.tunnelId;
    var bullet = this.registerBullet(opt);
    tunnel.nextQueue[0] = bullet;
  };

  // Add to track {content, color}


  Barrage.prototype.addBullet2Tunnel = function addBullet2Tunnel() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var tunnel = this.getIdleTunnel();
    if (tunnel === null) return;

    opt.tunnelId = tunnel.tunnelId;
    var bullet = this.registerBullet(opt);
    tunnel.addBullet(bullet);
  };

  Barrage.prototype.registerBullet = function registerBullet() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    opt.tunnelId = opt.tunnelId || 0;
    opt.content = (0, _utils.substring)(opt.content, this.maxLength);
    var textWidth = this.getTextWidth(opt.content);
    var distance = this.mode === 'overlap' ? this.width + textWidth : this.width;
    opt.textWidth = textWidth;
    opt.speed = distance / (this.innerDuration * this.fps);
    opt.fontSize = this.fontSize;
    opt.x = this.width;
    opt.y = this.tunnelHeight * (opt.tunnelId + 0.5) + this.padding[0];
    return new Bullet(this, opt);
  };

  // Operations performed per frame


  Barrage.prototype.animate = function animate() {
    // Redraw after clearing the screen
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.tunnelShow) {
      this.drawTunnel();
    }
    this.tunnels.forEach(function (tunnel) {
      return tunnel.animate();
    });
  };

  Barrage.prototype.showTunnel = function showTunnel() {
    this.tunnelShow = true;
  };

  Barrage.prototype.hideTunnel = function hideTunnel() {
    this.tunnelShow = false;
  };

  Barrage.prototype.removeIdleTunnel = function removeIdleTunnel(tunnelId) {
    var idx = this.idleTunnels.indexOf(tunnelId);
    if (idx >= 0) this.idleTunnels.splice(idx, 1);
  };

  Barrage.prototype.addIdleTunnel = function addIdleTunnel(tunnelId) {
    var idx = this.idleTunnels.indexOf(tunnelId);
    if (idx < 0) this.idleTunnels.push(tunnelId);
  };

  // Randomly pick one from available tunnels


  Barrage.prototype.getEnableTunnel = function getEnableTunnel() {
    if (this.enableTunnels.length === 0) return null;
    var index = (0, _utils.getRandom)(this.enableTunnels.length);
    return this.tunnels[this.enableTunnels[index]];
  };

  // Randomly pick one from tunnels with remaining capacity


  Barrage.prototype.getIdleTunnel = function getIdleTunnel() {
    if (this.idleTunnels.length === 0) return null;
    var index = (0, _utils.getRandom)(this.idleTunnels.length);
    return this.tunnels[this.idleTunnels[index]];
  };

  Barrage.prototype.getTextWidth = function getTextWidth(content) {
    this.ctx.font = this.font;
    return Math.ceil(this.ctx.measureText(content).width);
  };

  Barrage.prototype.drawTunnel = function drawTunnel() {
    var ctx = this.ctx;
    var tunnelColor = '#CCB24D';
    for (var i = 0; i <= this.tunnelNum; i++) {
      var y = this.padding[0] + i * this.tunnelHeight;
      ctx.beginPath();
      ctx.strokeStyle = tunnelColor;
      ctx.setLineDash([5, 10]);
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
      if (i < this.tunnelNum) {
        ctx.fillStyle = tunnelColor;
        ctx.fillText('\u5F39\u9053' + (i + 1), 10, this.tunnelHeight / 2 + y);
      }
    }
  };

  return Barrage;
}();

exports.default = Barrage;

/***/ })
/******/ ]);