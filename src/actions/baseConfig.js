export const ACTIONS_TYPE = {
    SAVE_BASIC_CONFIG: 'SAVE_BASIC_CONFIG',
    APPEND_MEASUREMENTS: 'APPEND_MEASUREMENTS',
    SAVE_VALUES: 'SAVE_VALUES',
    SAVE_SENSOR_DATA_FAILURE: 'SAVE_SENSOR_DATA_FAILURE',
    GET_SENSOR_DATA_FAILURE: 'GET_SENSOR_DATA_FAILURE',
    GET_MEASUREMENT_DATA_FAILURE: 'GET_MEASUREMENT_DATA_FAILURE',
    SAVE_LOG: 'SAVE_LOG',
    CLEAR_LOGS: 'CLEAR_LOGS',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    
    ASYNC_GET_SENSOR_VALUE: 'ASYNC_GET_SENSOR_VALUE',
    ASYNC_GET_MEASUREMENTS: 'ASYNC_GET_MEASUREMENTS',
};

export const clear_errors = () => ({
    type: ACTIONS_TYPE.CLEAR_ERRORS,
});

export const clear_logs = () => ({
    type: ACTIONS_TYPE.CLEAR_LOGS
});

export const save_log = (data) => ({
    type: ACTIONS_TYPE.SAVE_LOG,
    data
});

export const save_sensor_data_failure = () => ({
    type: ACTIONS_TYPE.SAVE_SENSOR_DATA_FAILURE,
});

export const get_sensor_data_failure = () => ({
    type: ACTIONS_TYPE.GET_SENSOR_DATA_FAILURE,
});

export const get_measurement_data_failure = () => ({
    type: ACTIONS_TYPE.GET_MEASUREMENT_DATA_FAILURE,
});

export const save_values = (data) => ({
    type: ACTIONS_TYPE.SAVE_VALUES,
    data,
});

export const save_basic_config = (config) => ({
    type: ACTIONS_TYPE.SAVE_BASIC_CONFIG,
    config,
});

export const async_get_sensor_value = (device_ip, payload, sensor_tag) => ({
    type: ACTIONS_TYPE.ASYNC_GET_SENSOR_VALUE,
    device_ip,
    payload,
    sensor_tag,
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