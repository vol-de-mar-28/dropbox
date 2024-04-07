import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loaderEnd, loaderStart } from './loader';
import { showConfirmationModal } from './confirmation';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { fixedPathname } from '../../utils/helpers';

const initialState = {
  folderEntities: null,
};

const slice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setFolderEntities: (state, action) => ({
      ...state,
      folderEntities: action.payload,
    }),
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setFolderEntities } = slice.actions;

export const getFolderEntities = async (path) => {
  loaderStart();
  await axios
    .post(`/files/list_folder`, { path })
    .then((res) => {
      if (res.status === 200) {
        dispatch(setFolderEntities(res.data));
      }
    })
    .catch((error) => {
      console.log(error);
    });
  loaderEnd();
};

export const deleteChildEntity = (path) => {
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
      getFolderEntities(fixedPathname(window.location.pathname));
      showConfirmationModal({ isOpen: false });
      toast.success('Entity is deleted.');
    }
  });
};
