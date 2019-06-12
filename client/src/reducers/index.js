import {combineReducers} from 'redux';
import ideaReducer from './ideaReducer';
import errorReducer from './errorReducer';
import authenticateReducer from './authenticateReducer';

export default combineReducers({
  idea: ideaReducer,
  error: errorReducer,
  authenticate: authenticateReducer
});
