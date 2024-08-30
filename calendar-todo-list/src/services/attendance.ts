import { stringify } from 'qs';
import { HomeRecord } from 'types';

import request from '@/utils/request';

const prefix = '/api/attendances';

export const getList = (params?: {
  startDate?: number;
  endDate?: number;
  date?: number;
}): Promise<HomeRecord[]> => {
  return request(`${prefix}?${stringify(params)}`);
};

export const postItem = (params: Partial<HomeRecord>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<HomeRecord>) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};

export const deleteItem = (id: string, date: number) => {
  return request(`${prefix}/${id}/${date}`, {
    method: 'DELETE',
  });
};
