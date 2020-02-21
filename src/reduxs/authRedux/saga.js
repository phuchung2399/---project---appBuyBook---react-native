import callAPI from '../../utils/callAPI'
import { put, takeLatest, call } from 'redux-saga/effects'

import {
  REGISTER,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESSED,
  REGISTER_FAILED,
  REGISTER_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT_SUCCESSED,
  GET_CART,
  GET_CART_SUCCESSED,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESSED,
  UPDATE_PROFILE_SUCCESSED,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE
} from './actions';

export function* Register(action) {
  try {
    const data = yield call(() => callAPI(`api/users`, 'POST', action.payload))
    yield put({ type: REGISTER_SUCCESSED, payload: data.data });
  } catch (error) {

    yield put({ type: REGISTER_FAILED, payload: error.response.data.Message });
  }
}
export function* Login(action) {

  try {
    const data = yield call(() => callAPI(`api/token`, 'POST', action.payload))
    console.log("data: ", data);

    yield put({ type: LOGIN_SUCCESSED, payload: data.data });
  } catch (error) {

    yield put({ type: LOGIN_FAILED, payload: error.response.data.Message });
  }
}

export function* getCart(action) {
  const { basketId, userId, token } = action.payload;
  var string = `api/basket/${basketId}?userId=${userId}`;

  try {
    const data = yield call(() => callAPI(`api/basket/${basketId}?userId=${userId}`, 'GET', null, token));
    yield put({ type: GET_CART_SUCCESSED, payload: data.data.Data.Items });
  } catch (error) {
    console.log("Error get cart", error);

  }
}

export function* getNotifications(action) {
  try {
    var data = yield call(() => callAPI(
      `api/usernotifications`,
      'GET',
      null,
      action.payload
    ));
    yield put({ type: GET_NOTIFICATIONS_SUCCESSED, payload: data.data.UserNotifications });
  } catch (error) {
    console.log("Error get noti: ", error);

  }
}

export function* Logout() {

  yield put({ type: LOGOUT_SUCCESSED });
}

export function* updateProfile(action) {
  const { idUser, token } = action.payload;
  try {
    const data = yield call(() => callAPI(`api/users/${idUser}/updateprofile`, 'PUT', action.payload, token));
    yield put({ type: UPDATE_PROFILE_SUCCESSED, payload: data.data });
  } catch (error) {

    yield put({ type: UPDATE_PROFILE_FAILED, payload: error.response });
  }
}

export const watchUserSaga = [
  takeLatest(REGISTER, Register),
  takeLatest(LOGIN, Login),
  takeLatest(LOGOUT, Logout),
  takeLatest(GET_CART, getCart),
  takeLatest(GET_NOTIFICATIONS, getNotifications),
  takeLatest(UPDATE_PROFILE, updateProfile)
]
