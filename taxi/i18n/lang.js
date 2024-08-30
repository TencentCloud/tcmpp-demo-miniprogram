import zh_CN from './zh-CN';
import en_US from './en-US';
import id_ID from './id_ID';
import fr_FR from './fr_FR';

const wordsMap = {
  zh_CN,
  en_US,
  id_ID,
  fr_FR
};

let localLang = wx.getSystemInfoSync().language;
let lang
let i18n
const regexZH = /^zh/i;
const regexEN = /^en/i;
const regexID = /^id/i;
const regexFR = /^fr/i;

(() => {
  if(regexZH.test(localLang)) {
    lang = 'zh_CN';
    i18n = wordsMap['zh_CN'];
  } else if(regexEN.test(localLang)) {
    lang = 'en_US';
    i18n = wordsMap['en_US'];
  } else if(regexID.test(localLang)) {
    lang = 'id_ID';
    i18n = wordsMap['id_ID'];
  } else if(regexFR.test(localLang)) {
    lang = 'fr_FR';
    i18n = wordsMap['fr_FR'];
  } else {
    lang = 'en_US';
    i18n = wordsMap['en_US'];
  }
})()

function changeLang(language) {
  lang = language;
  i18n = wordsMap[lang];
  wx.setStorageSync("lang", language);
}

function getLang() {
  return lang;
}

export { i18n, lang, changeLang, getLang };