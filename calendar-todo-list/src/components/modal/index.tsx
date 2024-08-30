import { Button, View } from '@tarojs/components';
import { t } from 'i18next';
import { FC, PropsWithChildren } from 'react';
import { AtModal, AtModalAction, AtModalContent } from 'taro-ui';

import styles from './index.module.less';

interface Props extends PropsWithChildren {
  title?: string;
  isOpened: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  onOk?: () => void;
  loading?: boolean;
  okText?: string;
  cancelText?: string;
  footer?: JSX.Element;
  closeOnClickOverlay?: boolean;
}

const Modal: FC<Props> = ({
  loading,
  isOpened,
  children,
  onOk,
  onCancel,
  onClose,
  title,
  closeOnClickOverlay = false,
  okText,
  cancelText,
  footer,
}) => {
  return isOpened ? (
    <AtModal
      className={styles.modal}
      isOpened={isOpened}
      closeOnClickOverlay={closeOnClickOverlay}
      onClose={onClose}
    >
      {title && <View className={styles.title}>{title}</View>}
      <AtModalContent>{children}</AtModalContent>
      <AtModalAction>
        {footer ?? (
          <>
            <Button onClick={onCancel}>{cancelText || t('取消')}</Button>
            {onOk && <Button onClick={onOk} loading={loading}>
              {okText || t('确定')}
            </Button>}
          </>
        )}
      </AtModalAction>
    </AtModal>
  ) : null;
};

export default Modal;
