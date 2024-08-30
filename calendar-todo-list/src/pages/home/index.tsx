import {
  Button,
  CommonEventFunction,
  Picker,
  Text,
  View,
} from '@tarojs/components';
import { PickerDateProps } from '@tarojs/components/types/Picker';
import { navigateTo, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { AtMessage } from 'taro-ui';

import Calendar, { CalendarType, WeekHeader } from '@/components/calendar';
import Icon from '@/components/icon';
import Mask from '@/components/mask';
import MenuButton from '@/components/menuButton';
import Modal from '@/components/modal';
import { Pages } from '@/constant';
import { getList } from '@/services/attendance';
import { getCategory } from '@/services/categorie';
import { getList as getAnnouncement } from '@/services/publicData';
import { patchUser } from '@/services/user';
import { getUserInfo } from '@/store/app';
import {
  useAppDispatch,
  useAppSelector,
  useLoading,
  useRequest,
  useTouch,
} from '@/utils/hooks';

import styles from './index.module.less';
import MemoList from './memoList';
import PlanList from './planList';

const genCalendarLabel = (): Record<CalendarType, string> => ({
  month: t('月视图'),
  year: t('年视图'),
});

const Home = () => {
  const calendarLabel = genCalendarLabel();
  const { userInfo } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [menuButtonOpen, setMenuButtonOpen] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false); // 便器开启时隐藏数据，解决texearea卡顿问题
  const [pickerValue, setPickerValue] = useState(dayjs().format('YYYY/MM'));
  const [calendarType, setCalendarType] = useState<CalendarType>('month');
  const [pY, pM] = pickerValue.split('/').map(Number);

  const { run: patchUserAsync, loading: patchUserLoading } = useRequest(
    patchUser,
    {
      manual: true,
      onSuccess: () => {
        dispatch(getUserInfo());
      },
    }
  );

  const { data: announcement, run: getAnnouncementAsync } = useRequest(
    () => getAnnouncement('announcement'),
    {
      manual: true,
    }
  );

  const {
    data: categories = [],
    loading: getCategoryLoading,
    run: getCategoryAsync,
  } = useRequest(getCategory, { manual: true });

  const {
    data: list = [],
    run: getListAsync,
    loading,
  } = useRequest(getList, {
    manual: true,
  });

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
      )}`,
    });
  };

  const onLongPress = (y: number, m: number, d: number) => {
    const date = dayjs([y, m, d].join('/'));

    navigateTo({
      url: `${Pages.attendanceEditPage}?dateString=${date.format(
        'YYYY/MM/DD'
      )}`,
    });
  };

  const addMonthPlan = () => {
    navigateTo({
      url: `${Pages.homePlanEditPage}?dateString=${dayjs(`${pY}-${pM}`).format(
        'YYYY/MM/DD'
      )}`,
    });
  };

  const goStatisticsPage = () => {
    navigateTo({
      url: `${Pages.homeStatisticsPage}?type=${calendarType}&year=${pY}&month=${pM}`,
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

  const init = useCallback(() => {
    getAnnouncementAsync();
    getData();
    getCategoryAsync();
  }, [getAnnouncementAsync, getCategoryAsync, getData]);

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
      <AtMessage />
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
        list={memoOpen ? [] : list}
        categories={categories}
        onDayClick={onDayClick}
        onLongPress={onLongPress}
        onTouch={onTouch}
        physiology={
          userInfo?.physiology?.status ? userInfo?.physiology?.data : undefined
        }
      />
      <View className={styles.footerContent}>
        <View className={styles.action}>
          <View className={styles.bt} onClick={() => setMenuButtonOpen(true)}>
            {t('扩展功能 >>')}
          </View>
        </View>
        {calendarType === 'month' && !memoOpen && (
          <PlanList
            dateString={dayjs(`${pY}-${pM}`).format('YYYY/MM/DD')}
            attendanceList={list}
          />
        )}
        <MemoList
          modalOpen={memoOpen}
          setModalOpen={setMemoOpen}
        />
        <MenuButton
          isOpened={menuButtonOpen}
          setOpened={setMenuButtonOpen}
          list={[
            { label: t('添加月计划'), onClick: addMonthPlan, hidden: calendarType !== 'month' },
            {
              label: t('概览'),
              onClick: () => {
                navigateTo({
                  url: `${Pages.timelinePage}?dateString=${dayjs(
                    `${pY}-${pM}`
                  ).format('YYYY/MM/DD')}`,
                });
              }
            },
            { label: t('数据统计'), onClick: goStatisticsPage },
            { label: t('添加便签'), onClick: () => setMemoOpen(true) },
          ]}
        />
      </View>
      {announcement && (
        <Modal
          isOpened={Boolean(
            userInfo && userInfo?.announcementId !== announcement?._id
          )}
          footer={
            <Button
              onClick={() => {
                patchUserAsync({
                  ...userInfo,
                  announcementId: announcement._id,
                });
              }}
            >
              {t('确定')}
            </Button>
          }
        >
          {announcement?.data[0].name && (
            <View className={styles.modalTitle}>
              {announcement?.data[0].name}
            </View>
          )}
          <View className={styles.modalContent}>
            {announcement?.data[0].desc || t('暂无')}
          </View>
        </Modal>
      )}
    </>
  );
};

export default Home;
