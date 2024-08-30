import { CommonEventFunction, Picker, Text, View } from '@tarojs/components';
import { PickerDateProps } from '@tarojs/components/types/Picker';
import { navigateTo, reLaunch, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { AtInput } from 'taro-ui';

import Calendar, { CalendarType, WeekHeader } from '@/components/calendar';
import Icon from '@/components/icon';
import Mask from '@/components/mask';
import { Pages } from '@/constant';
import { getCategory } from '@/services/categorie';
import { getList } from '@/services/collaborationRecord';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
  useTouch,
} from '@/utils/hooks';

import MenuButton from '../menuButton';
import styles from './index.module.less';

const genCalendarLabel = (): Record<CalendarType, string> => ({
  month: t('月视图'),
  year: t('年视图'),
});

const CollaborationTablePage: FC<{ tableId: string }> = ({ tableId }) => {
  const calendarLabel = genCalendarLabel();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.app);
  const [search, setSearch] = useState('');
  const [menuButtonOpen, setMenuButtonOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(dayjs().format('YYYY/MM'));
  const [calendarType, setCalendarType] = useState<CalendarType>('month');
  const [pY, pM] = pickerValue.split('/').map(Number);

  const { run: patchUserAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
        setTimeout(() => {
          reLaunch({ url: Pages.homePage });
        }, 200);
      },
    }
  );

  const {
    data: categories = [],
    loading: getCategoryLoading,
    run: getCategoryAsync,
  } = useRequest(() => getCategory(tableId), {
    manual: true,
  });

  const {
    data: list = [],
    run: getListAsync,
    loading,
  } = useRequest(
    (req: Omit<Parameters<typeof getList>[0], 'tableId'>) =>
      getList({ ...req, tableId: tableId }),
    {
      manual: true,
    }
  );

  const getData = useCallback(() => {
    const queryDay = dayjs(`${pY}-${pM}`);

    if (calendarType === 'year') {
      getListAsync({
        startDate: +queryDay.startOf('year').format('YYYYMMDD'),
        endDate: +queryDay.endOf('year').format('YYYYMMDD'),
      });
    } else {
      getListAsync({
        startDate: +queryDay.startOf('month').format('YYYYMMDD'),
        endDate: +queryDay.endOf('month').format('YYYYMMDD'),
      });
    }
  }, [calendarType, getListAsync, pM, pY]);

  const pickChange: CommonEventFunction<PickerDateProps.ChangeEventDetail> = (
    e
  ) => {
    const [y, m = pM] = e.detail.value.split('-');

    setPickerValue(`${y}/${m}`);
  };

  const changeDate = (type: 'add' | 'subtract') => {
    if (type === 'add') {
      setPickerValue(dayjs(pickerValue).add(1, calendarType).format('YYYY/MM'));
    } else {
      setPickerValue(
        dayjs(pickerValue).subtract(1, calendarType).format('YYYY/MM')
      );
    }
  };

  const onDayClick = (y: number, m: number, d: number) => {
    const date = dayjs([y, m, d].join('/'));

    navigateTo({
      url: `${Pages.attendanceListPage}?dateString=${date.format(
        'YYYY/MM/DD'
      )}&tableId=${tableId}`,
    });
  };

  const onLongPress = (y: number, m: number, d: number) => {
    const date = dayjs([y, m, d].join('/'));

    navigateTo({
      url: `${Pages.attendanceEditPage}?dateString=${date.format(
        'YYYY/MM/DD'
      )}&tableId=${tableId}`,
    });
  };

  const goPeoplePage = () => {
    navigateTo({
      url: `${Pages.collaborationPeoplePage}?tableId=${tableId}`,
    });
  };

  const goStatisticsPage = () => {
    navigateTo({
      url: `${Pages.homeStatisticsPage}?type=${calendarType}&year=${pY}&month=${pM}&tableId=${tableId}`,
    });
  };

  const onBackToday = () => {
    setPickerValue(dayjs().format('YYYY/MM'));
  };

  const [onTouch] = useTouch((v) => {
    if (v === 'left' || v === 'right') {
      changeDate(v === 'right' ? 'subtract' : 'add');
    }
  });

  const fixedHome = () => {
    if (userInfo?.activeTableId !== tableId) {
      patchUserAsync({ ...userInfo, activeTableId: tableId });
    } else {
      patchUserAsync({ ...userInfo, activeTableId: '' });
    }
  };

  const init = useCallback(() => {
    if (tableId) {
      setSearch('');
      getCategoryAsync();
      getData();
    }
  }, [getCategoryAsync, getData, tableId]);

  useEffect(() => {
    init();
  }, [init]);

  useDidShow(() => {
    init();
  });

  useLoading(loading || getCategoryLoading || patchUserLoading);

  return (
    <>
      <Mask />
      <View className={styles.header}>
        <View className={styles.operate}>
          <Picker
            className={styles.typeSwitch}
            mode="selector"
            range={Object.values(calendarLabel)}
            value={Object.keys(calendarLabel).indexOf(calendarType)}
            onChange={(e) =>
              setCalendarType(Object.keys(calendarLabel)[e.detail.value])
            }
          >
            <Text className={styles.text}>{calendarLabel[calendarType]}</Text>
            <Icon value="bullet-list" size={18} className={styles.icon} />
          </Picker>
          <View className={styles.dateSwitch}>
            <Icon
              value="prev"
              className={styles.button}
              onClick={() => changeDate('subtract')}
            />
            <Picker
              mode="date"
              fields={calendarType}
              value={pickerValue.split('/').join('-')}
              onChange={pickChange}
            >
              <View className={styles.date}>
                {i18next.language === 'zh' ? `${pY} 年 ${calendarType === 'month' ? ` ${pM} 月` : ''}` : `${calendarType === 'month' ? `${pM} / ${pY} ` : pY}`}
              </View>
            </Picker>
            <Icon
              value="next"
              className={styles.button}
              onClick={() => changeDate('add')}
            />
            {pickerValue !== dayjs().format('YYYY/MM') && (
              <Icon
                type="jujiao"
                className={styles.button}
                onClick={onBackToday}
              />
            )}
          </View>
        </View>
        <WeekHeader />
      </View>
      <Calendar
        className={styles.calendar}
        type={calendarType}
        year={pY}
        month={pM}
        list={list.filter((v) => v.name.includes(search.trim()))}
        categories={categories}
        onDayClick={onDayClick}
        onLongPress={onLongPress}
        onTouch={onTouch}
        searchValue={search}
      />

      <View className={styles.footerContent}>
        <View className={styles.action}>
          <View className={styles.bt} onClick={() => setMenuButtonOpen(true)}>
            {t('扩展功能 >>')}
          </View>
        </View>

        <MenuButton
          isOpened={menuButtonOpen}
          setOpened={setMenuButtonOpen}
          list={[
            { label: t('成员管理'), onClick: goPeoplePage },
            {
              label: userInfo?.activeTableId === tableId
                ? t('取消首页替换')
                : t('替换到首页'),
              onClick: fixedHome
            },
            {
              label: t('概览'), onClick: () => {
                navigateTo({
                  url: `${Pages.timelinePage}?dateString=${dayjs(
                    `${pY}-${pM}`
                  ).format('YYYY/MM/DD')}&tableId=${tableId}`,
                });
              }
            },
            { label: t('数据统计'), onClick: goStatisticsPage },
          ]}
        />
      </View>
      <AtInput
        className={styles.search}
        name=""
        title={`${t('查找名称')}：`}
        type="text"
        placeholder={t('请输入')}
        value={search}
        onChange={(v) => setSearch(v as string)}
        clear
      />
    </>
  );
};

export default CollaborationTablePage;
