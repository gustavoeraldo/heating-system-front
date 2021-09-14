import Axios from 'axios';
import { notification } from 'antd';
import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { BasicConfigAction } from '../../actions';

export function* getSensorResponse({ device_ip, message }) {
    try {
        const espConnection = Axios.create({
          baseURL: `http://${device_ip}`,
          config: {
              headers: {
                  'content-type': 'application/json',
                  Accept: 'application/json',
                  'Access-Control-Allow-Origin': '*',
              }
          }
        });

        const { data } = yield espConnection.get(`/${message}`)
        .then((response) => response);
        
        // const sensor_value = [data.slice(37, 39), '.', data.slice(39, 41)].join('');
        // const measurement = parseFloat(sensor_value);

        // yield saveSensorData(5, 54.5, 1);

        console.log({ data });

        return data;
    } catch (error) {
      notification.error({ message: 'Error' });
    }
}

export function* saveSensorData(user_id=5, measure=31.8, type_id=1) {
    try {
        const { data } = yield api.post('/measurements', {
          user_id, measure, type_id
        }).then((response) => response);
    
        return data;
      } catch (error) {
        notification.error({ message: 'Error' });
    }
}

export function* getMeasurements({ user_id, measurement_type }){
  try {
    const { data } = yield api.get(`/measurements/${user_id}`, {params: { measurement_type } })
    .then((response) => response);

    yield put(BasicConfigAction.append_measurements(data));
  } catch (error) {
    notification.error({ message: 'Error' });
  }
}