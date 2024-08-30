import Taro, { request as taroRequest } from '@tarojs/taro';

import { Pages, ServerUrl } from '@/constant';

interface ExtendOptions {
  hasTip?: boolean;
  tipText?: string;
  body?: any;
  headers?: any;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
}
const request = async (url: string, opts?: ExtendOptions): Promise<any> => {
  const token = await Taro.getStorageSync('token');

  return new Promise((resovle, reject) => {
    const options = {
      url: url.startsWith('http') ? url : `${ServerUrl}${url}`,
      header: {
        'content-type': 'application/json;charset=UTF-8', // 默认值
        Authorization: `Bearer ${token}`,
        ...(opts?.headers || {}),
      },
      method: opts?.method || 'GET',
      data: opts?.body,
      success: async ({ data, statusCode }) => {
        if (String(statusCode).startsWith('2')) {
          resovle(data);
        } else if (statusCode === 401) {
          reject('认证失败');
          Taro.clearStorage({
            success: () => {
              Taro.reLaunch({ url: Pages.authPage });
            },
            fail: () => {
              Taro.removeStorage({
                key: 'token',
                success: () => {
                  Taro.reLaunch({ url: Pages.authPage });
                },
              });
            },
          });
        } else {
          reject(data);
        }
      },
      fail: reject,
    };

    taroRequest(options);
  });
};

export default request;
