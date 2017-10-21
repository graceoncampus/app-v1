import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
  RIDES_FETCH_SUCCESS,
  SINGLE_RIDE_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  ridesData: [],
  myRideData: [],
  isLoading: false,
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
    default:
      return state;
  }
};
