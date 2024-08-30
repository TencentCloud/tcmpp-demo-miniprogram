import { CommonEventFunction, Picker, Text, View } from '@tarojs/components';
import { PickerDateProps } from '@tarojs/components/types/Picker';
import { navigateTo, useDidShow } from '@tarojs/taro';
import dayjs from 'dayjs';
import i18next, { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Schedule as ISchedule } from 'types';

import Action from '@/components/action';
import Empty from '@/components/empty';
import Icon from '@/components/icon';
import Mask from '@/components/mask';
import Modal from '@/components/modal';
import { Pages } from '@/constant';
import { postItem as attendancePostItem } from '@/services/attendance';
import { deleteItem, getList, patchItem } from '@/services/schedule';
import { getDateFormat } from '@/utils/common';
import { useLoading, useRequest, useTouch } from '@/utils/hooks';

import Calendar, { WeekHeader } from './calendar';
import Card from './card';
import styles from './index.module.less';

const groupScheduleList = (arr: ISchedule[]) => {
  const after: ISchedule[] = [];
  const before: ISchedule[] = [];
  const cTime = dayjs().valueOf();

  arr
    .sort((x, y) => y.time - x.time)
    .forEach((item) => {
      if (item.time < cTime) {
        before.push(item);
      } else {
        after.push(item);
      }
    });
  return [before, after];
};

