import { Image, View } from '@tarojs/components';
import { getSystemInfoSync, useDidHide, useDidShow } from '@tarojs/taro';
import { random } from 'lodash';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/utils/hooks';

import styles from './index.module.less';

const imgs = Array.from(Array(30).keys()).map((i) => {
  return require(`../../assets/images/cun/cun${i + 1}.png`);
});

const genSparkler = () => {
  return Array(6)
    .fill('')
    .map(() => ({
      left: `${Math.random() * getSystemInfoSync().windowWidth}px`,
      top: `${Math.random() * getSystemInfoSync().windowHeight}px`,
      animationDuration: `${random(0, 3)}s`,
    }));
};

const Sparklers = () => {
  const [list, setList] = useState(genSparkler);

  useEffect(() => {
    const timer = setInterval(() => {
      setList(genSparkler);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return list.map((v, i) => (
    <Image
      key={i + v.left}
      src={imgs[0]}
      className={styles.bao}
      style={{ ...v }}
    />
  ));
};

const Mask = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const [visible, setVisible] = useState(false);

  useDidShow(() => {
    setVisible(true);
  });

  useDidHide(() => {
    setVisible(false);
  });
  return <></>;
  // return (
  //  userInfo &&
  //  !userInfo.closeMask &&
  //  visible && (
  //    <View className={styles.mask}>
  //      {Array.from(Array(30).keys()).map((i) => (
  //        <Image
  //          src={imgs[(i + 1) % imgs.length]}
  //          key={i}
  //          className={styles.snowflake}
  //          style={{
  //            transformOrigin: ['left', 'right', 'center'][random(0, 2)],
  //            padding: `0 ${random(20, 60)}px`,
  //            animationDuration: `${random(16, 25)}s`,
  //            animationDelay: `${i}s`,
  //            left: `${Math.random() * getSystemInfoSync().windowWidth}px`,
  //          }}
  //        />
  //      ))}
  //      <View className={styles.text}>
  //        <Image src={imgs[17]} className={styles.fu} />
  //      </View>
  //      <View className={styles.jieWrapper}>
  //        <View className={styles.line} />
  //        <Image src={imgs[20]} className={styles.jie} />
  //      </View>
  //      <Sparklers />
  //      {/* <View className={styles.zhufu}>
  //        {['新', '春', '快', '乐'].map((v) => (
  //          <View className={styles.lantern} key={v}>
  //            <Image src={lanternSrc} className={styles.zhufuBg} />
  //            <View className={styles.zhufuText}>{v}</View>
  //          </View>
  //        ))}
  //      </View>*/}

  //      <Image
  //        src={require('../../assets/images/cun/span.png')}
  //        className={styles.spanL}
  //      />
  //      <View className={styles.left} />

  //      <Image
  //        src={require('../../assets/images/cun/span.png')}
  //        className={styles.spanR}
  //      />
  //      <View className={styles.right} />
  //    </View>
  //  )
  // );
};

export default Mask;
