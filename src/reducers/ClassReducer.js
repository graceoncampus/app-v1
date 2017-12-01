import {
  CLASS_FETCH,
  CLASS_ENROLL,
  CLASS_ENROLL_FAIL,
  CLASS_UNENROLL,
  CLASS_ADD,
  GET_CLASS_PERMISSIONS,
  CLASS_USERS_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  classData: {},
  allUsers: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLASS_ADD:
      return { ...state };
    case CLASS_FETCH:
      return { ...state, classData: action.payload };
    case CLASS_USERS_FETCH:
      return { ...state, allUsers: action.payload };
    case GET_CLASS_PERMISSIONS:
      return { ...state, userInfo: action.payload };
    case CLASS_ENROLL:
      return { ...state, loading: true, error: '' };
    case CLASS_UNENROLL:
      return { ...state, lading: true, error: '' };
    case CLASS_ENROLL_FAIL:
      return { ...state, error: 'Enrollment failed, class may be full', loading: false };
    default:
      return state;
  }
};
