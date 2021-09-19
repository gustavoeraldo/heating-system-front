export const ACTIONS_TYPE = {
    SAVE_BASIC_CONFIG: 'SAVE_BASIC_CONFIG',
    ASYNC_GET_SENSOR_VALUE: 'ASYNC_GET_SENSOR_VALUE',
    ASYNC_GET_MEASUREMENTS: 'ASYNC_GET_MEASUREMENTS',
    APPEND_MEASUREMENTS: 'APPEND_MEASUREMENTS'
};

export const save_basic_config = (config) => ({
    type: ACTIONS_TYPE.SAVE_BASIC_CONFIG,
    config,
});

export const async_get_sensor_value = (device_ip, payload) => ({
    type: ACTIONS_TYPE.ASYNC_GET_SENSOR_VALUE,
    device_ip,
    payload
});

export const async_get_measurements = (user_id, measurement_type) => ({
    type: ACTIONS_TYPE.ASYNC_GET_MEASUREMENTS,
    user_id,
    measurement_type
});

export const append_measurements = (data) => ({
    type: ACTIONS_TYPE.APPEND_MEASUREMENTS,
    data
});