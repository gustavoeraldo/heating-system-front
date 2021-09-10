import { all, takeLatest } from 'redux-saga/effects';

import { getSensorResponse } from './device';

export default function* rootSaga() {
  return yield all([
    takeLatest('ASYNC_GET_SENSOR_VALUE', getSensorResponse),
  ]);
}
