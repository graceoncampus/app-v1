import {
  NEW_POST,
  POST_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  postData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_POST:
      return { ...state };
    case POST_FETCH:
      return { ...state, postData: action.payload };
    default:
      return state;
  }
};
