export interface IBirthdayReminderInfo {
  _id: string;
  name: string;
  date: string;
  preDays: string[];
  sendTime: number;
  type: 'new' | 'old' | 'both';
  openid: string;
  created: string;
  updated: string;
}
