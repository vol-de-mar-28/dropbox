import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';
// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useDispatch };
