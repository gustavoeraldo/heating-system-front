import { message } from 'antd';
import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { UsersAction } from '../../actions';

export function* getUsers() {
    try {
        const { data } = yield api.get('/users')
        .then((response) => response);

        if (data.length > 0) {
            data.map((i) => Object.assign(i, { key: `${i.username}` }));
        }

        const user_id = localStorage.getItem('user_id');
        const users_list = data || [{ user_id, user_name: "Local user" }]
      
        yield put(UsersAction.save_users_list(users_list));
        // return data;
    } catch (error) {
      message.error({ message: 'Error' });
    }
}

export function* getMeasurementsType() {
    try {
        const { data } = yield api.get('/mesure-types').then((response) => response);

        if (data.length > 0) {
            data.map((i) => Object.assign(i, { key: `${i.m_type_id}` }));
        }
        
        yield put(UsersAction.save_measurements_type_list(data));

    } catch (error) {
        console.log(error);
    }
}
