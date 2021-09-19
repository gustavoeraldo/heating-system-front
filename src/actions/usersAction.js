export const ACTIONS_TYPE = {
    SAVE_USER: 'SAVE_USER',
    SAVE_USERS: 'SAVE_USERS',
    
    ASYNC_GET_USERS: 'ASYNC_GET_USERS',
};

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
