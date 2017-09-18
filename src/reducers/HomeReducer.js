import {
  NEW_POST,
} from '../actions/types';

const INITIAL_STATE = {
  Post: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_POST:
      return { ...state, Post: action.payload };
    default:
      return state;
  }
};
