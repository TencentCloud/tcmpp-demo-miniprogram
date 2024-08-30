import { Category } from 'types';

import request from '@/utils/request';

const prefix = '/api/categories';

export const getCategory = (tableId?: string): Promise<Category[]> => {
  return request(tableId ? `${prefix}?tableId=${tableId}` : `${prefix}`);
};

export const getCategoryById = (id?: string): Promise<Category> => {
  return request(`${prefix}/${id}`);
};

export const postCategory = (params: Partial<Category>) => {
  return request(`${prefix}`, {
    method: 'POST',
    body: params,
  });
};

export const patchCategory = (params: Partial<Category>) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};

export const deleteCategory = (id: string) => {
  return request(`${prefix}/${id}`, {
    method: 'DELETE',
  });
};
