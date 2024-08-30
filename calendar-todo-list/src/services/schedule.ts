import { stringify } from 'qs';
import { Schedule } from 'types';

import request from '@/utils/request';

const prefix = '/api/schedule';

export const getList = (params?: {
  startDate?: number;
  endDate?: number;
  date?: number;
}): Promise<Schedule[]> => {
  return request(`${prefix}?${stringify(params)}`);
};

export const postItem = (params: Partial<Schedule>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<Schedule>) => {
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
