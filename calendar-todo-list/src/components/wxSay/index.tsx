import { Image, ImageProps, View } from '@tarojs/components';
import { previewImage } from '@tarojs/taro';
import classNames from 'classnames';
import { t } from 'i18next';
import { FC, useState } from 'react';

import { getResourceUrl } from '@/utils/common';

import styles from './index.module.less';

interface SayContent {
  value: { img?: string; text?: string; imgs?: string[] };
  type: 'dev' | 'user';
  onEdit?: () => void;
  onShowImg?: () => void;
  devUrl?: string;
  userUrl?: string;
  userName?: string;
}
const WxSay: FC<SayContent> = ({
  userName,
  value: { img: imgProps, text, imgs: imgsProps },
  type,
  onEdit,
  onShowImg,
  devUrl: devUrlProps,
  userUrl: userUrlProps,
}) => {
  const devUrl = getResourceUrl(
    devUrlProps || 'public/images/common/help/dev.jpg'
  );
  const userUrl = getResourceUrl(
    userUrlProps || 'public/images/common/help/user.jpg'
  );
  const [mode, setMode] = useState<keyof ImageProps.Mode>();
  const img = getResourceUrl(imgProps);
  const imgs = imgsProps?.map((v) => getResourceUrl(v));

  return (
    <View className={styles.sayContainer}>
      <View className={styles.headImg}>
        {type === 'user' && <Image src={userUrl} onClick={onEdit} />}
      </View>
      {text && (
        <View
          className={classNames(styles.sayContent, {
            [styles.sayContentR]: type === 'dev',
          })}
        >
          {type === 'user' && (
            <View className={styles.userName}>{userName || t('用户')}</View>
          )}
          <View
            className={classNames(styles.content, {
              [styles.contentR]: type === 'dev',
            })}
            onClick={onEdit}
          >
            <View className={styles.arrow} />
            {text}
          </View>
        </View>
      )}
      {img && (
        <View
          className={classNames(styles.contentImg, {
            [styles.contentImgR]: type === 'dev',
          })}
        >
          {type === 'user' && <View className={styles.userName}>{t('用户')}</View>}
          <Image
            mode={mode}
            src={img}
            onLoad={(e) => {
              if (e.detail.height > e.detail.width) {
                setMode('heightFix');
              } else {
                setMode('widthFix');
              }
            }}
            onClick={() => {
              previewImage({
                current: img, // 当前显示图片的http链接
                urls: imgs?.length ? imgs : [img], // 需要预览的图片http链接列表
                complete: () => onShowImg?.(),
              });
            }}
          />
        </View>
      )}
      <View className={styles.headImg}>
        {type === 'dev' && <Image src={devUrl} onClick={onEdit} />}
      </View>
    </View>
  );
};

export default WxSay;
