import { CommonEventFunction } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useUnload } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

import { logError } from './common';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type Service<TData, TParams extends any[]> = (
  ...args: TParams
) => Promise<TData | undefined>;

export const useDeviceInfo = (): [
  Taro.getSystemInfoSync.Result,
  React.Dispatch<
    React.SetStateAction<Taro.getSystemInfoSync.Result | undefined>
  >,
] => {
  const ref = useRef<Taro.getSystemInfoSync.Result>();

  if (!ref.current) {
    ref.current = Taro.getSystemInfoSync();
  }
  const [info, setInfo] = useState<Taro.getSystemInfoSync.Result>(ref.current);

  return [info, setInfo];
};

export const useTouch = (
  fun: (t: 'left' | 'right' | 'up' | 'down') => void,
): [CommonEventFunction] => {
  const touchRef = useRef({ status: false, start: [0, 0], end: [0, 0] });
  const onTouch: CommonEventFunction = (e: any) => {
    const { type, touches } = e;

    if (type === 'touchstart') {
      touchRef.current.start = [touches[0].clientX, touches[0].clientY];
    }
    if (type === 'touchmove') {
      touchRef.current.status = true;
      touchRef.current.end = [touches[0].clientX, touches[0].clientY];
    }
    if (type === 'touchend') {
      const moveXDis = Math.abs(
        touchRef.current.start[0] - touchRef.current.end[0],
      );
      const moveYDis = Math.abs(
        touchRef.current.start[1] - touchRef.current.end[1],
      );

      if (moveXDis > 50 && moveYDis < 100 && touchRef.current.status) {
        fun(
          touchRef.current.start[0] < touchRef.current.end[0]
            ? 'right'
            : 'left',
        );
      } else if (moveYDis > 50 && moveXDis < 100 && touchRef.current.status) {
        fun(
          touchRef.current.start[1] > touchRef.current.end[1] ? 'up' : 'down',
        );
      }
      touchRef.current.status = false;
      touchRef.current.start = [0, 0];
      touchRef.current.end = [0, 0];
    }
  };

  return [onTouch];
};

export const useLoading = (loading?: boolean) => {
  return;
  const isUnloadRef = useRef(false);

  useEffect(() => {
    if (loading && !isUnloadRef.current) {
      Taro.showLoading({
        title: '加载中',
        mask: true,
      });
    } else {
      Taro.hideLoading();
    }
  }, [loading]);
  useLoad(() => {
    isUnloadRef.current = false;
  });
  useDidShow(() => {
    isUnloadRef.current = false;
  });
  useUnload(() => {
    isUnloadRef.current = true;
  });
  useDidHide(() => {
    isUnloadRef.current = true;
  });
};

export const useRequest = <TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  opts?: {
    manual?: boolean;
    onError?: (err: string) => void;
    onSuccess?: (data?: TData, params?: TParams) => void;
  },
) => {
  const ref = useRef<Service<TData, TParams>>();
  const runRef = useRef<
    (...args: TParams) => ReturnType<typeof service> | void
  >((...args: TParams) => {
    ref.current?.(...args);
  }); // 使用两层引用保证redux更新后onSuccess里面的值跟随变化，同时保证防止run函数变化引起重复渲染
  const [value, setValue] = useState<{
    data?: TData;
    executed: boolean;
    loading: boolean;
  }>({ executed: false, loading: false });

  ref.current = async (...args: TParams) => {
    setValue((prev) => ({ ...prev, loading: true, executed: true }));
    try {
      const sourceData = await service(...args);
      const data = sourceData;

      setValue((prev) => ({ ...prev, loading: false, data }));
      opts?.onSuccess?.(data, args);
      return data;
    } catch (err) {
      setValue((prev) => ({ ...prev, loading: false }));
      if (opts?.onError) {
        opts.onError(err);
      } else {
        logError(err);
        return undefined;
      }
    }
  };

  if (!opts?.manual && !value?.executed) {
    const args: any[] = [];

    ref.current(...(args as TParams));
  }

  return {
    run: runRef.current,
    data: value?.data,
    loading: value.loading,
  };
};
