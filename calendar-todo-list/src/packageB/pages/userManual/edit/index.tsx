import { View } from '@tarojs/components';
import {
  atMessage,
  chooseImage,
  getCurrentInstance,
  getStorageSync,
  navigateBack,
  uploadFile,
} from '@tarojs/taro';
import { useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { PublicData } from 'types';

import Icon from '@/components/icon';
import Img from '@/components/img';
import Switch from '@/components/switch';
import { ServerUrl } from '@/constant';
import { getList, patchItem, postItem } from '@/services/publicData';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { id, isEdit, name } = getCurrentInstance().router?.params || {};

  const [value, setValue] = useState<Partial<PublicData['data'][number]>>({
    name: name ?? '',
    desc: '',
    img: '',
    type: '',
  });

  const { data: sourceData, loading: recordLoading } = useRequest(
    () => getList('userManual'),
    {
      onSuccess: (res) => {
        const editData = res?.data.find((item) => item._id === id);

        if (editData && isEdit) {
          setValue(editData);
        }
      },
    }
  );

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: () => navigateBack(),
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: () => navigateBack(),
  });

  const nameChange = (v?: string | number) => {
    setValue((prev) => ({ ...prev, name: (v as string)?.trim() }));
  };

  const typeChange = (v: boolean) => {
    setValue((prev) => ({ ...prev, type: v ? 'manager' : '' }));
  };

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
  };

  const fileUpdate = async (filePath: string) => {
    const token = await getStorageSync('token');

    uploadFile({
      url: `${ServerUrl}/api/common/imageUpload`, // 仅为示例，非真实的接口地址
      filePath,
      name: 'file',
      header: { Authorization: `Bearer ${token}` },
      success: function (res) {
        const url = JSON.parse(res.data).data[0].value;

        if (url) {
          setValue((prev) => ({
            ...prev,
            img: url.replace(/\\/g, '/'),
          }));
        }
      },
    });
  };

  const addImg = () => {
    chooseImage({
      success: (res) => {
        res.tempFilePaths.forEach(fileUpdate);
      },
    });
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: '类型必填',
        type: 'warning',
      });
    } else if (!value.desc && !value.img) {
      atMessage({
        message: '消息必填或者图片必须填一项',
        type: 'warning',
      });
    } else {
      if (isEdit && id) {
        patchItemAsync({
          ...sourceData,
          data: sourceData?.data.map((v) => {
            return v._id === id ? (value as PublicData['data'][number]) : v;
          }),
        });
      } else if (id) {
        const index = sourceData?.data.findIndex((v) => v._id === id);

        if (sourceData?.data && index !== -1 && index !== undefined) {
          patchItemAsync({
            ...sourceData,
            data: [
              ...(sourceData.data.slice(0, index + 1) || []),
              value as PublicData['data'][number],
              ...sourceData.data.slice(index + 1),
            ],
          });
        }
      } else {
        postItemAsync([value], 'userManual');
      }
    }
  };

  useLoading(postLoading || patchLoading || recordLoading);

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.content}>
        <AtInput
          name=''
          title='目录名称：'
          type='text'
          placeholder='请输入是哪个目录'
          value={value.name}
          onChange={nameChange}
        />
        <Switch
          title='是否管理员：'
          label={value.type ? '是 ，在右边' : '否，在左边'}
          value={!!value.type}
          onChange={typeChange}
        />
        <AtTextarea
          className={styles.marginTop}
          value={value.desc ?? ''}
          placeholder='请输入消息'
          maxLength={2000}
          height={200}
          onChange={descChange}
          count
        />
        <View className={styles.imgList}>
          {!value.img && (
            <View className={styles.imgWrapper}>
              <View className={styles.add} onClick={addImg}>
                <Icon value='add' />
                <View>添加图片</View>
              </View>
            </View>
          )}
          {value.img && (
            <View key={value.img} className={styles.imgWrapper}>
              <Img
                className={styles.img}
                src={value.img}
                onDelete={() =>
                  setValue((prev) => ({
                    ...prev,
                    img: '',
                  }))
                }
              />
            </View>
          )}
        </View>
      </View>
      <View className={styles.footer}>
        <AtButton type='primary' onClick={onSubmit}>
          保存
        </AtButton>
      </View>
    </View>
  );
};

export default Edit;
