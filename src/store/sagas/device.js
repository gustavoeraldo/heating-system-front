import Axios from 'axios';
import { notification } from 'antd';
import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { BasicConfigAction } from '../../actions';
import { objectTypeAnnotation } from '@babel/types';

export function* getSensorResponse({ device_ip, payload, sensor_tag }) {
    try {
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
        
        const user_id = localStorage.getItem('user_id');
        const measurement_type = localStorage.getItem('measurement_type');
        const random_number = Math.random()*70

        yield saveSensorData(user_id, random_number.toFixed(2), 1, sensor_tag);
        return random_number;
    } catch (error) {
      console.log('Error');
    }
}

export function* saveSensorData(
  user_id, measure, measurement_type=1, tag) {
    try {
        const { data } = yield api.post('/measurements', {
          user_id, measure, type_id: measurement_type, tag
        }).then((response) => response);
        
        console.log({data});
        
        yield put(BasicConfigAction.append_measurements(data));
      } catch (error) {
        console.log({error})
        notification.error({ message: 'error'});
    }
}

export function* getMeasurements({ user_id, measurement_type }){
  try {
    const date = Date.now()
    let start_date = new Date(date)
    start_date = `${start_date.getFullYear()}-${start_date.getMonth()+1}-${start_date.getDate()}`
    
    let end_date = new Date(date)
    end_date.setDate(end_date.getDate() + 1)
    end_date = `${end_date.getFullYear()}-${end_date.getMonth()+1}-${end_date.getDate()}`

    const { data } = yield api.get(`/measurements/${user_id}`, 
    { params: { measurement_type, start_date, end_date } })
    .then((response) => response);

    yield put(BasicConfigAction.save_values(data));
  } catch (error) {
    console.log(error);
  }
}