import { createSlice } from '@reduxjs/toolkit';
//
import { dispatch } from '../store';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  onSubmit: null,
  onCancel: null,
};

const slice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    setConfirmationModal(state, action) {
      state.isOpen = action.payload.isOpen;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.onSubmit = action.payload.onSubmit;
      state.onCancel = action.payload.onCancel;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setConfirmationModal } = slice.actions;

export const showConfirmationModal = ({
  isOpen,
  title,
  content,
  onSubmit,
  onCancel,
}) => {
  dispatch(
    setConfirmationModal({
      isOpen,
      title,
      content,
      onSubmit,
      onCancel,
    })
  );
};
