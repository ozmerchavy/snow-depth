import { configureStore } from '@reduxjs/toolkit';
import weatherStuff from './slice';
export const store = configureStore({
  reducer: {weatherStuff},
});
