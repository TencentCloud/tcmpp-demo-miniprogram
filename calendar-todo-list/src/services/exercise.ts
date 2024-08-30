import { ExercisePlanGroupItem, ExercisePlanItem } from 'types';

import request from '@/utils/request';

const prefix = '/api/exercises';

const groupListDemo: ExercisePlanGroupItem[] = [
  {
    _id: '',
    name: '深蹲4组示例',
    planList: [
      { _id: '', name: '深蹲', stepTime: 2, count: 50, restTime: 20 },
      { _id: '', name: '深蹲', stepTime: 2, count: 50, restTime: 20 },
      { _id: '', name: '深蹲', stepTime: 2, count: 50, restTime: 20 },
      { _id: '', name: '深蹲', stepTime: 2, count: 50, restTime: 20 },
    ],
  },
];

export const getPlanList = (): Promise<ExercisePlanItem[]> => {
  return request(`${prefix}/plan`);
};

export const postPlanItem = (params: Partial<ExercisePlanItem>) => {
  return request(`${prefix}/plan`, {
    method: 'POST',
    body: params,
  });
};

export const patchPlanItem = (params: Partial<ExercisePlanItem>) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/plan/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};

export const deletePlanItem = (id: string) => {
  return request(`${prefix}/plan/${id}`, {
    method: 'DELETE',
  });
};

export const getGroupList = (): Promise<ExercisePlanGroupItem[]> => {
  return request(`${prefix}/group`).then((res) => {
    // return res?.length > 0 ? res : groupListDemo;
    return res;
  });
};

export const getGroupItem = (id: string): Promise<ExercisePlanGroupItem> => {
  return request(`${prefix}/group/${id}`);
};

export const postGroupItem = (params: Partial<ExercisePlanGroupItem>) => {
  return request(`${prefix}/group`, {
    method: 'POST',
    body: {
      ...params,
      planList: params.planList?.map(({ _id, ...rest }) => rest),
    },
  });
};

export const patchGroupItem = (params: Partial<ExercisePlanGroupItem>) => {
  const { _id: id, ...restParams } = params;

  return request(`${prefix}/group/${id}`, {
    method: 'POST',
    body: {
      ...params,
      planList: restParams.planList?.map(({ _id, ...rest }) => rest),
    },
  });
};

export const deleteGroupItem = (id: string) => {
  return request(`${prefix}/group/${id}`, {
    method: 'DELETE',
  });
};