const Schedule = () => {
  const didMount = useRef({ list: false, calendarList: false });
  const [pickerValue, setPickerValue] = useState(dayjs().format('YYYY/MM'));
  const [pY, pM] = pickerValue.split('/').map(Number);
  const [seletedDate, setSeletedDate] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState<Partial<ISchedule>>(); // 完成事件后的弹窗提示
  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { run: attendancePostItemAsync, loading: attendancePostItemLoading } =
    useRequest(attendancePostItem, {
      manual: true,
      onSuccess: () => {
        setModalOpen(undefined);
      },
    });
  const {
    data: list = [],
    loading,
    run,
  } = useRequest(getList, { manual: true });
  const { data: calendarList = [], run: calendarRun } = useRequest(getList, {
    manual: true,
  });

  const { run: patchItemAsync, loading: patchLoading } = useRequest(patchItem, {
    manual: true,
    onSuccess: (v, req) => {
      getListAsync();
      if (req && req[0].finish) {
        setModalOpen(req[0]);
      }
    },
  });

  const { run: deleteAsync, loading: deleteLoading } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      getListAsync();
      if (list.length === 1) {
        getCalenDarListAsync();
      }
    },
  });

  const getListAsync = useCallback(() => {
    run({ date: +seletedDate.format('YYYYMMDD') });
  }, [run, seletedDate]);

  const getCalenDarListAsync = useCallback(() => {
    const queryDay = dayjs(`${pY}-${pM}`);

    calendarRun({
      startDate: +queryDay.startOf('month').format('YYYYMMDD'),
      endDate: +queryDay.endOf('month').format('YYYYMMDD'),
    });
  }, [calendarRun, pM, pY]);

  const pickChange: CommonEventFunction<PickerDateProps.ChangeEventDetail> = (
    e,
  ) => {
    const [y, m = pM] = e.detail.value.split('-');

    setPickerValue(`${y}/${m}`);
  };

  const changeDate = (type: 'add' | 'subtract') => {
    if (type === 'add') {
      setPickerValue(dayjs(pickerValue).add(1, 'month').format('YYYY/MM'));
    } else {
      setPickerValue(dayjs(pickerValue).subtract(1, 'month').format('YYYY/MM'));
    }
  };

  const onEdit = () => {
    navigateTo({
      url: `${Pages.scheduleEditPage}?dateString=${seletedDate?.format(
        'YYYY/MM/DD',
      )}&id=${deleteInfo.id}`,
    });
    setDeleteInfo({ isOpened: false, id: '', name: '' });
  };

  const addRecord = () => {
    navigateTo({
      url: `${Pages.scheduleEditPage}?dateString=${seletedDate?.format(
        'YYYY/MM/DD',
      )}`,
    });
  };

  const onAttendanceOk = () => {
    if (modalOpen) {
      const { desc, date, title } = modalOpen;

      attendancePostItemAsync({
        name: title,
        desc,
        date,
        imgs: [],
        time: dayjs().format('HH:mm'),
        beginDate: dayjs(date).format('YYYY/MM/DD'),
        beginTime: dayjs().format('HH:mm'),
        endDate: dayjs(date).format('YYYY/MM/DD'),
        endTime: dayjs().format('HH:mm'),
      });
    }
  };

  const onBackToday = () => {
    setPickerValue(dayjs().format('YYYY/MM'));
    setSeletedDate(dayjs());
  };

  useDidShow(() => {
    getListAsync();
    getCalenDarListAsync();
  });

  useEffect(() => {
    setPickerValue(seletedDate.format('YYYY/MM'));
  }, [seletedDate]);

  useEffect(() => {
    if (didMount.current.list) {
      getListAsync();
    } else {
      didMount.current.list = true;
    }
  }, [getListAsync]);

  useEffect(() => {
    if (didMount.current.calendarList) {
      getCalenDarListAsync();
    } else {
      didMount.current.calendarList = true;
    }
  }, [getCalenDarListAsync]);

  useLoading(
    loading || patchLoading || deleteLoading || attendancePostItemLoading,
  );
  const [preList, nextList] = groupScheduleList(list);

  const disBackToday =
    pickerValue === dayjs().format('YYYY/MM') &&
    dayjs().isSame(seletedDate, 'day');

  const [onTouch] = useTouch((v) => {
    // if (v === 'up' || v === 'down') {
    //  setCalendarOpen(v === 'down');
    // }
    if (v === 'left' || v === 'right') {
      setSeletedDate((prev) =>
        v === 'right' ? prev.subtract(1, 'day') : prev.add(1, 'day'),
      );
    }
  });
  const [onHeaderTouch] = useTouch((v) => {
    if (v === 'up' || v === 'down') {
      setCalendarOpen(v === 'down');
    }
    if (v === 'left' || v === 'right') {
      changeDate(v === 'right' ? 'subtract' : 'add');
    }
  });

  return (
    <>
      <Mask />
      <View className={styles.container}>
        <View
          className={styles.header}
          onTouchEnd={onHeaderTouch}
          onTouchStart={onHeaderTouch}
          onTouchMove={onHeaderTouch}
        >
          <View className={styles.operate}>
            <View
              className={styles.typeSwitch}
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              <Text className={styles.text}>
                {calendarOpen ? t('收起') : t('展开')}
              </Text>
              <Icon
                value={calendarOpen ? 'chevron-up' : 'chevron-down'}
                size={14}
                className={styles.icon}
              />
            </View>
            <View className={styles.dateSwitch}>
              <Icon
                value="prev"
                className={styles.button}
                onClick={() => changeDate('subtract')}
              />
              <Picker
                mode="date"
                fields="month"
                value={pickerValue.split('/').join('-')}
                onChange={pickChange}
              >
                <View className={styles.date}>{i18next.language === 'zh' ? `${pY} ${t('年')} ${pM} ${t('月')}` : `${pM} / ${pY}`}</View>
              </Picker>
              <Icon
                value="next"
                className={styles.button}
                onClick={() => changeDate('add')}
              />
            </View>
          </View>
          <WeekHeader />
          <Calendar
            year={pY}
            month={pM}
            open={calendarOpen}
            seletedDate={seletedDate}
            setSeletedDate={setSeletedDate}
            list={calendarList}
          />
        </View>
        <View
          className={styles.content}
          onTouchEnd={onTouch}
          onTouchStart={onTouch}
          onTouchMove={onTouch}
        >
          <View className={styles.title}>
            <View className={styles.fc}>
              {`${t('当前操作日期')}：${seletedDate?.format(getDateFormat())}`}
            </View>
            {disBackToday ? (
              <View />
            ) : (
              <View onClick={onBackToday} className={styles.fc}>
                {t('回到今日')}
                <Icon type="jujiao" size={18} className={styles.backNow} />
              </View>
            )}
          </View>
          {nextList
            .sort((a, b) => (dayjs(a.time).isBefore(b.time) ? -1 : 1))
            .map((item) => (
              <Card
                key={item._id}
                value={item}
                onChange={patchItemAsync}
                onDelete={(v) => {
                  setDeleteInfo({
                    isOpened: true,
                    id: v._id,
                    name: v.title,
                  });
                }}
              />
            ))}
          {preList.map((item) => (
            <Card
              isOverdue
              key={item._id}
              value={item}
              onChange={patchItemAsync}
              onDelete={(v) => {
                setDeleteInfo({
                  isOpened: true,
                  id: v._id,
                  name: v.title,
                });
              }}
            />
          ))}
          {!list.length && <Empty className={styles.empty} />}
          <View className={styles.footer}>
            <View className={styles.add} onClick={addRecord}>
              <Icon value="add" />
            </View>
          </View>
        </View>
        <Action
          preTitle={t('事件')}
          title={deleteInfo.name}
          isOpened={deleteInfo.isOpened}
          onClose={() => setDeleteInfo({ isOpened: false, id: '', name: '' })}
          onDelete={() => deleteAsync(deleteInfo.id)}
          options={[{ name: t('编辑'), fn: onEdit }]}
        />
        <Modal
          title={t('操作提示')}
          isOpened={Boolean(modalOpen)}
          onCancel={() => setModalOpen(undefined)}
          onOk={onAttendanceOk}
        >
          <View className={styles.modalContent}>
            {t('是否将该事件添加到打卡视图中')}
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Schedule;
