import { mockIp, mockReqId } from '../../../utils/mock';

export function create() {
  const _resq = {
    data: null,
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 79,
    success: true,
  };
  return Promise.resolve(_resq);
}

export function update() {
  const _resq = {
    data: null,
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 79,
    success: true,
  };
  return Promise.resolve(_resq);
}

export function getDeliverCompanyList() {
  const _resq = {
    data: [
      {
        name: 'ZTO Express',
        code: '0001',
      },
      {
        name: 'STO Express',
        code: '0002',
      },
      {
        name: 'YTO Express',
        code: '0003',
      },
      {
        name: 'SF Express',
        code: '0004',
      },
      {
        name: 'Baishi Express',
        code: '0005',
      },
      {
        name: 'Yunda Express',
        code: '0006',
      },
      {
        name: 'EMS Express',
        code: '0007',
      },
      {
        name: 'Fengwang Express',
        code: '0008',
      },
      {
        name: 'SF Direct Express',
        code: '0009',
      },
    ],
  };
  return Promise.resolve(_resq);
}
