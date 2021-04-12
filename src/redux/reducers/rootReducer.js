import { combineReducers } from 'redux';

import adminReducer from './adminReducer';

import userReducer from './userReducer';

const rootReducer = combineReducers({
  adminReducer,

  userReducer,
});

export default rootReducer;
