import { createSlice } from '@reduxjs/toolkit';

export const weatherStuff = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {

  },
});

export const { increment, decrement, incrementByAmount } = weatherStuff.actions;

export default weatherStuff.reducer;
