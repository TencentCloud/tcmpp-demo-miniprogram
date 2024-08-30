import { getStorageSync, getSystemInfo, getSystemInfoSync, setStorageSync } from '@tarojs/taro';
import { changeLanguage, use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../i18n/en.json';
import id from '../i18n/id.json';
import zh from '../i18n/zh-CN.json';

// 加载翻译文件
const resources = {
    en: {
        translation: en
    },
    'zh-CN': {
        translation: zh
    },
    id: {
        translation: id
    },
};

use(initReactI18next)
    .init({
        resources,
        lng: getSystemInfoSync().language || getStorageSync('language') || 'en',
        keySeparator: false, // 不使用键分隔符
        interpolation: {
            escapeValue: false, // 不在需要转义
        },
    });

getSystemInfo().then(res => {
    console.log(res.language, 'getSystemInfo.language');
    const lang = res.language || getStorageSync('language') || 'en';

    changeLanguage(lang);
    setStorageSync('language', lang);
});