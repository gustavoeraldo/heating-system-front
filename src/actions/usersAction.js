export const ACTIONS_TYPE = {
    SAVE_USER: 'SAVE_USER',
    SAVE_USERS: 'SAVE_USERS',
    SAVE_MEASUREMENTS_LIST: 'SAVE_MEASUREMENTS_LIST',
    
    ASYNC_GET_USERS: 'ASYNC_GET_USERS',
    ASYNC_GET_MEASUREMENTS_TYPE: 'ASYNC_GET_MEASUREMENTS_TYPE',
};

export const save_measurements_type_list = (measurements_type_list) => ({
    type: ACTIONS_TYPE.SAVE_MEASUREMENTS_LIST,
    measurements_type_list,
});

export const save_user_info = (user_id, measurement_type) => ({
    type: ACTIONS_TYPE.SAVE_USER,
    user_id,
    measurement_type,
});

export const save_users_list = (users_list) => ({
    type: ACTIONS_TYPE.SAVE_USERS,
    users_list,
});

export const async_get_users = (limit = 100) => ({
    type: ACTIONS_TYPE.ASYNC_GET_USERS,
    limit,
});

export const async_get_measurements_type = () => ({
    type: ACTIONS_TYPE.ASYNC_GET_MEASUREMENTS_TYPE,
});
