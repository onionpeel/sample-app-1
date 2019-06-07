import axios from 'axios';
import {GET_IDEAS, ADD_IDEA, DELETE_IDEA, IDEAS_LOADING} from './types';

export const getIdeas = () => async dispatch => {
  dispatch(setIdeasLoading());

  try{
    const res = await axios.get('/api/posts/all');
    dispatch({
      type: GET_IDEAS,
      payload: res.data
    });
  }catch(err) {
    console.log(err);
  };
};

export const deleteIdea = id => async dispatch => {
  try{
    await axios.delete(`/api/posts/public/${id}`);
    dispatch({
      type: DELETE_IDEA,
      payload: id
    });
  }catch(err) {

  };
};

export const addIdea = idea => async dispatch => {
  try{
    const res = await axios.post('/api/posts/anyone', idea);
    dispatch({
      type: ADD_IDEA,
      payload: res.data
    });
  }catch(err) {
    console.log(err);
  };
};

export const setIdeasLoading = () => {
  return {
    type: IDEAS_LOADING
  };
};
