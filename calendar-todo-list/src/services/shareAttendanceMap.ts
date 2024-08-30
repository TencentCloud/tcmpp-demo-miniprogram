import { ShareAttendanceMap } from 'types';

import request from '@/utils/request';

const prefix = '/api/shareAttendanceMaps';

export const getList = (): Promise<ShareAttendanceMap[]> => {
  return request(`${prefix}`);
};

export const getSharedList = (): Promise<ShareAttendanceMap[]> => {
  return request(`${prefix}/shared`);
};

export const getCode = (): Promise<{ code: string }> => {
  return request(`${prefix}/code`);
};

export const postItem = (params: { name: string; code: string }) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchItem = (params: Partial<ShareAttendanceMap>) => {
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
