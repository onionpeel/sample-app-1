import axios from 'axios';
import {returnErrors} from './errorActions';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

//Check token and load User
export const loadUser = () => async (dispatch, getState) => {
  //User loading
  dispatch({type: USER_LOADING});

  try{
    const res = await axios.get('/api/authenticate/user', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  }catch(error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  };
};

export const register = ({name, email, password}) => async dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  //Request body
  const body = JSON.stringify({name, email, password});

  try{
    let res = await axios.post('api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  }catch(error) {
    dispatch({
      type: REGISTER_FAIL
    });

    dispatch(returnErrors(error.response.data, error.response.status, REGISTER_FAIL));
  };
};

//Login user
export const login = ({email, password}) => async dispatch => {
  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  //Request body
  const body = JSON.stringify({email, password});

  try{
    let res = await axios.post('api/authenticate', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  }catch(error) {
    dispatch({
      type: LOGIN_FAIL
    });

    dispatch(returnErrors(error.response.data, error.response.status, LOGIN_FAIL));
  };
};

//Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

//Setup config/headers and token
export const tokenConfig = getState => {
  //Get token from localStorage
  const token = getState().authenticate.token;
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  };
  return config;
};
