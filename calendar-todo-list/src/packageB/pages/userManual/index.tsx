import { Picker, Text, View } from '@tarojs/components';
import { atMessage, navigateTo, useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import { AtButton, AtMessage } from 'taro-ui';

import Action from '@/components/action';
import Icon from '@/components/icon';
import WxSay from '@/components/wxSay';
import { ERoles, Pages } from '@/constant';
import { getList, patchItem } from '@/services/publicData';
import { useAppSelector, useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const UserManual = () => {
  const { userInfo } = useAppSelector((state) => state.app);
  const [selectorChecked, setSelectorChecked] = useState<number>(0);
  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '', // 功能
    desc: '', // 详细
  });
  const [isShowImg, setIsShowImg] = useState(false);
  const {
    data: res,
    loading: listLoading,
    run,
  } = useRequest(() => getList('userManual'), {
    manual: true,
    onSuccess: (r) => {
      if ((r?.data.length ?? 0) < selectorChecked + 1) {
        setSelectorChecked(0);
      }
    },
  });
  const isManager = userInfo?.roles.includes(ERoles.manager);
  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({ isOpened: false, id: '', name: '', desc: '' });
      run();
    },
  });

  const onDelete = (id: string) => {
    if (res && res.data.length !== 1) {
      patchItemAsync({
        ...res,
        data: res.data.filter((v) => v._id !== id),
      });
    } else {
      atMessage({
        message: '最后一个不允许删除',
        type: 'warning',
      });
    }
  };

  const onEdit = () => {
    navigateTo({
      url: `${Pages.userManualEditPage}?isEdit=true&id=${deleteInfo.id}`,
    });
    setDeleteInfo({ isOpened: false, id: '', name: '', desc: '' });
    setIsShowImg(false);
  };

  const onAdd = () => {
    navigateTo({
      url: `${Pages.userManualEditPage}?id=${deleteInfo.id}&name=${deleteInfo.name}`,
    });
    setDeleteInfo({ isOpened: false, id: '', name: '', desc: '' });
    setIsShowImg(false);
  };

  useDidShow(() => {
    if (!isShowImg) {
      // 防止查看图片时返回刷新问题
      run();
    }
  });

  useLoading(listLoading || patchLoading);
  const list = res?.data || [];
  const nameList = [...new Set(list?.map((v) => v.name || '') || [])];
  const checkName = nameList[selectorChecked];

  return (
    <>
      <AtMessage />
      {list.length > 0 && (
        <View className={styles.head}>
          <Picker
            mode='selector'
            value={selectorChecked}
            range={nameList}
            onChange={(e) => setSelectorChecked(e.detail.value as number)}
          >
            <Icon value='bullet-list' size={18} className={styles.icon} />
            <Text className={styles.text}>
              点击筛选功能，当前查看：{checkName ?? '全部'}
            </Text>
          </Picker>
        </View>
      )}
      <View className={styles.container}>
        {list
          .filter((v) => (checkName ? v.name === checkName : true))
          .map((v, i, arr) => {
            return (
              <WxSay
                key={v._id}
                type={v.type ? 'dev' : 'user'}
                value={{
                  text: v.desc,
                  img: v.img,
                  imgs: arr.map((av) => av.img).filter(Boolean) as string[],
                }}
                onEdit={() => {
                  if (isManager) {
                    setDeleteInfo({
                      isOpened: true,
                      id: v._id,
                      desc: v.desc || '',
                      name: v.name || '',
                    });
                  }
                }}
                onShowImg={() => setIsShowImg(true)}
              />
            );
          })}
        {isManager && !res && !listLoading && (
          <AtButton
            type='primary'
            onClick={() => {
              navigateTo({ url: Pages.userManualEditPage });
            }}
          >
            添加
          </AtButton>
        )}
      </View>
      <Action
        preTitle='记录'
        title={deleteInfo.desc}
        isOpened={deleteInfo.isOpened}
        onClose={() => {
          setDeleteInfo({ isOpened: false, id: '', name: '', desc: '' });
        }}
        onDelete={() => onDelete(deleteInfo.id)}
        options={[
          { name: '编辑', fn: onEdit },
          { name: '在该条数据后添加', fn: onAdd },
        ]}
      />
    </>
  );
};

export default UserManual;
