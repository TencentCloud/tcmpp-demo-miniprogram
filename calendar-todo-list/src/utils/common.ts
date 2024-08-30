import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next from 'i18next';

import { ServerUrl } from '@/constant';

import Lunar from './lunar';

export const getDateFormat = () => i18next.language === 'zh' ? 'YYYY/MM/DD' : 'MM/DD/YYYY';
export const showDateLabel = (v?: string) => {
  if (v) {
    return dayjs(v).format(getDateFormat());
  }
  return '';
};

export const logError = (info?: string | object) => {
  if (!info) {
    info = 'empty';
  }
  let time = dayjs(new Date()).format('YYYY/MM/DDTHH:MM:ss');

  if (info instanceof Error) {
    info = info.message;
  } else if (typeof info === 'object') {
    info = JSON.stringify(info);
  }
  console.error(time, info);
};

export const getDate = (timeStamp: Parameters<typeof dayjs>[0]) => {
  const currentDay = dayjs(timeStamp);
  const date = currentDay.format(getDateFormat());
  const l = Lunar.solar2lunar(...(date.split('/') as [string, string, string]));
  const result = {
    dateNum: Number(currentDay.format('YYYYMMDD')),
    title: date,
    lunar: l,
  };

  if (l !== -1 && i18next.language === 'zh') {
    result.title = `${currentDay.format('YYYY年MM月DD日')} 
    ${l.IMonthCn}${l.IDayCn} 
    ${l.ncWeek}`;
  } else {
    result.title = date;
  }
  return result;
};

export const getMonthSpace = (y: number, m: number, isEn?: boolean) => {
  if (isEn) {
    const monthDays = dayjs(`${y}-${m}`).daysInMonth();
    const lSpace = dayjs(`${y}-${m}-1`).day();
    const rSpace = 6 - dayjs(`${y}-${m}-${monthDays}`).day();

    return [lSpace, rSpace];
  } else {
    const monthDays = dayjs(`${y}-${m}`).daysInMonth();
    const lSpace = (dayjs(`${y}-${m}-1`).day() || 7) - 1;
    const rSpace = 7 - (dayjs(`${y}-${m}-${monthDays}`).day() || 7);

    return [lSpace, rSpace];
  }
};

export const getResourceUrl = (url?: string) => {
  if (url && url.startsWith('public')) {
    return `${ServerUrl}/${url}`;
  } else {
    return url ?? '';
  }
};

export const uuid = () => {
  const hexDigits = '0123456789abcdef';

  const generateRandomHex = (length) => {
    let result = '';

    for (let i = 0; i < length; i++) {
      result += hexDigits[Math.floor(Math.random() * 16)];
    }
    return result;
  };

  return (
    generateRandomHex(8) +
    '-' +
    generateRandomHex(4) +
    '-4' +
    generateRandomHex(3) +
    '-a' +
    hexDigits[Math.floor(Math.random() * 4) + 8] +
    generateRandomHex(3) +
    '-' +
    generateRandomHex(12)
  );
};

export const message = Taro.eventCenter.trigger.bind(
  Taro.eventCenter,
  'atMessage'
);

export const truncateString = (str: string, count: number) => {
  var charCount = 0; // 统计字符数量
  var truncateIndex = 0; // 截取位置

  // 遍历字符串的每个字符
  for (var i = 0; i < str.length; i++) {
    // 判断当前字符是汉字
    if (/^[\u4E00-\u9FA5]$/.test(str[i])) {
      // 如果是，则字符数量加2
      charCount += 2;
    } else {
      charCount += 1;
    }
    // 如果字符数量达到了 count 个，则记录当前位置，并结束循环
    if (charCount >= count) {
      truncateIndex = i;
      break;
    }
  }

  // 返回截取的字符串
  return truncateIndex > 0 ? str.slice(0, truncateIndex + 1) : str;
};
