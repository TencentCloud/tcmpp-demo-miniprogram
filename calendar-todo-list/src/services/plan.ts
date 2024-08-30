import { stringify } from 'qs';
import { PlanInfo } from 'types';

import request from '@/utils/request';

const prefix = '/api/plans';

export const getList = (params?: { date: string }): Promise<PlanInfo[]> => {
  return request(`${prefix}?${stringify(params)}`);
};

export const postItem = (params: Partial<PlanInfo>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<PlanInfo>) => {
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
