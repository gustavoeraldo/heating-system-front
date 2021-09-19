import Axios from 'axios';
import { notification } from 'antd';
import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { BasicConfigAction } from '../../actions';

export function* getSensorResponse({ device_ip, payload }) {
    try {
        console.log(payload);
        const esp_ip = localStorage.getItem('device_ip') || device_ip;

        const esp_connection = Axios.create({
          baseURL: `http://${esp_ip}`,
          config: {
              headers: {
                  'content-type': '*/*',
                  Accept: '*/*',
                  'Access-Control-Allow-Origin': '*',
              }
          }
        });

        const { data } = yield esp_connection.get(`/${payload}`)
        .then((response) => response);
        
        // const sensor_value = [data.slice(37, 39), '.', data.slice(39, 41)].join('');
        // const measurement = parseFloat(sensor_value);
        
        // const user_id = localStorage.getItem('user_id');
        // const measurement_type = localStorage.getItem('measurement_type');
        // yield saveSensorData(user_id, 54.5, measurement_type);

        console.log({ data });

        return data;
    } catch (error) {
      notification.error({ message: 'Error' });
    }
}

export function* saveSensorData(user_id=5, measure=31.8, measurement_type=1) {
    try {
        const { data } = yield api.post('/measurements', {
          user_id, measure, measurement_type
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