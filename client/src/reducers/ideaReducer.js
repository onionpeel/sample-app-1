import uuid from 'uuid';
import {GET_IDEAS, ADD_IDEA, DELETE_IDEA, IDEAS_LOADING} from '../actions/types';

const initialState = {
  ideas: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_IDEAS:
      return {
        ...state,
        ideas: action.payload,
        loading: false
      };
    case DELETE_IDEA:
      return {
        ...state,
        ideas: state.ideas.filter(idea => idea._id !== action.payload)
      }
    case ADD_IDEA:
      return {
        ...state,
        ideas: [action.payload, ...state.ideas]
      }
    case IDEAS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};
