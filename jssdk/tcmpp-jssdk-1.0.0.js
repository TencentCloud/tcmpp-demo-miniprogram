/* eslint-disable */
!(function (e, n) {
    'function' === typeof define && (define.amd || define.cmd) ? define(() => n(e)) : n(e, !0);
}(this, (e, n) => {
    function i(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), (e) => {
            c(n, e, t);
        }) : u(n, t);
    }
    function t(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.on(n, (e) => {
            t?.trigger?.(e), c(n, e, i);
        }) : t ? u(n, t) : u(n, i);
    }
    function g(n, i) {
        e.WeixinJSBridge ? WeixinJSBridge.on(n, (e) => {
            'function' === typeof i && i(e);
        }) : u(n, i);
    }
    function o(e) {
        return e = e || {}, e;
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
    function p() {
        return (new Date).getTime();
    }
    function f(n) {
        T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener('WeixinJSBridgeReady', n, !1) && S.addEventListener('QQJSBridgeReady', n, !1));
    }
    function m(e) {
        if ('string' === typeof e && e.length > 0) {
            let n = e.split('?')[0];
            const i = e.split('?')[1];
            return n += '.html', void 0 !== i ? `${n}?${i}` : n;
        }
    }
    if (!e.jWeixin) {
        var h = {};
        var v = (function () {
            const e = {};
            for (const n in h) {
                e[h[n]] = n;
            };
            return e;
        }());
        var S = e.document;
        const y = navigator.userAgent.toLowerCase();
        var T = true;
        const M = -1 != y.indexOf('android');
        const P = -1 != y.indexOf('iphone') || -1 != y.indexOf('ipad');
        var A = {
            initStartTime: p(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0,
        };
        var C = {};
        f(() => {
            A.initEndTime = p();
            try {
                g("webviewEvent", function (n) {
                    J.forEach(function (e) {
                        e(n.data)
                    })
                })
            } catch (e) {
                console.log('webviewEvent===err', e)
            }
        });
        let E = !1;
        const O = [];
        let J = [];
        var N = {
            checkJsApi(e) {
                const n = function (e) {
                    const n = e.checkResult;
                    for (const i in n) {
                        const t = v[i]; t && (n[t] = n[i], delete n[i]);
                    } return e;
                };
                i('checkJsApi', { jsApiList: d(e.jsApiList) }, (e._complete = function (e) {
                    e = n(e);
                }, e));
            },
            chooseImage(e) {
                i(
                    'chooseImage', {
                        count: e.count || 9,
                        sizeType: e.sizeType || ['original', 'compressed'],
                        sourceType: e.sourceType || ['album', 'camera'],
                    },
                    (e._complete = function (e) {
                        e.tempFileSizes
                            ? (e.tempFiles = (e.tempFilePaths || [])
                                .filter(module => module)
                                .map((module, index) => ({
                                    path: module,
                                    size: e.tempFileSizes[index],
                                })))
                            : (e.tempFiles = (e.tempFiles || []).filter(module => module.path && typeof module.size === 'number'));
                        delete e.tempFileSizes;
                    }, e)
                );
            },
            previewImage(e) {
                i('previewImage', { current: e.current, urls: e.urls }, e);
            },
            getLocalImgData(e) {
                !1 === E ? (E = !0, i('getLocalImgData', { file: e.file, filePath: e.filePath }, (e._complete = function (e) {
                    if (E = !1, O.length > 0) {
                        const n = O.shift(); wx.getLocalImgData(n);
                    }
                }, e))) : O.push(e);
            },
            startRecord(e) {
                i('startRecord', {}, e);
            },
            stopRecord(e) {
                i('stopRecord', {}, e);
            },
            playVoice(e) {
                i('playVoice', { filePath: e.filePath, duration: e.duration }, e);
            },
            pauseVoice(e) {
                i('pauseVoice', {}, e);
            },
            stopVoice(e) {
                i('stopVoice', {}, e);
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
                e = e || {}, i('getLocation', { type: e.type || 'wgs84' }, (e._complete = function (e) {
                    delete e.type;
                }, e));
            },
            chooseLocation(e) {
                i('chooseLocation', {
                    latitude: e.latitude,
                    longitude: e.longitude
                }, e);
            },
            scanCode(e) {
                i('scanCode', {
                    onlyFromCamera: e.onlyFromCamera,
                    scanType: e.scanType
                }, e);
            },
            openDocument(e) {
                i('openDocument', {
                    filePath: e.filePath,
                    fileType: e.fileType
                }, e);
            },
            getStorage(e) {
                i('getStorage', {
                    key: e.key
                }, e);
            },
            setStorage(e) {
                i('setStorage', {
                    key: e.key,
                    data: e.data
                }, e);
            },
            removeStorage(e) {
                i('removeStorage', {
                    key: e.key
                }, e);
            },
            clearStorage(e) {
                i('clearStorage', {}, e);
            },
            getStorageInfo(e) {
                i('getStorageInfo', {}, e);
            },
            canGoBack(e) {
                i('canGoBack', {}, e);
            },
            setNavigationBarTitle(e) {
                i('setNavigationBarTitle', {
                    title: e.title
                }, e);
            },
            exitMiniProgram(e) {
                i('exitMiniProgram', {}, e);
            },
            navigateToMiniProgram(e) {
                i('navigateToMiniProgram', {
                    appId: e.appId,
                    path: e.path,
                    extraData: e.extraData,
                    envVersion: e.envVersion
                }, e);
            },
            navigateBackMiniProgram(e) {
                i('navigateBackMiniProgram', {
                    extraData: e.extraData
                }, e);
            },
            invokeNativePlugin(e= {}) {
                i('invokeNativePlugin', {
                    api_name: e.api_name,
                    data: e.data,
                    sync: e.sync
                }, e);
            },
            miniProgram: {
                navigateTo(e) {
                    f(() => {
                        i('invokeMiniProgramAPI', { name: 'navigateTo', arg: { url: e.url } }, e);
                    });
                },
                navigateBack(e) {
                    e = e || {}, f(() => {
                        i('invokeMiniProgramAPI', { name: 'navigateBack', arg: { delta: e.delta || 1 } }, e);
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
                redirectTo(e) {
                    f(() => {
                        i('invokeMiniProgramAPI', {
                            name: 'redirectTo', arg: {
                                url: e.url,
                            },
                        }, e);
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
                onWebviewEvent(e) {
                    f(() => {
                        "function" === typeof e && !J.includes(e) && J.push(e)
                    })
                },
                offWebviewEvent(e) {
                    f(() => {
                        "function" === typeof e && (J = J.filter(function (f) {
                            return f !== e
                        }))
                    })
                },
                sendWebviewEvent(e) {
                    f(() => {
                        i('invokeMiniProgramAPI', { name: 'sendWebviewEvent', arg: e }, e);
                    })
                }
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
                    R[o] = !0;
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