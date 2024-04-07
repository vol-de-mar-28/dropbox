import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import dashboard from './slices/dashboard';
import user from './slices/user';
import folder from './slices/folder';
import loader from './slices/loader';
import confirmation from './slices/confirmation';
import formActions from './slices/formActions';
// ----------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  dashboard,
  user,
  folder,
  loader,
  confirmation,
  formActions,
});

export { rootPersistConfig, rootReducer };
