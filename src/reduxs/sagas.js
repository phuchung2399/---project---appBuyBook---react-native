import { all } from 'redux-saga/effects';
import { watchBooksSaga } from './bookRedux/saga';
import { watchCategorySaga } from './categoryRedux/saga';
import { watchUserSaga } from './authRedux/saga';

export default function* rootSaga() {
  yield all([...watchBooksSaga, ...watchCategorySaga, ...watchUserSaga]);
}
