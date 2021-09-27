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

  measurements: []
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
        }

    case ACTIONS_TYPE.APPEND_MEASUREMENTS:
      return {
          ...state,
          measurements: [...state.measurements, action.data],
      };

    case ACTIONS_TYPE.SAVE_VALUES: 
      return {
        ...state,
        measurements: action.data,
      }

    default:
      return state;
  }
};

export default BasicConfigurationReducer;
