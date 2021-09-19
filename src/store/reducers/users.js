import { ACTIONS_TYPE } from '../../actions/usersAction';

const INITIAL_STATE = {
  user_id: Number,
  measurement_type: Number,

  users_list: []
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


    default:
      return state;
  }
};

export default UsersReducer;
