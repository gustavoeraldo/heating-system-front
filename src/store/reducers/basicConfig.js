import { ACTIONS_TYPE } from '../../actions/baseConfig';

const INITIAL_STATE = {
  basic_config: {
      origin: '',
      destiny: '',
      sensor_id: '',
      command: '',
      device_ip: '',
      extra_info: '',
      check_sum: '',
      frequency: 10,
      end_time: ''
  },

  measurements: []
};

const BasicConfigurationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS_TYPE.SAVE_BASIC_CONFIG:
        return {
            ...state,
            basic_config: action.config,
        }

    case ACTIONS_TYPE.APPEND_MEASUREMENTS:
      return {
          ...state,
          measurements: action.data,
      };

    default:
      return state;
  }
};

export default BasicConfigurationReducer;
