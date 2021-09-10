export const ACTIONS_TYPE = {
    SAVE_BASIC_CONFIG: 'SAVE_BASIC_CONFIG',
    ASYNC_GET_SENSOR_VALUE: 'ASYNC_GET_SENSOR_VALUE',
};

export const save_basic_config = (config) => ({
    type: ACTIONS_TYPE.SAVE_BASIC_CONFIG,
    config,
});

export const async_get_sensor_value = (device_ip, message) => ({
    type: ACTIONS_TYPE.ASYNC_GET_SENSOR_VALUE,
    device_ip,
    message
});
