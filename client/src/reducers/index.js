import {combineReducers} from 'redux';
import ideaReducer from './ideaReducer';

export default combineReducers({
  idea: ideaReducer
});
