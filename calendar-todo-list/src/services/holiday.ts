import { HolidayItem } from 'types';

import request from '@/utils/request';

const prefix = '/api/holidays';

export const getList = (): Promise<HolidayItem[]> => {
  return request(`${prefix}`);
};

export const getItem = (id: string): Promise<HolidayItem> => {
  return request(`${prefix}/${id}`);
};

export const postItem = (params: Partial<HolidayItem>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<HolidayItem>) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};

export const deleteItem = (id: string) => {
  return request(`${prefix}/${id}`, {
    method: 'DELETE',
  });
};
