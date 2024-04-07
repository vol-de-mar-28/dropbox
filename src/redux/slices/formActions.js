import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { dispatch } from '../store';
import { getAllEntities } from './dashboard';
import { getFolderEntities } from './folder';
import { loaderStart, loaderEnd } from './loader';
import axios from '../../utils/axios';
import { fixedPathname } from '../../utils/helpers';

const initialState = {
  isFolderModalOpened: false,
  allFolders: [],
  isMoveModalOpened: false,
  selectedEntry: null,
  isUploadModalOpened: false,
};

const slice = createSlice({
  name: 'formActions',
  initialState,
  reducers: {
    setFolderModalOpen: (state, action) => ({
      ...state,
      isFolderModalOpened: action.payload,
    }),
    setAllFolders: (state, action) => ({
      ...state,
      allFolders: action.payload,
    }),
    setMoveModalOpen: (state, action) => ({
      ...state,
      isMoveModalOpened: action.payload,
    }),
    setSelectedEntry: (state, action) => ({
      ...state,
      selectedEntry: action.payload,
    }),
    setUploadModalOpen: (state, action) => ({
      ...state,
      isUploadModalOpened: action.payload,
    }),
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setFolderModalOpen,
  setAllFolders,
  setMoveModalOpen,
  setSelectedEntry,
  setUploadModalOpen,
} = slice.actions;

export const openFolderModal = (isOpen) => {
  dispatch(setFolderModalOpen(isOpen));
};

export const openMoveModal = (isOpen, entry) => {
  dispatch(setMoveModalOpen(isOpen));
  dispatch(setSelectedEntry(entry));
};

export const openUploadModal = (isOpen) => {
  dispatch(setUploadModalOpen(isOpen));
};

export const createFolder = async (path) => {
  await axios.post(`/files/create_folder_v2`, { path }).then(() => {
    if (window.location.pathname === '/') {
      getAllEntities();
    } else {
      getFolderEntities(fixedPathname(window.location.pathname));
    }
    toast.success('Folder successfully created.');
    openFolderModal(false);
  });
};

export const moveEntity = async (from, to) => {
  loaderStart();
  await axios
    .post(`/files/move_v2`, { from_path: from, to_path: to })
    .then((res) => {
      if (res.status === 200) {
        if (window.location.pathname === '/') {
          getAllEntities();
        } else {
          getFolderEntities(fixedPathname(window.location.pathname));
        }
        toast.success(`Folder successfully moved to ${to}.`);
      }
      if (res.status === 409) {
        toast.error('Conflict folder.');
        loaderEnd();
      }
      openMoveModal(false, null);
    });
};

export const getAllFolders = async () => {
  await axios
    .post(`/files/list_folder`, { path: '', recursive: true })
    .then((res) => {
      if (res.status === 200) {
        const folders = res.data.entries.filter((e) => e['.tag'] === 'folder');
        dispatch(setAllFolders(folders));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const uploadFile = async (path, file) => {
  try {
    const response = await fetch(
      `https://content.dropboxapi.com/2/files/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          Authorization: `Bearer ${localStorage.getItem('dropboxToken')}`,
          'Dropbox-API-Arg': JSON.stringify({ path: fixedPathname(path) }),
        },
        data: file,
      }
    );
    const res = await response.json();
    if (res.id) {
      if (window.location.pathname === '/') {
        getAllEntities();
      } else {
        getFolderEntities(fixedPathname(window.location.pathname));
      }
      openUploadModal(false);
      toast.success(`File successfully uploaded.`);
    }
  } catch (err) {
    console.log(err);
  }
};
