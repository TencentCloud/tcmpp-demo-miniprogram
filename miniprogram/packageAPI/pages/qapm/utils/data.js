var appconfigData = [{
  name: 'Intranet public',
  qapm_base_url: 'https://ten.sngapm.qq.com',
  appconfig_base_url: 'https://ten.sngapm.qq.com',
  // app_key: "b1fa4a05-354",
  // app_key:"31cf1620-538",
  app_key: '7567a05b-2701',
  // app_key:"f288d610-563",
  // "app_key":"9bbe6a15-1248",
  version: '1.1.0',
  user_id: 'smithdeng123',
  debug: false
},
{
  name: 'pub1',
  qapm_base_url: 'https://pub1.sngapm.qq.com',
  appconfig_base_url: 'https://pub1.sngapm.qq.com',
  app_key: '7c32ed06-2184',
  version: '1.1.0',
  user_id: 'smithdeng123',
  debug: true
},
{
  name: 'Extranet',
  qapm_base_url: 'https://qapm.qq.com',
  appconfig_base_url: 'https://qapm.qq.com',
  app_key: '4b98e017-9001',
  version: '1.2.0',
  user_id: 'smithdeng123'
},
{
  name: 'beta',
  qapm_base_url: 'https://beta.sngapm.qq.com',
  appconfig_base_url: 'https://beta.sngapm.qq.com',
  app_key: 'baa9efe6-170',
  version: '1.2.0',
  user_id: 'smithdeng123'
},
{
  name: 'tmf1.8',
  qapm_base_url: 'http://qapm.tmf.tcs.cn:30026',
  appconfig_base_url: 'http://qapm.tmf.tcs.cn:30026',
  app_key: 'd2c3ae10-9360',
  version: 'tmf1.8',
  user_id: 'smithdeng123'
},
{
  name: 'tmf1.8_testproduct4',
  qapm_base_url: 'http://qapm.tmf.tcs.cn:30026',
  appconfig_base_url: 'http://qapm.tmf.tcs.cn:30026',
  app_key: '3a50c9fa-16602',
  version: 'tmf1.8',
  user_id: 'smithdeng123'
},
{
  name: 'Saudi Arabia',
  qapm_base_url: 'http://qapm.tmf.test.neuxnet.com:30026',
  appconfig_base_url: 'http://qapm.tmf.test.neuxnet.com:30026',
  app_key: '3f583bd6-448',
  version: 'tmf1.8',
  user_id: 'smith'
}]

var jsonData = {
  'meta': {
    'app': {
      'brand': 'devtools',
      'channel_open': '1001',
      'channel_install': 'weixin',
      'net_type': 'wifi',
      'track_init_flag': '0'
    }
  },
  'events': [{
    'id': '0521fa6e-4bb3-4a4a-81db-6862ac3ce7d7',
    'time': '2021-01-14T16:50:38.716Z',
    'topic': 4,
    'extra': '',
    'tags': {},
    'values': {},
    'pre_page_id': 'pages/index/index',
    'pre_page': 'pages/index/index',
    'page_id': 'pages/pageTime/index',
    'page': 'pages/pageTime/index',
    'pre_page_start': '2021-01-14T16:46:35.415Z',
    'pre_page_end': '2021-01-14T16:50:38.716Z',
    'page_start': '2021-01-14T16:50:38.716Z'
  }, {
    'id': 'aacce78a-8c86-4a32-8235-32f7e36038fb',
    'time': '2021-01-14T16:50:38.735Z',
    'topic': 7,
    'tags': {
      'init_time': '1610643038714',
      'ready_time': '1610643038734'
    },
    'values': {
      'load_cost': 20
    },
    'category': '_WEB.PERF_PAGE_LOAD',
    'state': 'pages/pageTime/index',
    'action': '',
    'label': '',
    'value': 1,
    'page': 'pages/pageTime/index'
  }, {
    'id': '8ae05561-4923-4531-9990-b642981d9199',
    'time': '2021-01-14T16:50:39.032Z',
    'topic': 7,
    'tags': {
      'start_time': '1610643038703',
      'end_time': '1610643039031',
      'http_method': 'POST',
      'bread_crumb_id': ''
    },
    'values': {
      'cost': 328,
      'duration': 328,
      'http_status': 200,
      'status_code': 200,
      'bytes_received': 410,
      'is_http_error': 0,
      'is_request_cache': 0,
      'is_https_used': 0
    },
    'category': '_WEB.PERF_REQUEST',
    'state': 'pages/pageTime/index',
    'action': '',
    'label': 'http://127.0.0.1:30080/entrance/18647/uploadJson/?p_id=18647&plugin=247&version=tmf1.7&uin=smithdeng123&a=1',
    'value': 1,
    'page': 'pages/index/index'
  }, {
    'id': 'dcc3bd48-4180-45b8-af9e-b47ecc7144b2',
    'time': '2021-01-14T16:50:51.828Z',
    'topic': 4,
    'extra': '',
    'tags': {},
    'values': {},
    'pre_page_id': 'pages/pageTime/index',
    'pre_page': 'pages/pageTime/index',
    'page_id': 'pages/index/index',
    'page': 'pages/index/index',
    'pre_page_start': '2021-01-14T16:50:38.716Z',
    'pre_page_end': '2021-01-14T16:50:51.828Z',
    'page_start': '2021-01-14T16:50:51.828Z'
  }, {
    'id': '07ea8c7c-fe67-4696-bd67-549d1edf3b73',
    'time': '2021-01-14T16:50:52.088Z',
    'topic': 7,
    'tags': {
      'start_time': '1610643051816',
      'end_time': '1610643052088',
      'http_method': 'POST',
      'bread_crumb_id': ''
    },
    'values': {
      'cost': 272,
      'duration': 272,
      'http_status': 200,
      'status_code': 200,
      'bytes_received': 410,
      'is_http_error': 0,
      'is_request_cache': 0,
      'is_https_used': 0
    },
    'category': '_WEB.PERF_REQUEST',
    'state': 'pages/index/index',
    'action': '',
    'label': 'http://127.0.0.1:30080/entrance/18647/uploadJson/?p_id=18647&plugin=247&version=tmf1.7&uin=smithdeng123&a=1',
    'value': 1,
    'page': 'pages/pageTime/index'
  }]
}

module.exports = {
  jsonData,
  appconfigData
}