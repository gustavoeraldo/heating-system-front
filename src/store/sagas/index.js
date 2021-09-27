import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { getSensorResponse, getMeasurements } from './device';
import { getUsers, getMeasurementsType } from './users';

export default function* rootSaga() {
  return yield all([
    takeEvery('ASYNC_GET_SENSOR_VALUE', getSensorResponse),
    takeLatest('ASYNC_GET_MEASUREMENTS', getMeasurements),

    takeLatest('ASYNC_GET_USERS', getUsers),
    takeLatest('ASYNC_GET_MEASUREMENTS_TYPE', getMeasurementsType),
  ]);
}
