import { Text, View } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { t } from 'i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { AtProgress } from 'taro-ui';
import { HomeRecord } from 'types';

import Action from '@/components/action';
import { deleteItem, getList } from '@/services/plan';
import { useRequest } from '@/utils/hooks';

import styles from './index.module.less';

interface Props {
  attendanceList: HomeRecord[];
  dateString: string;
}

const PlanList: FC<Props> = ({ dateString, attendanceList }) => {
  const [deleteInfo, setDeleteInfo] = useState({
    isOpened: false,
    id: '',
    name: '',
  });
  const { data: list = [], run: getListAsync } = useRequest(getList, {
    manual: true,
  });

  const getData = useCallback(() => {
    getListAsync({ date: dayjs(dateString).format('YYYYMM') });
  }, [dateString, getListAsync]);

  const { run: deleteAsync } = useRequest(deleteItem, {
    manual: true,
    onSuccess: () => {
      setDeleteInfo({
        isOpened: false,
        id: '',
        name: '',
      });
      getData();
    },
  });

  useEffect(() => {
    getData();
  }, [getData]);

  useDidShow(() => {
    getData();
  });

  return (
    list.length > 0 && (
      <>
        <View className={styles.table}>
          {list.map(({ name, num: count, _id: id }) => {
            const len = Math.min(
              attendanceList.filter((v) => v.name === name).length,
              +count,
            );
            const percent = +((len / +count) * 100).toFixed(0);

            return (
              <View
                className={styles.tr}
                key={id}
                onClick={() =>
                  setDeleteInfo({
                    isOpened: true,
                    id,
                    name,
                  })
                }
              >
                <View className={classNames(styles.td)}>
                  <Text className={styles.count}>
                    {attendanceList.filter((v) => v.name === name).length}/
                    {count}
                  </Text>
                </View>
                <View className={classNames(styles.td, styles.name)}>
                  {name}
                </View>
                <View className={classNames(styles.td, styles.full)}>
                  <AtProgress
                    percent={percent}
                    status={percent >= 100 ? 'success' : 'progress'}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Action
          preTitle={t('计划名称')}
          title={deleteInfo.name}
          isOpened={deleteInfo.isOpened}
          onClose={() => setDeleteInfo({ isOpened: false, id: '', name: '' })}
          onDelete={() => deleteAsync(deleteInfo.id)}
        />
      </>
    )
  );
};

export default PlanList;
