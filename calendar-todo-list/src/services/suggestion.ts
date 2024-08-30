import { Suggestion } from 'types';

import request from '@/utils/request';

const prefix = '/api/suggestions';

export const getList = (): Promise<Suggestion[]> => {
  return request(`${prefix}`);
};

export const postItem = (params: Partial<Suggestion['data'][number]>[]) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: { data: params },
  });
};

export const patchItem = (params: Partial<Suggestion>) => {
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
