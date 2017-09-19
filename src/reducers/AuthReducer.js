import { CREATE_ACCOUNT,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  USER_LOGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_USER_INFO,
  GOT_USER,
  UPDATE_USER_INFO,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_LOAD,
  RESET_USER_PASSWORD,
  USER_LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
  userInfo: {},
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return { ...state, loading: true, error: '' };
    case CREATE_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case CREATE_USER_FAIL:
      return { ...state, error: 'Account Creation Failed', loading: false };
    case USER_LOGIN:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case GET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case GOT_USER:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.error.message, loading: false };
    case USER_LOGOUT:
      return { ...INITIAL_STATE };
    case UPDATE_USER_INFO:
      return { ...state };
    case CHANGE_USER_PASSWORD:
      return { ...state, loading: true };
    case CHANGE_USER_PASSWORD_LOAD:
      return { ...state, loading: false };
    case RESET_USER_PASSWORD:
      return { ...state };
    default:
      return state;
  }
};
