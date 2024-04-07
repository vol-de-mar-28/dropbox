import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setUser } = slice.actions;

export const getUser = async () => {
  await axios
    .post(`/users/get_current_account`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setUser(res.data));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const isTokenExist = () => !!localStorage.getItem('dropboxToken');
