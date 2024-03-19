import zh_CN from './zh-CN';
import en_US from './en-US';

const wordsMap = {
  zh_CN,
  en_US
};

let localLang = wx.getStorageSync("lan") || wx.getSystemInfoSync().language;
let lang
let i18n
const regexZH = /^zh/i;

(() => {
  lang = regexZH.test(localLang) ? 'zh_CN' : 'en_US'
  wx.setStorageSync("lan", lang);
  i18n = wordsMap[lang];
})()

function changeLang() {
  lang = lang === 'zh_CN' ? 'en_US' : 'zh_CN'
  wx.setStorageSync("lan", lang);
  i18n = wordsMap[lang];
}

export { i18n, changeLang, lang };