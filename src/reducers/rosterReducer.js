import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  userList: {},
  isLoading: true,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, isLoading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, userList: action.payload, isLoading: false};
    default:
      return state;
  }
}
