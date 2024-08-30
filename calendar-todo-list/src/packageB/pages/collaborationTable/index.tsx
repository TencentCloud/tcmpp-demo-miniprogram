import { getCurrentInstance } from '@tarojs/taro';

import CollaborationTablePage from '@/components/collaborationTablePage';

const CollaborationTable = () => {
  const { tableId = '' } = getCurrentInstance().router?.params || {};

  return <CollaborationTablePage tableId={tableId} />;
};

export default CollaborationTable;
