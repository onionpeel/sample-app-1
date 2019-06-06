import uuid from 'uuid';
import {GET_IDEAS, ADD_IDEA, DELETE_IDEA} from '../actions/types';

const initialState = {
  ideas: [
    {id: uuid(), title: 'Eat'},
    {id: uuid(), title: 'Sleep'},
    {id: uuid(), title: 'Ride bike'},
    {id: uuid(), title: 'Program'}
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_IDEAS:
      return {
        ...state
      };
    case DELETE_IDEA:
      return {
        ...state,
        ideas: state.ideas.filter(idea => idea.id !== action.payload)
      }
    default:
      return state;
  }
};
