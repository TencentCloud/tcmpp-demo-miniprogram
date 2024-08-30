import { Image, Text, View } from '@tarojs/components';
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import huanSrc from '@/assets/images/huan.png';
import voiceReady1 from '@/assets/voice/1.mp3';
import voiceReady2 from '@/assets/voice/2.mp3';
import voiceReady3 from '@/assets/voice/3.mp3';
import voiceDo from '@/assets/voice/do.mp3';
import voiceReady from '@/assets/voice/ready.mp3';
import voiceRest from '@/assets/voice/rest.mp3';
import voiceStart from '@/assets/voice/start.mp3';
import voiceStop from '@/assets/voice/stop.mp3';
import Icon from '@/components/icon';
import { getGroupList } from '@/services/exercise';
import { useLoading, useRequest } from '@/utils/hooks';

import styles from './index.module.less';

enum EStatus {
  'play' = 'play',
  'paused' = 'paused',
  'stop' = 'stop',
}

interface TaskQueue {
  taskIndex: number;
  taskName: string;
  v: number | string;
  voiceUrl?: string;
}

const ExerciseExec = () => {
  const { id } = getCurrentInstance().router?.params || {};
  const [taskQueue, setTaskQueue] = useState<TaskQueue[]>([]);
  const [segment, setSegment] = useState({
    index: 0,
    status: EStatus.stop,
  });

  const value = useMemo(
    () => taskQueue[segment.index] || {},
    [segment.index, taskQueue],
  );

  const {
    data: groupList = [],
    loading,
    run,
  } = useRequest(getGroupList, { manual: true });

  const list = useMemo(
    () => groupList.find((item) => item._id === id)?.planList || [],
    [groupList, id],
  );

  const playVoice = (url: string) => {
    const innerAudioContext = Taro.createInnerAudioContext();

    innerAudioContext.obeyMuteSwitch = false;
    Taro.setInnerAudioOption({ obeyMuteSwitch: false });
    innerAudioContext.loop = false;
    innerAudioContext.autoplay = true;
    innerAudioContext.src = url;
    innerAudioContext.onPlay(() => { });
  };

  const execTask = useCallback(() => {
    setTimeout(() => {
      setSegment((prev) => {
        if (prev.index === taskQueue.length || prev.status === EStatus.stop) {
          return { status: EStatus.stop, index: 0 };
        } else if (prev.status === EStatus.paused) {
          return prev;
        } else {
          execTask();
          return { ...prev, index: prev.index + 1 };
        }
      });
    }, 1000);
  }, [taskQueue.length]);

  useEffect(() => {
    const readyUrl = {
      0: '', // 防止进入时自动播放声音
      1: voiceReady,
      // 2: voiceReady5,
      // 3: voiceReady4,
      2: voiceReady3,
      3: voiceReady2,
      4: voiceReady1,
      5: voiceStart,
    };
    const taskList: TaskQueue[] = [];

    list.forEach((itemTemp, index) => {
      const item = {
        ...itemTemp,
        restTime: Number(itemTemp.restTime || 0),
        count: Number(itemTemp.count || 0),
        stepTime: Number(itemTemp.stepTime || 0),
      };
      // 准备词

      [...Array(6).keys()].forEach((v) => {
        taskList.push({
          taskIndex: index + 1,
          taskName: item.name,
          v:
            {
              '0': t('准备'),
              '1': t('准备'),
              '5': t('开始'),
            }[v] || 5 - v,
          voiceUrl: readyUrl[v],
        });
      });
      // 任务拆解为秒
      [...Array(item.count).keys()].forEach((v) => {
        [...Array(item.stepTime).keys()].forEach((i) => {
          taskList.push({
            taskIndex: index + 1,
            taskName: `${item.name} ${item.count} 次`,
            v: v + 1,
            voiceUrl: i === 0 ? voiceDo : '',
          });
        });
      });
      // 休息拆解为秒
      taskList.push({
        taskIndex: index + 1,
        taskName: t('休息'),
        v: t('休息'),
        voiceUrl: voiceStop,
      });
      [...Array(item.restTime).keys()].forEach((v) => {
        taskList.push({
          taskIndex: index + 1,
          taskName: t('休息 {{restTime}} 秒', { restTime: item.restTime }),
          v: item.restTime - v,
          voiceUrl: voiceRest,
        });
      });
    });
    setTaskQueue(taskList);
  }, [list]);

  useEffect(() => {
    if (segment.status === EStatus.play) {
      execTask();
    }
  }, [execTask, segment.status]);

  useEffect(() => {
    if (value.voiceUrl) {
      playVoice(value.voiceUrl);
    }
  }, [value]);

  useDidShow(() => {
    run();
  });

  useLoading(loading);

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        {groupList.find((item) => item._id === id)?.name}
      </View>
      <View className={styles.title}>
        {t('共 {{listLen}} 组任务 / 第 {{taskIndex}} 组', { listLen: list.length, taskIndex: value?.taskIndex })}
      </View>
      <View className={styles.ballWrapper}>
        <View className={styles.ball}>
          <Image src={huanSrc} className={styles.img} />
          <Text>{value?.v}</Text>
        </View>
      </View>
      <View className={styles.action}>
        {[EStatus.paused, EStatus.play].includes(segment.status) && (
          <Icon
            size={32}
            value="stop"
            className={styles.icon}
            onClick={() => {
              setSegment({ index: 0, status: EStatus.stop });
            }}
          />
        )}
        {[EStatus.play].includes(segment.status) && (
          <Icon
            size={32}
            value="pause"
            className={styles.icon}
            onClick={() => {
              setSegment((prev) => ({ ...prev, status: EStatus.paused }));
            }}
          />
        )}
        {[EStatus.stop, EStatus.paused].includes(segment.status) && (
          <Icon
            size={32}
            value="play"
            className={classNames(styles.icon, styles.play)}
            onClick={() => {
              setSegment((prev) => ({ ...prev, status: EStatus.play }));
            }}
          />
        )}
      </View>

      <View className={styles.taskName}>{value?.taskName}</View>
    </View>
  );
};

export default ExerciseExec;
