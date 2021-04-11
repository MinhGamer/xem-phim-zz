import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import moviesCartReducer from './moviesCartReducer';

const rootReducer = combineReducers({
  adminReducer,
  moviesCartReducer,
});

export default rootReducer;
