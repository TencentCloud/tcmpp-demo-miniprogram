import { ERoles } from '@/constant';

export interface DateOption {
  key: string;
  view: string;
  source: number;
  value: number;
}

export interface UserInfo {
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  nickName: string;
  email: string;
  province: string;
  openid: string;
  _id: string;
  roles: string[];
  created: string;
  updated: string;
  announcementId?: string;
  activeTableId?: string;
  closeMask?: boolean;
  physiology?: {
    status?: boolean;
    data?: {
      cycle: number;
      beginDate: string;
      endDate: string;
      menstrualDays: number;
    };
  };
  colors?: string[];
  isDayOfTheSun?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  tableId?: string;
  openid?: string;
  createdRole?: ERoles;
  color?: string;
  beginTime?: string;
  endTime?: string;
  num?: number | string;
  income?: number | string;
  outlay?: number | string;
  created: string;
  updated: string;
}

export interface HomeRecord {
  _id: string;
  name: string;
  date: number;
  time: string;
  beginDate: string;
  beginTime: string;
  endDate: string;
  endTime: string;
  num?: number | string;
  income?: number | string;
  outlay?: number | string;
  color?: string;
  desc?: string;
  imgs?: string[];
  openid: string;
  created: string;
  updated: string;
}

export type CollaborationRecord = HomeRecord & { tableId: string };

export interface PlanInfo {
  _id: string;
  name: string;
  date: number;
  num: number | string;
  openid: string;
  created: string;
  updated: string;
}
export interface MemoInfo {
  _id: string;
  value: string;
  status?: string;
  openid: string;
  created: string;
  updated: string;
}

export interface Suggestion {
  _id: string;
  openid: string;
  data: {
    _id: string;
    type: string;
    text: string;
    timestamp: number;
  }[];
  created: string;
  updated: string;
}

export interface Physiology {
  _id: string;
  beginDate: string;
  endDate: string;
  cycle: number;
  menstrualDays: number;
  desc?: string;
  openid: string;
  created: string;
  updated: string;
}

export interface Schedule {
  _id: string;
  date: number;
  title: string;
  desc: string;
  time: number;
  finish: boolean;
  finishTime: number;
  remindStatus: boolean;
  openid: string;
  created: string;
  updated: string;
}

export interface ShareAttendanceMap {
  _id: string;
  openid: string;
  shareId: string;
  shareName: string;
  created: string;
  updated: string;
}

export interface CollaborationTable {
  _id: string;
  name: string;
  users: { name: string; openid: string }[];
  desc?: string;
  openid: string;
  created: string;
  updated: string;
}

export interface PublicData {
  _id: string;
  type: string;
  data: {
    _id: string;
    name?: string;
    desc?: string;
    img?: string;
    type: string;
  }[];
  openid: string;
  created: string;
  updated: string;
}

export interface ExercisePlanItem {
  _id: string;
  name: string;
  count: number | string;
  stepTime: number | string;
  restTime: number | string;
}

export interface ExercisePlanGroupItem {
  _id: string;
  name: string;
  planList?: ExercisePlanItem[];
  desc?: string;
}

export interface HolidayItem {
  _id: string;
  name: string;
  subName?: string;
  date: string;
  days: number;
  openid: string;
  workDays?: string[];
  createdRole?: ERoles;
  desc?: string;
}
