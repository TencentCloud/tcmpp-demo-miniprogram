import { View } from '@tarojs/components';
import { t } from 'i18next';
import { FC, useState } from 'react';
import { AtActionSheet, AtActionSheetItem } from 'taro-ui';

import Modal from '../modal';
import styles from './index.module.less';

interface IProps {
  preTitle?: string;
  title?: string;
  isOpened?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  deleteText?: string;
  options?: { name: string; fn: () => void }[];
}

const Action: FC<IProps> = ({
  preTitle = t('名称'),
  deleteText = t('删除'),
  title,
  isOpened,
  options = [],
  onClose,
  onDelete,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dangerTip = t('数据{{deleteText}}后不可恢复，请谨慎操作', {
    deleteText,
  });

  return (
    <>
      <Modal
        isOpened={modalOpen}
        title={t('删除提示')}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          setModalOpen(false);
          onDelete?.();
        }}
      >
        <View className={styles.modalContent}>
          {t('该操作不可逆，数据删除后不能恢复，请谨慎操作，是否确认删除？')}
        </View>
      </Modal>
      <AtActionSheet
        className={styles.actionSheet}
        cancelText={t('取消')}
        title={title ? `${preTitle}：${title}` : onDelete ? dangerTip : ''}
        isOpened={isOpened ?? false}
        onClose={onClose}
      >
        {options.map((item, index) => (
          <AtActionSheetItem
            className={styles.link}
            key={index}
            onClick={item.fn}
          >
            {item.name}
          </AtActionSheetItem>
        ))}
        {onDelete && (
          <AtActionSheetItem
            className={styles.delete}
            onClick={() => setModalOpen(true)}
          >
            {deleteText}
          </AtActionSheetItem>
        )}
      </AtActionSheet>
    </>
  );
};

export default Action;
