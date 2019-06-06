import {GET_IDEAS, ADD_IDEA, DELETE_IDEA} from './types';

export const getIdeas = () => {
  return {
    type: GET_IDEAS
  };
};

export const deleteIdea = id => {
  return {
    type: DELETE_IDEA,
    payload: id
  };
};
