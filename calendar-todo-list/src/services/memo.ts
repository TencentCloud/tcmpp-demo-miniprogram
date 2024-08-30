import { MemoInfo } from 'types';

import request from '@/utils/request';

const prefix = '/api/memos';

export const getList = (): Promise<MemoInfo[]> => {
  return request(`${prefix}`);
};

export const postItem = (params: Partial<MemoInfo>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<MemoInfo>) => {
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
