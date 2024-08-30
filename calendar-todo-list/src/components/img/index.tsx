import { CommonEventFunction, Image, View } from '@tarojs/components';
import { previewImage } from '@tarojs/taro';
import { FC, useState } from 'react';

// import { AtDrawer } from 'taro-ui';
import { getResourceUrl } from '@/utils/common';

import Icon from '../icon';
import styles from './index.module.less';

interface IProps {
  src: string;
  allSrc?: string[]; // 所有图片链接
  className?: string;
  disableDelete?: boolean;
  onDelete?: () => void;
}

const Img: FC<IProps> = ({
  src: sourceSrc,
  allSrc: sourceAllSrc,
  className,
  disableDelete,
  onDelete,
}) => {
  // const [open, setOpen] = useState(false);

  const onDeleteHandle: CommonEventFunction = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  const src = getResourceUrl(sourceSrc);
  const allSrc = sourceAllSrc?.map((v) => getResourceUrl(v));

  return (
    <View className={className}>
      <View
        className={styles.content}
        onClick={() => {
          previewImage({
            current: src, // 当前显示图片的http链接
            urls: allSrc ?? [src], // 需要预览的图片http链接列表
          });
        }}
      >
        {/* <Image src={src} mode='aspectFit' className={styles.img} />*/}
        <Image src={src} mode='aspectFill' className={styles.img} />
        {!disableDelete && (
          <Icon
            value='close-circle'
            className={styles.delete}
            size={20}
            onClick={onDeleteHandle}
          />
        )}
      </View>
      {/* <AtDrawer show={open} width='100%'>
        <View className={styles.drawerContent} onClick={() => setOpen(false)}>
          <Image src={src} mode='widthFix' className={styles.img} />
        </View>
      </AtDrawer>*/}
    </View>
  );
};

export default Img;
