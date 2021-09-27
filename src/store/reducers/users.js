import { ACTIONS_TYPE } from '../../actions/usersAction';

const INITIAL_STATE = {
  user_id: localStorage.getItem('user_id') || 0,
  measurement_type: localStorage.getItem('measurement_type') || 'temperature',

  users_list: [],
  m_t_list: []
};

const UsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS_TYPE.SAVE_USER:
        localStorage.setItem('user_id', action.user_id);
        localStorage.setItem('measurement_type', action.measurement_type);
        
        return {
            ...state,
            user_id: action.user_id,
            measurement_type: action.measurement_type,
        }

    case ACTIONS_TYPE.SAVE_USERS: 
        return {
          ...state,
          users_list: action.users_list,
        }
    
    case ACTIONS_TYPE.SAVE_MEASUREMENTS_LIST: 
        return {
          ...state,
          m_t_list: action.measurement_type_list,
        };

    default:
      return state;
  }
};

export default UsersReducer;
