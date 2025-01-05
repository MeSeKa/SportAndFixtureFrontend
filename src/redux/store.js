// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import statusReducer from './statusSlice';
import teamsReducer from './teamsSlice';

const store = configureStore({
  reducer: {
    status: statusReducer,
    teams: teamsReducer,
  },
});

export default store;
