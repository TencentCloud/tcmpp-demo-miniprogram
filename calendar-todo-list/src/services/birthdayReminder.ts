import { stringify } from 'qs';

import { IBirthdayReminderInfo } from '@/pages/user/birthdayReminder/type';
import request from '@/utils/request';

const prefix = '/api/birthdayReminders';

export const getList = (): Promise<IBirthdayReminderInfo[]> => {
  return request(`${prefix}`);
};

export const getCode = (params: {
  email: string;
}): Promise<IBirthdayReminderInfo[]> => {
  return request(`${prefix}/code?${stringify(params)}`);
};

export const postItem = (params: Partial<IBirthdayReminderInfo>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const deleteItem = (id: string) => {
  return request(`${prefix}/${id}`, {
    method: 'DELETE',
  });
};
