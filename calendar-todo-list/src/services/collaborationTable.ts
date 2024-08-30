import { CollaborationTable } from 'types';

import request from '@/utils/request';

const prefix = '/api/collaborationTables';

export const getList = (): Promise<CollaborationTable[]> => {
  return request(`${prefix}`);
};

export const getItem = (id: string): Promise<CollaborationTable> => {
  return request(`${prefix}/${id}`);
};

export const postItem = (params: Partial<CollaborationTable>) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}`, {
    method: 'POST',
    body: restParams,
  });
};

export const postUser = (params: {
  _id: CollaborationTable['_id'];
  user: CollaborationTable['users'][number];
}) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/user/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};

export const patchItem = (params: Partial<CollaborationTable>) => {
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
