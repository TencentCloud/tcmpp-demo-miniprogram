// pages/jserror/index.js
Page({
  SyntaxErrorFunc: function () {
    wx.request({
      url: 'https://fian628.pixnet.net'
    })
    wx.request({
      url: 'https://www.m-toy.com.tw/products/eg001'
    })
    wx.request({
      url: 'https://baisrobot.timelog.to/a177612579'
    })
    wx.request({
      url: 'https://ha-blog.tw/tag/%E7%B7%A8%E5%8A%87/'
    })
    wx.request({
      url: 'https://www.nasa.gov/'
    })
    throw new SyntaxError('this is a hard-code Error');
  },
  ReferenceErrorFunc: function () {
    console.log(abc);
  },
  RangeErrorFunc: function () {
    var testArr = new Array(-1)
    console.log(testArr[-1])
  },
  TypeErrorFunc: function () {
    typeFunc();
  },
  URIErrorFunc: function () {
    decodeURI('%%');
  },
  EvalErrorFunc: function () {
    throw new EvalError('this is a hard code evalError')
  },
  UnhandleRejection: function () {
    new Promise(function (resolve, reject) {
      console.log('start new Promise...');
      var timeOut = Math.random() * 2;
      console.log('set timeout to: ' + timeOut + ' seconds.');
      setTimeout(function () {
        // reject('reject')
        try {
          var a = [];
          a.length = -1
        } catch (e) {
          reject(e);
        }
      }, timeOut * 1000);
    }).then(function (r) {
      console.log('Done: ' + r);
    })
  },
  GoBack:function() {
    console.log('navigation back manually')
    wx.navigateBack({
      delta: 1
    })
  }
})