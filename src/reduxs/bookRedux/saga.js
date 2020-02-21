import callAPI from '../../utils/callAPI';
import { put, takeLatest, call } from 'redux-saga/effects';
import * as types from './actions';

export function* fetchBooks() {
  try {
    var books = yield call(() => callAPI('api/books'));
    yield put({ type: types.FETCH_BOOKS_SUCCESSED, payload: books.data.Books });
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchCmsHome() {
  try {
    var data1 = yield call(() => callAPI('api/cms/home'));
    var data2 = yield call(() => callAPI('api/cms/bestusers'));
    var data3 = yield call(() => callAPI('api/cms/reviews'));

    yield put({ type: types.FETCH_CMS_HOME_SUCCESSED, payload: { booksHome: data1.data.Data, bestUsers: data2.data.Data, bestReviewers: data3.data.Data } });
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const watchBooksSaga = [
  takeLatest('FETCH_BOOKS', fetchBooks),
  takeLatest('FETCH_CMS_HOME', fetchCmsHome),
];
