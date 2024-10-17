// pages/jserror/index.js
Page({
  SyntaxErrorFunc: function () {
    wx.showModal({
      title: 'SyntaxError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    });
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
    wx.showModal({
      title: 'ReferenceError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    })
    console.log(abc);
  },
  RangeErrorFunc: function () {
    wx.showModal({
      title: 'RangeError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    })
    var testArr = new Array(-1)
    console.log(testArr[-1])
  },
  TypeErrorFunc: function () {
    wx.showModal({
      title: 'TypeError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    })
    typeFunc();
  },
  URIErrorFunc: function () {
    wx.showModal({
      title: 'URIError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    })
    decodeURI('%%');
  },
  EvalErrorFunc: function () {
    wx.showModal({
      title: 'EvalError',
      confirmText: 'confirm',
      cancelText: 'cancel',
    });
    throw new EvalError('this is a hard code evalError');
  },
  UnhandleRejection: function () {
    wx.showModal({
      title: 'UnhandleRejection',
      confirmText: 'confirm',
      cancelText: 'cancel',
    })
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