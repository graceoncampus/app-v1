import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
  RIDES_FETCH_SUCCESS,
  SINGLE_RIDE_FETCH_SUCCESS,
  RIDE_SIGNUP_CHECK,
} from '../actions/types';

const INITIAL_STATE = {
  ridesData: [],
  myRideData: [],
  alreadySignedUp: false,
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RIDES_FETCH:
      return { ...state, isLoading: true };
    case RIDES_FETCH_SUCCESS:
      return { ...state, ridesData: action.payload, isLoading: false };
    case SINGLE_RIDE_FETCH:
      return { ...state, isLoading: true };
    case SINGLE_RIDE_FETCH_SUCCESS:
      return { ...state, myRideData: action.payload, isLoading: false };
    case RIDE_SIGNUP_CHECK:
      return { ...state, alreadySignedUp: action.payload };
    default:
      return state;
  }
};
