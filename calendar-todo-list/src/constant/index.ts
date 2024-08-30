import { t } from 'i18next';
import { shuffle } from 'lodash';
import randomcolor from 'randomcolor';
import { DateOption } from 'types';

import { routers } from '../app.config';

export const Routers = routers;

export enum ERoles {
  manager = 'manager',
  default = 'default',
}

// export const ServerUrl =
//  process.env.NODE_ENV === 'development'
//    ? 'http://localhost:11150'
//    : 'https://www.wangjiguahuzi.xyz:11150';
export const ServerUrl = 'https://www.wangjiguahuzi.xyz:11150';

export const Pages = Object.keys(Routers).reduce(
  (assum, current) => ({ ...assum, [current]: `/${Routers[current]}` }),
  { ...Routers },
);

export const ImageHost = 'https://www.wangjiguahuzi.xyz:11150/public/images';

export const genWeekOptions = (): DateOption[] => [
  { key: 'MON', source: 1, value: 1, view: t('周一') },
  { key: 'THE', source: 2, value: 2, view: t('周二') },
  { key: 'WED', source: 3, value: 3, view: t('周三') },
  { key: 'THU', source: 4, value: 4, view: t('周四') },
  { key: 'FRI', source: 5, value: 5, view: t('周五') },
  { key: 'SAT', source: 6, value: 6, view: t('周六') },
  { key: 'SUN', source: 0, value: 7, view: t('周日') },
];

export const genMonthOptions = (): DateOption[] => [
  { key: 'Jan', source: 0, value: 1, view: t('一月') },
  { key: 'Feb', source: 1, value: 2, view: t('二月') },
  { key: 'Mar', source: 2, value: 3, view: t('三月') },
  { key: 'Apr', source: 3, value: 4, view: t('四月') },
  { key: 'May', source: 4, value: 5, view: t('五月') },
  { key: 'Jun', source: 5, value: 6, view: t('六月') },
  { key: 'Jul', source: 6, value: 7, view: t('七月') },
  { key: 'Aug', source: 7, value: 8, view: t('八月') },
  { key: 'Sep', source: 8, value: 9, view: t('九月') },
  { key: 'Oct', source: 9, value: 10, view: t('十月') },
  { key: 'Nov', source: 10, value: 11, view: t('十一月') },
  { key: 'Dec', source: 11, value: 12, view: t('十二月') },
];

export enum EPhysioType {
  ovulationDay = 'ovulationDay', // 排卵日
  safety = 'safety', // 安全期
  pregnancy = 'pregnancy', // 易孕期
  menstrual = 'menstrual', // 预测经期
  other = 'other',
}

export const genPhysioTypeOpt = (): Record<
  EPhysioType,
  { color: string; name: string; key: EPhysioType }
> => ({
  menstrual: {
    key: EPhysioType.menstrual,
    color: '#ff8b99',
    name: t('预测经期'),
  },
  safety: {
    key: EPhysioType.safety,
    color: '#67d3cf',
    name: t('安全期'),
  },
  pregnancy: {
    key: EPhysioType.pregnancy,
    color: '#ff8a08',
    name: t('易孕期'),
  },
  ovulationDay: {
    key: EPhysioType.ovulationDay,
    color: '#900000',
    name: t('排卵日'),
  },
  other: {
    key: EPhysioType.other,
    color: 'inherit',
    name: '',
  },
});

const colors = [
  ...randomcolor({
    count: 100,
    luminosity: 'dark',
    alpha: 0.8,
    format: 'hsla',
    seed: `${Math.random()}`,
  }),
  ...randomcolor({
    count: 100,
    luminosity: 'bright',
    alpha: 0.8,
    format: 'hsla',
    seed: `${Math.random()}`,
  }),
].filter((v) => {
  const rv = v.match(RegExp(/hsla\((\d+(?:\.\d+)?)\b/));

  return Number(rv?.[1]) < 45 || Number(rv?.[1]) > 140;
});

export const colorList: string[] = [
  '#7c4e7a',
  '#b9885f',
  '#5780ac',
  '#b5626b',
  '#7a7086',
  '#4e9d9b',
  '#f9a86a',
  '#7371c7',
  '#6a8f7d',
  '#c36904',
  '#c182eb',
  '#ff8b99',
  '#3f51b5',
  '#009688',
  '#6daaf9',
  '#b05cc7',
  '#9f1956',
  '#958875',
  '#ff5722',
  '#4caf50',
  '#2196f3',
  '#e91e63',
  '#9c27b0',
  '#9e9e9e',
  '#673ab7',
  '#00bcd4',
  '#8bc34a',
  '#ff9800',
  '#795548',
  '#607d8b',
].concat(shuffle(colors));

export const Delimiter = '^_^';
export const SchedulingSelected = 'SchedulingSelected';
