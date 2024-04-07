import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

const initialState = {
  isActive: false,
};

const slice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoader: (state, action) => ({
      ...state,
      isActive: action.payload,
    }),
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setLoader } = slice.actions;

export const loaderStart = () => {
  dispatch(setLoader(true));
};

export const loaderEnd = () => {
  dispatch(setLoader(false));
};
