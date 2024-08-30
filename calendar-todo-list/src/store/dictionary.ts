import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { flattenDepth } from 'lodash';
import { ShareAttendanceMap } from 'types';

import * as holidayService from '@/services/holiday';
import * as shareAttendanceMapService from '@/services/shareAttendanceMap';

interface ModalState {
  loading: boolean;
  shareAttendanceMaps: ShareAttendanceMap[];
  holidays: { name: string; date: string; type: number }[];
}
declare module 'react-redux' {
  interface DefaultRootState {
    dictionary: ModalState;
  }
}

export const initialState: ModalState = {
  loading: false,
  shareAttendanceMaps: [],
  holidays: [],
};

export const getShareAttendanceMap = createAsyncThunk(
  'dictionary/getShareAttendanceMap',
  async (_, thunkAPI) => {
    thunkAPI.dispatch({
      type: 'dictionary/setLoading',
      payload: { loading: true },
    });
    return await shareAttendanceMapService.getList();
  },
);

export const getHolidayList = createAsyncThunk(
  'dictionary/getHolidayList',
  async (_, thunkAPI) => {
    thunkAPI.dispatch({
      type: 'dictionary/setLoading',
      payload: { loading: true },
    });
    const list = await holidayService.getList();

    return flattenDepth(
      list.map((v) => {
        const days: ModalState['holidays'] = [];

        for (let i = 0; i < v.days; i++) {
          days.push({
            date: dayjs(v.date).add(i, 'day').format('YYYY/MM/DD'),
            name: v.subName ?? v.name.slice(0, 4),
            type: 1,
          });
        }
        v.workDays?.forEach((work) => {
          days.push({
            date: dayjs(work).format('YYYY/MM/DD'),
            name: '班',
            type: 0,
          });
        });
        return days;
      }),
    );
  },
);

const slice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Partial<ModalState>>) => {
      state.loading = action.payload.loading || false;
    },
    clear: (state) => {
      state.shareAttendanceMaps = initialState.shareAttendanceMaps;
      state.loading = initialState.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShareAttendanceMap.fulfilled, (state, action) => {
        state.shareAttendanceMaps = action.payload;
        state.loading = false;
      })
      .addCase(getShareAttendanceMap.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getHolidayList.fulfilled, (state, action) => {
        state.holidays = action.payload;
        state.loading = false;
      })
      .addCase(getHolidayList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default slice;
