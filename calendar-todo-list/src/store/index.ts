import { configureStore } from '@reduxjs/toolkit';

import appSlice from './app';
import dictSlice from './dictionary';

const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [dictSlice.name]: dictSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
