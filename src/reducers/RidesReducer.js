import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH
} from '../actions/types';

const INITIAL_STATE = {
  ridesData: [],
  myRideData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RIDES_FETCH:
      return { ...state, ridesData: action.payload };
    case SINGLE_RIDE_FETCH:
      return { ...state, myRideData: action.payload };
    default:
      return state;
  }
};
