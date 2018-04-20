import {
  CALENDAR_FETCH,
} from '../actions/types';

const INITIAL_STATE = {
  calendarData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CALENDAR_FETCH:
      return { ...state, calendarData: action.payload };
    default:
      return state;
  }
};
