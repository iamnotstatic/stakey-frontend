import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import interactionReducer from './interactions';

const reducer = combineReducers({
  intraction: interactionReducer,
});
const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
