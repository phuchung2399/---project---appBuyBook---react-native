import { combineReducers } from 'redux';

import { bookReducer } from './bookRedux/reducer';
import { categoryReducer } from './categoryRedux/reducer';
import { authReducer } from './authRedux/reducer'

const reducers = combineReducers({
  bookReducer,
  categoryReducer,
  authReducer
});

export default reducers;
