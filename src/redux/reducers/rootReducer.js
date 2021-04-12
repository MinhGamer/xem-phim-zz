import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import moviesCartReducer from './moviesCartReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  adminReducer,
  moviesCartReducer,
  userReducer,
});

export default rootReducer;
