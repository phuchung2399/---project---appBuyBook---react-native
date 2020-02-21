import callAPI from '../../utils/callAPI';
import {put, takeLatest, call} from 'redux-saga/effects';

import * as types from './actions';

export function* fetchCategories() {
  try {
    var data = yield call(() => callAPI('api/categories', 'GET'));
    yield put({type: types.FETCH_CATEGORY_SUCCESSED, payload: data.data});
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const watchCategorySaga = [
  takeLatest('FETCH_CATEGORY', fetchCategories),
];
