import { all, takeLatest } from 'redux-saga/effects';

import { getSensorResponse, getMeasurements } from './device';
import { getUsers } from './users';

export default function* rootSaga() {
  return yield all([
    takeLatest('ASYNC_GET_SENSOR_VALUE', getSensorResponse),
    takeLatest('ASYNC_GET_MEASUREMENTS', getMeasurements),

    takeLatest('ASYNC_GET_USERS', getUsers),
  ]);
}
