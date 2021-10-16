import Axios from 'axios';
import { message } from 'antd';
import { put } from 'redux-saga/effects';

import api from '../../services/api';
import store from '../index';
import { BasicConfigAction } from '../../actions';


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

    console.log(`Dado recebido do ESP: ${data}`);
    
    // Parsing data
    const decimal_value = parseInt(data.slice(89, 91), 16);
    const float_value = parseInt(data.slice(91, 93), 16)

    const sensor_value = [decimal_value, '.', float_value].join('');
    const measurement = parseFloat(sensor_value);

    // let fake_value = 'ffff'
    
    const user_id = localStorage.getItem('user_id');
    // const random_number = Math.random()*70;

    console.log(`Dado enviado [sensor: ${sensor_tag}] para o banco: ${measurement}`);

    yield put(BasicConfigAction.save_log([{
      type: 'success',
      message: `Dado recebido do ESP: ${data}`
    }, 
    {
      type: 'success',
      message: `Dado enviado [sensor: ${sensor_tag}] para o banco: ${measurement}`
    }]));

    // const values = yield saveSensorData(user_id, fake_value, 1, sensor_tag);
    const values = yield saveSensorData(user_id, measurement.toFixed(2), 1, sensor_tag);
    yield put(BasicConfigAction.append_measurements(values));
  } catch (error) {
    const { failures } = store.getState().BasicConfigurationReducer;
    
    if (!failures.get_sensor_data) {
      yield put(BasicConfigAction.get_sensor_data_failure());
      message.error('Erro ao enviar dados para o dispositivo.');

      console.log({error});
      yield put(BasicConfigAction.save_log([{
        type: 'error',
        message: 'Erro ao enviar dados para o dispositivo.'
      }]));
    }
  }
}

export function* saveSensorData(user_id, measure, measurement_type=1, tag) {
  try {
    const { data } = yield api.post('/measurements', {
      user_id, measure, type_id: measurement_type, tag
    }).then((response) => response);
    
    // yield put(BasicConfigAction.append_measurements(data));
    return data;
  } catch (error) {
    const { failures } = store.getState().BasicConfigurationReducer;
    
    if (!failures.save_sensor_data) {
      yield put(BasicConfigAction.save_sensor_data_failure());
      message.error('Erro ao tentar inserir no banco de dados.');
      yield put(BasicConfigAction.save_log([{
        type: 'error',
        message: `Erro ao tentar inserir no banco de dados.
        Motivo: ${error.response.data.detail[0].msg}`
      }]));
    }

    console.log({error});
    return [];
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