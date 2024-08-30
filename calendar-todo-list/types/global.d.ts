// / <reference types="@tarojs/taro" />
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module '*.mp3';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd';
  }
}

interface MessageOptions {
  /**
   * 文本消息内容
   */
  message: string;
  /**
   * 消息类型
   * @default 'info'
   */
  type?: 'info' | 'success' | 'error' | 'warning';
  /**
   * 消息持续时间,单位 ms
   * @default 3000
   */
  duration?: number;
}

declare namespace Taro {
  interface TaroStatic {
    atMessage: (options: MessageOptions) => void;
  }
}
