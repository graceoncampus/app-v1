import {
  NEW_POST,
  POST_FETCH,
  GET_USER_PERMISSIONS,
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
    case GET_USER_PERMISSIONS:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
