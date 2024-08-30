import { Physiology } from 'types';

import request from '@/utils/request';

const prefix = '/api/physiologys';

export const getList = (): Promise<Physiology[]> => {
  return request(`${prefix}`);
};

export const getItem = (id: string): Promise<Physiology> => {
  return request(`${prefix}/${id}`);
};

export const postItem = (params: Partial<Physiology>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<Physiology>) => {
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
