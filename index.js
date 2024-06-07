/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable func-style */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
/* eslint-disable camelcase */
!(function (e, n) {
  'function' === typeof define && (define.amd || define.cmd) ? define(() => n(e)) : n(e, !0);
}(this, (e, n) => {
  function i(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), (e) => {
      c(n, e, t);
    }) : u(n, t);
  } function t(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.on(n, (e) => {
            t?.trigger?.(e), c(n, e, i);
    }) : t ? u(n, t) : u(n, i);
  }
  function o(e) {
    return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = 'sha1', e.verifyTimestamp = `${C.timestamp}`, e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e;
  }
  function r(e) {
    return {
      timeStamp: `${e.timestamp}`,
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || 'SHA1',
    };
  }
  function a(e) {
    return e.postalCode = e.addressPostalCode,
    delete e.addressPostalCode,
    e.provinceName = e.proviceFirstStageName,
    delete e.proviceFirstStageName,
    e.cityName = e.addressCitySecondStageName,
    delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName,
    delete e.addressCountiesThirdStageName,
    e.detailInfo = e.addressDetailInfo,
    delete e.addressDetailInfo, e;
  }
  function c(e, n, i) {
    'openEnterpriseChat' == e && (n.errCode = n.err_code),
    delete n.err_code,
    delete n.err_desc,
    delete n.err_detail;
    let t = n.errMsg;
    t || (t = n.err_msg,
    delete n.err_msg,
    t = s(e, t),
    n.errMsg = t),
    (i = i || {})._complete && (i._complete(n), delete i._complete),
    t = n.errMsg || '',
    C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    const o = t.indexOf(':');
    switch (t.substring(o + 1)) {
    case 'ok': i.success && i.success(n);
      break;
    case 'cancel': i.cancel && i.cancel(n);
      break;
    default: i.fail && i.fail(n);
    }
    i.complete && i.complete(n);
  }
  function s(e, n) {
    let i = e;
    const t = v[i];
    t && (i = t);
    let o = 'ok';
    if (n) {
      const r = n.indexOf(':');
      'confirm' == (o = n.substring(r + 1)) && (o = 'ok'),
      'failed' == o && (o = 'fail'), -1 != o.indexOf('failed_') && (o = o.substring(7)),
      -1 != o.indexOf('fail_') && (o = o.substring(5)),
      'access denied' != (o = (o = o.replace(/_/g, ' ')).toLowerCase()) && 'no permission to execute' != o || (o = 'permission denied'), 'config' == i && 'function not exist' == o && (o = 'ok'), '' == o && (o = 'fail');
    } return n = `${i}:${o}`;
  }

  function d(e) {
    if (e) {
      for (let n = 0, i = e.length; n < i; ++n) {
        const t = e[n];
        const o = h[t];
        o && (e[n] = o);
      } return e;
    }
  }

  function u(e, n) {
    if (!(!C.debug || n?.isInnerInvoke)) {
      const i = v[e];
      i && (e = i),
       n?._complete && delete n._complete,
      console.log(`"${e}",`, n || '');
    }
  }

  function l(e) {
    if (!(k || w || C.debug || x < '6.0.2' || V.systemType < 0)) {
      const n = new Image;
      V.appId = C.appId,
      V.initTime = A.initEndTime - A.initStartTime,
      V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime,
      N.getNetworkType({
        isInnerInvoke: !0, success(e) {
          V.networkType = e.networkType;
          const i = `https://open.weixin.qq.com/sdk/report?v=${V.version}&o=${V.isPreVerifyOk}&s=${V.systemType}&c=${V.clientVersion}&a=${V.appId}&n=${V.networkType}&i=${V.initTime}&p=${V.preVerifyTime}&u=${V.url}`;
          n.src = i;
        },
      });
    }
  }
  function p() {
    return (new Date).getTime();
  }
  function f(n) {
    T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener('WeixinJSBridgeReady', n, !1) && S.addEventListener('QQJSBridgeReady', n, !1));
  }
  function g() {
    N.invoke || (N.invoke = function (n, i, t) {
      e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t);
    },
    N.on = function (n, i) {
      e.WeixinJSBridge && WeixinJSBridge.on(n, i);
    });
  }
  function m(e) {
    if ('string' === typeof e && e.length > 0) {
      let n = e.split('?')[0];
      const i = e.split('?')[1];
      return n += '.html', void 0 !== i ? `${n}?${i}` : n;
    }
  }
  if (!e.jWeixin) {
    var h = {
      config: 'preVerifyJSAPI',
      onMenuShareTimeline: 'menu:share:timeline',
      onMenuShareAppMessage: 'menu:share:appmessage',
      onMenuShareQQ: 'menu:share:qq',
      onMenuShareWeibo: 'menu:share:weiboApp',
      onMenuShareQZone: 'menu:share:QZone',
      previewImage: 'imagePreview',
      getLocation: 'geoLocation',
      openProductSpecificView: 'openProductViewWithPid',
      addCard: 'batchAddCard',
      openCard: 'batchViewCard',
      chooseWXPay: 'getBrandWCPayRequest',
      openEnterpriseRedPacket: 'getRecevieBizHongBaoRequest',
      startSearchBeacons: 'startMonitoringBeacons',
      stopSearchBeacons: 'stopMonitoringBeacons',
      onSearchBeacons: 'onBeaconsInRange',
      consumeAndShareCard: 'consumedShareCard',
      openAddress: 'editAddress',
    };
    var v = (function () {
      const e = {};
      for (const n in h) {
        e[h[n]] = n;
      };
      return e;
    }());
    var S = e.document;
    const I = S.title;
    const y = navigator.userAgent.toLowerCase();
    const _ = navigator.platform.toLowerCase();
    var k = !(!_.match('mac') && !_.match('win'));
    var w = -1 != y.indexOf('wxdebugger');
    var T = true;
    const M = -1 != y.indexOf('android');
    const P = -1 != y.indexOf('iphone') || -1 != y.indexOf('ipad');
    var x = (function () {
      const e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
      return e ? e[1] : '';
    }());
    var A = {
      initStartTime: p(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0,
    };
    var V = {
      version: 1,
      appId: '',
      initTime: 0,
      preVerifyTime: 0,
      networkType: '',
      isPreVerifyOk: 1,
      systemType: P ? 1 : M ? 2 : -1,
      clientVersion: x,
      url: encodeURIComponent(location.href),
    };
    var C = {};
    const B = { _completes: [] };
    const L = { state: 0, data: {} };
    f(() => {
      A.initEndTime = p();
    });
    let E = !1;
    const O = [];
    var N = {
      config(e) {
        C = e, u('config', e); const n = !1 !== C.check;
        f(() => {
          if (n) i(h.config, { verifyJsApiList: d(C.jsApiList) }, (function () {
            B._complete = function (e) {
              A.preVerifyEndTime = p(), L.state = 1, L.data = e;
            },
            B.success = function (e) {
              V.isPreVerifyOk = 0;
            },
            B.fail = function (e) {
              B._fail ? B._fail(e) : L.state = -1;
            };
            const e = B._completes;
            return e.push(() => {
              l();
            }),
            B.complete = function (n) {
              for (let i = 0, t = e.length; i < t; ++i)e[i](); B._completes = [];
            }, B;
          }())), A.preVerifyStartTime = p();
          else {
            L.state = 1;
            for (let e = B._completes, t = 0, o = e.length; t < o; ++t)e[t](); B._completes = [];
          }
        }), g();
      },
      ready(e) {
        0 != L.state ? e() : (B._completes.push(e), !T && C.debug && e());
      },
      error(e) {
        x < '6.0.2' || (-1 == L.state ? e(L.data) : B._fail = e);
      },
      checkJsApi(e) {
        const n = function (e) {
          const n = e.checkResult;
          for (const i in n) {
            const t = v[i]; t && (n[t] = n[i], delete n[i]);
          } return e;
        };
        i('checkJsApi', { jsApiList: d(e.jsApiList) }, (e._complete = function (e) {
          if (M) {
            const i = e.checkResult; i && (e.checkResult = JSON.parse(i));
          } e = n(e);
        }, e));
      },
      onMenuShareTimeline(e) {
        t(h.onMenuShareTimeline, {
          complete() {
            i('shareTimeline', {
              title: e.title || I,
              desc: e.title || I,
              img_url: e.imgUrl || '',
              link: e.link || location.href,
              type: e.type || 'link',
              data_url: e.dataUrl || '',
            }, e);
          },
        }, e);
      },
      onMenuShareAppMessage(e) {
        t(h.onMenuShareAppMessage, {
          complete(n) {
            'favorite' === n.scene ? i('sendAppMessage', {
              title: e.title || I,
              desc: e.desc || '',
              link: e.link || location.href,
              img_url: e.imgUrl || '',
              type: e.type || 'link',
              data_url: e.dataUrl || '',
            }) : i('sendAppMessage', {
              title: e.title || I,
              desc: e.desc || '',
              link: e.link || location.href,
              img_url: e.imgUrl || '',
              type: e.type || 'link',
              data_url: e.dataUrl || '',
            }, e);
          },
        }, e);
      },
      onMenuShareQQ(e) {
        t(h.onMenuShareQQ, {
          complete() {
            i('shareQQ', {
              title: e.title || I,
              desc: e.desc || '',
              img_url: e.imgUrl || '',
              link: e.link || location.href,
            }, e);
          },
        }, e);
      },
      onMenuShareWeibo(e) {
        t(h.onMenuShareWeibo, {
          complete() {
            i('shareWeiboApp', {
              title: e.title || I,
              desc: e.desc || '',
              img_url: e.imgUrl || '',
              link: e.link || location.href,
            }, e);
          },
        }, e);
      },
      onMenuShareQZone(e) {
        t(h.onMenuShareQZone, {
          complete() {
            i('shareQZone', {
              title: e.title || I,
              desc: e.desc || '',
              img_url: e.imgUrl || '',
              link: e.link || location.href,
            }, e);
          },
        }, e);
      },
      updateTimelineShareData(e) {
        i('updateTimelineShareData', {
          title: e.title,
          link: e.link,
          imgUrl: e.imgUrl,
        }, e);
      },
      updateAppMessageShareData(e) {
        i('updateAppMessageShareData', {
          title: e.title,
          desc: e.desc,
          link: e.link,
          imgUrl: e.imgUrl,
        }, e);
      }, startRecord(e) {
        i('startRecord', {}, e);
      }, stopRecord(e) {
        i('stopRecord', {}, e);
      },
      onVoiceRecordEnd(e) {
        t('onVoiceRecordEnd', e);
      }, playVoice(e) {
        i('playVoice', { localId: e.localId }, e);
      },
      pauseVoice(e) {
        i('pauseVoice', { localId: e.localId }, e);
      }, stopVoice(e) {
        i('stopVoice', { localId: e.localId }, e);
      },
      onVoicePlayEnd(e) {
        t('onVoicePlayEnd', e);
      }, uploadVoice(e) {
        i('uploadVoice', {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
        }, e);
      },
      downloadVoice(e) {
        i('downloadVoice', {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
        }, e);
      }, translateVoice(e) {
        i('translateVoice', {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
        }, e);
      },
      chooseImage(e) {
        i(
          'chooseImage', {
            scene: '1|2',
            count: e.count || 9,
            sizeType: e.sizeType || ['original', 'compressed'],
            sourceType: e.sourceType || ['album', 'camera'] },
          (e._complete = function (e) {
            if (M) {
              const n = e.localIds; try {
                n && (e.localIds = JSON.parse(n));
              } catch (e) { }
            }
          }, e)
        );
      },
      getLocation(e) { },
      previewImage(e) {
        i(h.previewImage, { current: e.current, urls: e.urls }, e);
      },
      uploadImage(e) {
        i('uploadImage', {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
        }, e);
      },
      downloadImage(e) {
        i('downloadImage', {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
        }, e);
      },
      getLocalImgData(e) {
        !1 === E ? (E = !0, i('getLocalImgData', { localId: e.localId }, (e._complete = function (e) {
          if (E = !1, O.length > 0) {
            const n = O.shift(); wx.getLocalImgData(n);
          }
        }, e))) : O.push(e);
      },
      getNetworkType(e) {
        const n = function (e) {
          const n = e.errMsg;
          e.errMsg = 'getNetworkType:ok';
          const i = e.subtype;
          if (e.networkType) return e;
          const t = n.indexOf(':');
          const o = n.substring(t + 1);
          switch (o) {
          case 'wifi':
          case 'edge':
          case 'wwan':
            e.networkType = o;
            break;
          default:
            e.errMsg = 'getNetworkType:fail';
          }
          return e;
        };
        i('getNetworkType', {}, (e._complete = function (e) {
          e = n(e);
        }, e));
      },
      openLocation(e) {
        i('openLocation', {
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || '',
          address: e.address || '',
          scale: e.scale || 28,
          infoUrl: e.infoUrl || '',
        }, e);
      },
      getLocation(e) {
        e = e || {}, i(h.getLocation, { type: e.type || 'wgs84' }, (e._complete = function (e) {
          delete e.type;
        }, e));
      },
      hideOptionMenu(e) {
        i('hideOptionMenu', {}, e);
      },
      showOptionMenu(e) {
        i('showOptionMenu', {}, e);
      },
      closeWindow(e) {
        i('closeWindow', {}, e = e || {});
      },
      hideMenuItems(e) {
        i('hideMenuItems', { menuList: e.menuList }, e);
      },
      showMenuItems(e) {
        i('showMenuItems', { menuList: e.menuList }, e);
      },
      hideAllNonBaseMenuItem(e) {
        i('hideAllNonBaseMenuItem', {}, e);
      },
      showAllNonBaseMenuItem(e) {
        i('showAllNonBaseMenuItem', {}, e);
      },
      scanQRCode(e) {
        i(
          'scanQRCode', {
            needResult: (e = e || {}).needResult || 0,
            scanType: e.scanType || ['qrCode', 'barCode'] },
          (e._complete = function (e) {
            if (P) {
              const n = e.resultStr; if (n) {
                const i = JSON.parse(n); e.resultStr = i?.scan_code?.scan_result;
              }
            }
          }, e)
        );
      },
      openAddress(e) {
        i(h.openAddress, {}, (e._complete = function (e) {
          e = a(e);
        }, e));
      },
      openProductSpecificView(e) {
        i(h.openProductSpecificView, {
          pid: e.productId,
          view_type: e.viewType || 0,
          ext_info: e.extInfo,
        }, e);
      },
      addCard(e) {
        for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
          const a = n[o];
          const c = { card_id: a.cardId, card_ext: a.cardExt };
          t.push(c);
        }
        i(h.addCard, { card_list: t }, (e._complete = function (e) {
          let n = e.card_list; if (n) {
            for (let i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
              const o = n[i];
              o.cardId = o.card_id,
              o.cardExt = o.card_ext,
              o.isSuccess = !!o.is_succ,
              delete o.card_id,
              delete o.card_ext,
              delete o.is_succ;
            }
            e.cardList = n, delete e.card_list;
          }
        }, e));
      },
      chooseCard(e) {
        i('chooseCard', {
          app_id: C.appId,
          location_id: e.shopId || '',
          sign_type: e.signType || 'SHA1',
          card_id: e.cardId || '',
          card_type: e.cardType || '',
          card_sign: e.cardSign,
          time_stamp: `${e.timestamp}`,
          nonce_str: e.nonceStr,
        }, (e._complete = function (e) {
          e.cardList = e.choose_card_info,
          delete e.choose_card_info;
        }, e));
      },
      openCard(e) {
        for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
          const a = n[o];
          const c = {
            card_id: a.cardId,
            code: a.code,
          };
          t.push(c);
        }
        i(h.openCard, { card_list: t }, e);
      },
      consumeAndShareCard(e) {
        i(h.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);
      },
      chooseWXPay(e) {
        i(h.chooseWXPay, r(e), e);
      },
      openEnterpriseRedPacket(e) {
        i(h.openEnterpriseRedPacket, r(e), e);
      },
      startSearchBeacons(e) {
        i(h.startSearchBeacons, { ticket: e.ticket }, e);
      },
      stopSearchBeacons(e) {
        i(h.stopSearchBeacons, {}, e);
      },
      onSearchBeacons(e) {
        t(h.onSearchBeacons, e);
      },
      openEnterpriseChat(e) {
        i('openEnterpriseChat', { useridlist: e.userIds, chatname: e.groupName }, e);
      },
      launchMiniProgram(e) {
        i('launchMiniProgram', { targetAppId: e.targetAppId, path: m(e.path), envVersion: e.envVersion }, e);
      }, miniProgram: {
        navigateBack(e) {
          e = e || {}, f(() => {
            i('invokeMiniProgramAPI', { name: 'navigateBack', arg: { delta: e.delta || 1 } }, e);
          });
        },
        navigateTo(e) {
          f(() => {
            i('invokeMiniProgramAPI', { name: 'navigateTo', arg: { url: e.url } }, e);
          });
        },
        redirectTo(e) {
          f(() => {
            i('invokeMiniProgramAPI', {
              name: 'redirectTo', arg: {
                url: e.url,
              },
            }, e);
          });
        },
        switchTab(e) {
          f(() => {
            i('invokeMiniProgramAPI', { name: 'switchTab', arg: { url: e.url } }, e);
          });
        },
        reLaunch(e) {
          f(() => {
            i('invokeMiniProgramAPI', { name: 'reLaunch', arg: { url: e.url } }, e);
          });
        },
        postMessage(e) {
          f(() => {
            i('invokeMiniProgramAPI', { name: 'postMessage', arg: e.data || {} }, e);
          });
        },
        getEnv(n) {
          f(() => {
            n({ miniprogram: 'miniprogram' === e.__wxjs_environment });
          });
        },
        navigateBackMiniProgram(e) {
          e = e || {}, f(() => {
            i('invokeMiniProgramAPI', { name: 'navigateBackMiniProgram', arg: { extraData: e.extraData || {} } }, e);
          });
        },
      },
    };
    let b = 1;
    const R = {};
    return S.addEventListener('error', (e) => {
      if (!M) {
        const n = e.target;
        const i = n.tagName;
        const t = n.src;
        if (('IMG' == i || 'VIDEO' == i || 'AUDIO' == i || 'SOURCE' == i) && -1 != t.indexOf('wxlocalresource://')) {
          e.preventDefault(), e.stopPropagation();
          let o = n['wx-id'];
          if (o || (o = b++, n['wx-id'] = o), R[o]) return;
          R[o] = !0,
          wx.ready(() => {
            wx.getLocalImgData({
              localId: t, success(e) {
                n.src = e.localData;
              },
            });
          });
        }
      }
    }, !0), S.addEventListener('load', (e) => {
      if (!M) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const n = e.target;
        const i = n.tagName;
        n.src;
        if ('IMG' == i || 'VIDEO' == i || 'AUDIO' == i || 'SOURCE' == i) {
          const t = n['wx-id']; t && (R[t] = !1);
        }
      }
    }, !0), n && (e.qq = e.wx = e.jWeixin = N), N;
  }
}));
