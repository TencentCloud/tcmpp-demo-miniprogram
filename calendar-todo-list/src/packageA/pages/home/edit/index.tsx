import { View } from '@tarojs/components';
import {
  atMessage,
  chooseImage,
  getCurrentInstance,
  getStorageSync,
  navigateBack,
  uploadFile,
  useDidShow,
} from '@tarojs/taro';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { AtButton, AtInput, AtMessage, AtTextarea } from 'taro-ui';
import { HomeRecord } from 'types';

import ColorSelect from '@/components/colorSelect';
import Icon from '@/components/icon';
import Img from '@/components/img';
import Select from '@/components/select';
import Switch from '@/components/switch';
import TagSelect from '@/components/tagSelect';
import { ERoles, ServerUrl } from '@/constant';
import * as attendanceService from '@/services/attendance';
import { getCategory, postCategory } from '@/services/categorie';
import * as collaborationRecordService from '@/services/collaborationRecord';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import { getDate, showDateLabel } from '@/utils/common';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
} from '@/utils/hooks';

import styles from './index.module.less';

const Edit = () => {
  const { dateString, id, tableId } = getCurrentInstance().router?.params || {};

  const { getList, patchItem, postItem } = tableId
    ? collaborationRecordService
    : attendanceService;

  const { dateNum } = getDate(dateString);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const [value, setValue] = useState<Partial<HomeRecord>>({
    date: dateNum,
    imgs: [],
    time: dayjs().format('HH:mm'),
    beginDate: dayjs(dateString).format('YYYY/MM/DD'),
    beginTime: dayjs().format('HH:mm'),
    endDate: dayjs(dateString).format('YYYY/MM/DD'),
    endTime: dayjs().format('HH:mm'),
  });
  const [isNameSave, setIsNameSave] = useState(false);

  const {
    data: categoriesAll = [],
    run: getCategoryAsync,
    loading: getCategoryLoading,
  } = useRequest(() => getCategory(tableId), { manual: true });
  const categories = tableId
    ? categoriesAll
    : categoriesAll.filter((item) => {
      // 如果不是共享日历，分类数据不包括共享日历中的分类，但应涵盖互相共享的分类
      return (
        !item.tableId && (item.openid === userInfo?.openid || !item.openid)
      );
    });

  const { loading: recordLoading, run: getRecordListAsync } = useRequest(
    getList,
    {
      manual: true,
      onSuccess: (res) => {
        const editData = res?.find((item) => item._id === id);

        if (editData) {
          setValue(editData);
        }
      },
    },
  );

  const { run: postCategoryAsync, loading: postCategoryLoading } = useRequest(
    postCategory,
    {
      manual: true,
    },
  );

  const { run: updateAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
      },
    },
  );

  const todoCategory = (name?: string) => {
    const currentCategory = categories.find((item) => item.name === name);

    if (!currentCategory) {
      postCategoryAsync(
        Object.assign(
          {
            tableId,
            name,
            num: value.num,
            income: value.income,
            outlay: value.outlay,
            color: value.color,
          },
          value.beginTime !== value.endTime
            ? { beginTime: value.beginTime, endTime: value.endTime }
            : { beginTime: '', endTime: '' },
        ),
      );
    }
  };

  const todoColor = (color?: string) => {
    if (color && !(userInfo?.colors || []).includes(color)) {
      updateAsync({
        ...userInfo,
        colors: [...(userInfo?.colors || []), color],
      });
    }
  };

  const { run: postItemAsync, loading: postLoading } = useRequest(postItem, {
    manual: true,
    onSuccess: (_, params) => {
      const name = params?.[0].name;
      const color = params?.[0].color;

      if (isNameSave) {
        todoCategory(name);
      }
      todoColor(color);
      navigateBack();
    },
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: (_, params) => {
      const name = params?.[0].name;
      const color = params?.[0].color;

      if (isNameSave) {
        todoCategory(name);
      }
      todoColor(color);
      navigateBack();
    },
  });

  const descChange = (desc?: string) => {
    setValue((prev) => ({ ...prev, desc }));
  };

  const timeChange = (time: string, type: 'time' | 'beginTime' | 'endTime') => {
    if (type === 'time') {
      setValue((prev) => {
        const { beginDate, endDate, beginTime, endTime } = prev;
        const timeOption = {
          beginTime,
          endTime,
        };

        if (beginDate === endDate && beginTime === endTime) {
          timeOption['beginTime'] = time;
          timeOption['endTime'] = time;
        }

        return { ...prev, ...timeOption, [type]: time };
      });
    } else {
      setValue((prev) => ({ ...prev, [type]: time }));
    }
  };

  const colorChange = (color?: string) => {
    setValue((prev) => ({ ...prev, color }));
  };

  const dateChange = (date: string, type: 'beginDate' | 'endDate') => {
    setValue((prev) => ({ ...prev, [type]: date.split('-').join('/') }));
  };

  const nameChange = (name?: string | number) => {
    setValue((prev) => ({
      ...prev,
      name: (name as string)?.trim(),
      color: '',
    }));
    if (isNameSave) {
      setIsNameSave(false);
    }
  };

  const numChange = (num?: number | string) => {
    setValue((prev) => ({ ...prev, num }));
  };
  const incomeChange = (income?: number | string) => {
    setValue((prev) => ({ ...prev, income }));
  };
  const outlayChange = (outlay?: number | string) => {
    setValue((prev) => ({ ...prev, outlay }));
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
            imgs: [...(prev?.imgs || []), url.replace(/\\/g, '/')],
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

  const deleteImg = (src: string) => {
    setValue((prev) => ({
      ...prev,
      imgs: prev.imgs?.filter((item) => item !== src),
    }));
  };

  const onSubmit = () => {
    if (!value.name) {
      atMessage({
        message: t('名称必填'),
        type: 'warning',
      });
    } else if ((value.name || '').length > 64) {
      atMessage({
        message: t('名称字数不能超过64个字符'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.num as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.num as string)
    ) {
      atMessage({
        message: t('数值必须为数字'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.income as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.income as string)
    ) {
      atMessage({
        message: t('收入必须为数字'),
        type: 'warning',
      });
    } else if (
      !['', null, undefined].includes(value.outlay as string) &&
      !/^[+-]?(\d|([0-9]\d+))(\.\d+)?$/.test(value.outlay as string)
    ) {
      atMessage({
        message: t('支出必须为数字'),
        type: 'warning',
      });
    } else if ((value.desc || '').length > 2000) {
      atMessage({
        message: t('备注字数不能超过2000个字符'),
        type: 'warning',
      });
    } else if (value.color && !/^#[0-9a-fA-F]{6}$/.test(value.color)) {
      atMessage({
        message: t('颜色必须是#后面跟6位16进制的数字'),
        type: 'warning',
      });
    } else {
      const fn = value._id ? patchItemAsync : postItemAsync;

      fn(Object.assign(value, tableId ? { tableId } : {}));
    }
  };

  useEffect(() => {
    if (id) {
      getRecordListAsync(
        Object.assign({ date: dateNum }, tableId ? { tableId } : {}),
      );
    }
  }, [dateNum, getRecordListAsync, id, tableId]);

  useDidShow(() => {
    getCategoryAsync();
  });

  useLoading(
    postCategoryLoading ||
    recordLoading ||
    getCategoryLoading ||
    patchUserLoading,
  );

  return (
    <View className={styles.container}>
      <AtMessage />
      <View className={styles.head}>
        <View>{getDate(dateString).title}</View>
      </View>
      <View className={styles.content}>
        <TagSelect
          tableId={tableId}
          title={t('快速选择名称')}
          className={styles.marginTop}
          options={categories.map((item) => ({
            ...item,
            label: item.name,
            value: item._id,
            disable: item.createdRole === ERoles.manager,
          }))}
          value={value.name}
          onClick={(v) => {
            setTimeout(() => {
              nameChange(v?.label);
              numChange(v?.num);
              incomeChange(v?.income);
              outlayChange(v?.outlay);
              if (v?.beginTime && v?.endTime) {
                timeChange(v.beginTime, 'beginTime');
                timeChange(v.endTime, 'endTime');
              } else {
                const ct = dayjs().format('HH:mm');

                timeChange(ct, 'beginTime');
                timeChange(ct, 'endTime');
              }
            }, 100);
          }}
        />
        <AtInput
          className={styles.input}
          name=""
          title={`${t('名称')}：`}
          type="text"
          placeholder={t('请输入')}
          value={value.name}
          onChange={nameChange}
        />
        {value.name &&
          !categories.find((v) => v.name.trim() === value.name?.trim()) && (
            <Switch
              title={`${t('记住名称')}：`}
              label={
                isNameSave ? t('保存到快速选择名称中') : t('不保存到快速选择名称中')
              }
              value={isNameSave}
              onChange={(v) => setTimeout(() => setIsNameSave(v), 100)}
            />
          )}
        <AtInput
          name=""
          title={`${t('数值')}：`}
          placeholder={t('请输入')}
          value={value.num as string}
          onChange={numChange}
        />
        <View className={styles.tips}>
          <View>{t('数值字段最终会表现在数据统计中。')}</View>
          <View>
            {t('您可以用它来表示任何值，如“体重、工时、存款、消费”等，数据统计中会展示趋势和累计总数。')}
          </View>
        </View>
        <AtInput
          name=""
          type="digit"
          title={`${t('收入')}：`}
          placeholder={t('请输入')}
          value={value.income as string}
          onChange={incomeChange}
        />
        <AtInput
          name=""
          type="digit"
          title={`${t('支出')}：`}
          placeholder={t('请输入')}
          value={value.outlay as string}
          onChange={outlayChange}
        />
        <Select
          title={`${t('开始日期')}：`}
          label={showDateLabel(value.beginDate)}
          value={value.beginDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => dateChange(v, 'beginDate')}
        />
        <Select
          title={`${t('开始时间')}：`}
          label={value.beginTime ?? ''}
          value={value.beginTime ?? ''}
          mode="time"
          onChange={({ detail: { value: v } }) => timeChange(v, 'beginTime')}
        />
        <Select
          title={`${t('结束日期')}：`}
          label={showDateLabel(value.endDate)}
          value={value.endDate?.split('/').join('-') ?? ''}
          mode="date"
          onChange={({ detail: { value: v } }) => dateChange(v, 'endDate')}
        />
        <Select
          title={`${t('结束时间')}：`}
          label={value.endTime ?? ''}
          value={value.endTime ?? ''}
          mode="time"
          onChange={({ detail: { value: v } }) => timeChange(v, 'endTime')}
        />
        <View className={styles.tips}>
          {t('开始日期、开始时间、结束日期、结束时间用于数据统计中计算累计时长。')}
        </View>
        <Select
          title={`${t('记录时间')}：`}
          label={value.time ?? ''}
          value={value.time ?? ''}
          mode="time"
          onChange={({ detail: { value: v } }) => timeChange(v, 'time')}
        />
        <ColorSelect
          value={value.color}
          onChange={colorChange}
          tips={t('如果快速选择名称中颜色与此颜色不同，优先使用快速选择名称内配置的颜色。')}
        />
        <AtTextarea
          className={styles.marginTop}
          value={value.desc ?? ''}
          placeholder={t('请输入备注')}
          maxLength={2000}
          height={200}
          onChange={descChange}
          count
        />
        <View className={styles.imgList}>
          <View className={styles.imgWrapper}>
            <View className={styles.add} onClick={addImg}>
              <Icon value="add" />
              {/* <View>{t('添加图片')}</View> */}
            </View>
          </View>
          {value.imgs?.map((item) => (
            <View key={item} className={styles.imgWrapper}>
              <Img
                className={styles.img}
                src={item}
                onDelete={() => deleteImg(item)}
              />
            </View>
          ))}
        </View>
        <View className={styles.tips}>
          {t('日历中长按日期方格可以直接跳转到该页面')}
        </View>
      </View>
      <View className={styles.footer}>
        <AtButton
          type="primary"
          onClick={onSubmit}
          loading={patchLoading || postLoading}
        >
          {t('保存')}
        </AtButton>
      </View>
    </View>
  );
};

export default Edit;
