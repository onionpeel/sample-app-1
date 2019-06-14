import axios from 'axios';
import {GET_IDEAS, ADD_IDEA, DELETE_IDEA, IDEAS_LOADING, ADDITEM_FAIL} from './types';
import {returnErrors} from './errorActions';
import {tokenConfig} from './authenticateActions';

export const getIdeas = () => async dispatch => {
  dispatch(setIdeasLoading());

  try{
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_IDEAS,
      payload: res.data
    });
  }catch(err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  };
};

export const deleteIdea = id => async (dispatch, getState) => {
  try{
    await axios.delete(`/api/posts/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_IDEA,
      payload: id
    });
  }catch(err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  };
};

export const addIdea = idea => async (dispatch, getState) => {
  try{
    const res = await axios.post('/api/posts', idea, tokenConfig(getState));
    dispatch({
      type: ADD_IDEA,
      payload: res.data
    });
  }catch(err) {
    dispatch(returnErrors(err.response.data, err.response.status, ADDITEM_FAIL));
  };
};

export const setIdeasLoading = () => {
  return {
    type: IDEAS_LOADING
  };
};
