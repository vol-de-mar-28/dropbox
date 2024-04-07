import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loaderEnd, loaderStart } from './loader';
import { showConfirmationModal } from './confirmation';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  allEntities: null,
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAllEntities: (state, action) => ({
      ...state,
      allEntities: action.payload,
    }),
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setAllEntities } = slice.actions;

export const getAllEntities = async () => {
  loaderStart();
  await axios
    .post(`/files/list_folder`, { path: '' })
    .then((res) => {
      if (res.status === 200) {
        dispatch(setAllEntities(res.data));
      }
      if (res.status === 401) {
        localStorage.removeItem('dropboxToken');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  loaderEnd();
};

export const deleteEntity = (path) => {
  showConfirmationModal({
    isOpen: true,
    title: 'Confirm deletion',
    content: `You really want to delete ${path}?`,
    onSubmit: () => submitDelete(path),
    onCancel: () => showConfirmationModal({ isOpen: false }),
  });
};

export const submitDelete = async (path) => {
  await axios.post(`/files/delete_v2`, { path }).then((res) => {
    if (res.status === 200) {
      getAllEntities();
      showConfirmationModal({ isOpen: false });
      toast.success('Entity is deleted.');
    }
  });
};

export const downloadFile = async (path) => {
  await axios.post(`/files/get_temporary_link`, { path }).then((res) => {
    if (res.status === 200) {
      const { link } = res.data;
      const a = document.createElement('a');
      a.href = link;
      a.click();
      a.remove();
    }
  });
};
