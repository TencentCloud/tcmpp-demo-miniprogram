import { PublicData } from 'types';

import request from '@/utils/request';

const prefix = '/api/publicDatas';

type TType = 'userManual' | 'announcement';

export const getList = (type: TType): Promise<PublicData> => {
  return request(`${prefix}`).then((res) => {
    return res.find((v) => v.type === type);
  });
};

export const postItem = (
  params: Partial<PublicData['data'][number]>[],
  type: TType
) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: { type, data: params },
  });
};

export const patchItem = (params: Partial<PublicData>) => {
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
