import Axios from 'axios';
import { notification } from 'antd';

import api from '../../services/api';

export function* getSensorResponse({ device_ip, message }) {
    try {
        const { data } = yield Axios.get(`http://${device_ip}/${message}`)
        .then((response) => response);
        
        // const sensor_value = [data.slice(37, 39), '.', data.slice(39, 41)].join('');
        // const measurement = parseFloat(sensor_value);

        // yield saveSensorData(5, measurement, 1);

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