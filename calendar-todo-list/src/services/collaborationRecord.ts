import { stringify } from 'qs';
import { CollaborationRecord } from 'types';

import request from '@/utils/request';

const prefix = '/api/collaborationRecords';

export const getList = (params?: {
  startDate?: number;
  endDate?: number;
  date?: number;
  tableId: string;
}): Promise<CollaborationRecord[]> => {
  return request(`${prefix}?${stringify(params)}`);
};

export const postItem = (params: Partial<CollaborationRecord>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<CollaborationRecord>) => {
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
