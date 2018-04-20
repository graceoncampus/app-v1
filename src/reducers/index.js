import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';
import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';
import EventsFormReducer from './EventsFormReducer';
import rosterReducer from './rosterReducer';
import ClassReducer from './ClassReducer';
import RidesReducer from './RidesReducer';
import HomeReducer from './HomeReducer';
import CalendarReducer from './CalendarReducer';

const initialNavState = AppNavigator.router.getStateForAction({});

const nav = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const appReducer = combineReducers({
  nav,
  AuthReducer,
  ClassReducer,
  RidesReducer,
  rosterReducer,
  events: EventsReducer,
  EventsFormReducer,
  HomeReducer,
  CalendarReducer,
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
