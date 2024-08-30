import { Button, View } from '@tarojs/components';
import { t } from 'i18next';
import { FC } from 'react';

import Modal from '../modal';
import styles from './index.module.less';

interface Props {
    isOpened?: boolean,
    setOpened?: (isOpened: boolean) => void,
    list: {
        label: string,
        onClick?: () => void
        hidden?: boolean
    }[]
}
const MenuButton: FC<Props> = ({ isOpened = false, setOpened, list }) => {

    return (
        <Modal isOpened={isOpened} onCancel={() => setOpened?.(false)}>
            {list.map(({ onClick, label, hidden }) => {
                return hidden ? null : (
                    <View className={styles.li} key={label} onClick={() => {
                        setOpened?.(false);
                        onClick?.();
                    }}>{label}</View>
                );
            })}
        </Modal>
    );
};

export default MenuButton;