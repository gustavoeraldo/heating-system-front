/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import BasicConfigurationReducer from './basicConfig';

export default (history) => combineReducers({
  router: connectRouter(history),
  BasicConfigurationReducer,
});
