import { UserInfo } from 'types';

import request from '@/utils/request';

const prefix = '/api/users';


export const register = (code: string) => {
  return request('https://tcmpp.woyaojianfei.club/getUserInfo', {
    method: 'POST',
    body: {
      appid: 'mp758vyhj80mnlei',
      code,
    },
  });
};

export const login = (params: {
  userInfo: Partial<UserInfo>;
}): Promise<{ token: string; userInfo: UserInfo }> => {
  return request(`${prefix}/auth`, {
    method: 'POST',
    body: params,
  });
};

export const getUser = (): Promise<UserInfo> => {
  return request(`${prefix}/current`);
};

export const getUserList = (): Promise<UserInfo[]> => {
  return request(`${prefix}`);
};

export const getStatistics = (): Promise<{
  count: number;
  emailCount: number;
  lastWeekCount: { date: string; count: number }[];
}> => {
  return request(`${prefix}/statistics`);
};

export const patchUser = (params: Partial<UserInfo> & { code?: string }) => {
  const { _id, ...restParams } = params;

  return request(`${prefix}/update/${_id}`, {
    method: 'POST',
    body: restParams,
  });
};
