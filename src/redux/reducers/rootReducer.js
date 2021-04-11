import { combineReducers } from 'redux';

import userReducer from './userReducer';
import moviesCartReducer from './moviesCartReducer';

const rootReducer = combineReducers({
  userReducer,
  moviesCartReducer,
});

export default rootReducer;
