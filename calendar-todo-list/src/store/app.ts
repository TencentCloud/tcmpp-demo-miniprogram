import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Taro from '@tarojs/taro';
import { UserInfo } from 'types';

import * as userService from '@/services/user';

interface ModalState {
  loading: boolean;
  userInfo?: UserInfo;
}
declare module 'react-redux' {
  interface DefaultRootState {
    app: ModalState;
  }
}

export const initialState: ModalState = {
  loading: false,
  userInfo: undefined,
};

export const getUserInfo = createAsyncThunk(
  'app/getUserInfo',
  async (_, thunkAPI) => {
    thunkAPI.dispatch({ type: 'app/setLoading', payload: { loading: true } });
    return await userService.getUser();
  },
);

export const checkUser = createAsyncThunk(
  'app/checkUser',
  async (params: Parameters<typeof userService.login>[number], thunkAPI) => {
    thunkAPI.dispatch({ type: 'app/setLoading', payload: { loading: true } });
    return await userService.login(params);
  },
);

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Partial<ModalState>>) => {
      state.loading = action.payload.loading || false;
    },
    clear: (state) => {
      state.userInfo = initialState.userInfo;
      state.loading = initialState.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.loading = false;
        Taro.setStorage({ key: 'token', data: action.payload.token });
      })
      .addCase(checkUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default slice;
