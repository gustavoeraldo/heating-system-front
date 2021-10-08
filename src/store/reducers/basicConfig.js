import { ACTIONS_TYPE } from '../../actions/baseConfig';

const INITIAL_STATE = {
  basic_config: {
      origin: localStorage.getItem('origin'),
      destiny: localStorage.getItem('destiny'),
      sensor_id: localStorage.getItem('sensor_id'),
      command: localStorage.getItem('command'),
      device_ip: localStorage.getItem('device_ip'),
      extra_info: localStorage.getItem('extra_info'),
      check_sum: localStorage.getItem('check_sum'),
      frequency: localStorage.getItem('frequency'),
      start_time: String,
      end_time: String
  },

  measurements: [],

  failures: {
    save_sensor_data: false, 
    get_sensor_data: false, 
    get_measurement_data: false,
  }
};

const BasicConfigurationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS_TYPE.SAVE_BASIC_CONFIG:
        localStorage.setItem('origin', action.config.origin);
        localStorage.setItem('destiny', action.config.destiny);
        localStorage.setItem('sensor_id', action.config.sensor_id);
        localStorage.setItem('command', action.config.command);
        localStorage.setItem('device_ip', action.config.device_ip);
        localStorage.setItem('extra_info', action.config.extra_info);
        localStorage.setItem('check_sum', action.config.check_sum);
        localStorage.setItem('frequency', action.config.frequency);

        return {
            ...state,
            basic_config: action.config,
        };

    case ACTIONS_TYPE.APPEND_MEASUREMENTS:
      return {
          ...state,
          measurements: [...state.measurements, action.data],
      };

    case ACTIONS_TYPE.SAVE_VALUES: 
      return {
        ...state,
        measurements: action.data,
      };

    case ACTIONS_TYPE.SAVE_SENSOR_DATA_FAILURE: 
      return {
        ...state,
        failures: { 
          save_sensor_data: true, 
          get_sensor_data: state.failures.get_sensor_data, 
          get_measurement_data: state.failures.get_measurement_data,
         }
      };

    case ACTIONS_TYPE.GET_SENSOR_DATA_FAILURE: 
      return {
        ...state,
        failures: { 
          save_sensor_data: state.failures.save_sensor_data, 
          get_sensor_data: true, 
          get_measurement_data: state.failures.get_measurement_data,
         }
      };

    case ACTIONS_TYPE.GET_MEASUREMENT_DATA_FAILURE: 
      return {
        ...state,
        failures: { 
          save_sensor_data: state.failures.save_sensor_data, 
          get_sensor_data: state.failures.get_sensor_data, 
          get_measurement_data: true,
        }
      };

    default:
      return state;
  }
};

export default BasicConfigurationReducer;
