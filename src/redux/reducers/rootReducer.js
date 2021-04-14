import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import movieReducer from './movieReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  adminReducer,
  movieReducer,
  userReducer,
});

export default rootReducer;
