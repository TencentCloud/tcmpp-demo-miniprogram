import { Button, View } from '@tarojs/components';
import classNames from 'classnames';
import { t } from 'i18next';
import randomColor from 'randomcolor';
import { FC, useState } from 'react';
import { AtInput } from 'taro-ui';

import { useAppSelector } from '@/utils/hooks';

import Modal from '../modal';
import styles from './index.module.less';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  tips?: string;
}
const genColorList = () => {
  return randomColor({
    count: 100,
    format: 'hex',
  });
};

const ColorSelect: FC<Props> = ({ value, onChange, tips }) => {
  const { userInfo } = useAppSelector((state) => state.app);
  const [colorListTemp, setColorList] = useState(genColorList);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const colorList = [...(userInfo?.colors || []), ...colorListTemp].slice(
    0,
    100,
  );

  return (
    <>
      <View className={styles.colorInput}>
        <AtInput
          className={styles.input}
          name=""
          title={`${t('颜色')}：`}
          type="text"
          placeholder={t('请输入')}
          value={value}
          onChange={onChange}
          clear
        />
        <View
          className={styles.colorSelect}
          onClick={() => setColorModalOpen(true)}
          style={
            value && /^#[0-9a-fA-F]{6}$/.test(value)
              ? { background: value, color: '#ffffff' }
              : {}
          }
        >
          {t('点击选择')}
        </View>
      </View>
      <View className={styles.tips}>
        <View>
          {t('颜色值使用十六进制表示法，例如“#ffffff”表示纯白色，其中“#”后面跟着六位十六进制数字，分别代表红、绿、蓝三个通道的颜色值，请填写类似的值。')}
        </View>
        {tips && <View>{tips}</View>}
      </View>

      <Modal
        title={value}
        closeOnClickOverlay
        isOpened={colorModalOpen}
        okText={t('换一批')}
        onClose={() => setColorModalOpen(false)}
        footer={
          <>
            <Button onClick={() => setColorModalOpen(false)}>{t('关闭')}</Button>
            <Button onClick={() => setColorList(genColorList)}>{t('换一批')}</Button>
          </>
        }
      >
        <View className={styles.colorContent}>
          {colorList.map((v) => (
            <View
              className={classNames(styles.colorLi, {
                [styles.selected]: v === value,
              })}
              key={v}
              style={{ background: v }}
              onClick={() => {
                onChange?.(v);
                setColorModalOpen(false);
              }}
            />
          ))}
        </View>
      </Modal>
    </>
  );
};

export default ColorSelect;
