import {GET_IDEAS, ADD_IDEA, DELETE_IDEA, IDEAS_LOADING, CLEAR_ADDED} from '../actions/types';

const initialState = {
  ideas: [],
  loading: false,
  isAdded: false
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
      };
    case ADD_IDEA:
      return {
        ...state,
        ideas: [action.payload, ...state.ideas],
        isAdded: true
      };
    case IDEAS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_ADDED:
      return {
        ...state,
        isAdded: false
      }
    default:
      return state;
  };
};
