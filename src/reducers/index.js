import { combineReducers } from 'redux';
import { AppNavigator } from '../navigators/AppNavigator';
import AuthReducer from './AuthReducer';
import EventsReducer from './EventsReducer';
import EventsFormReducer from './EventsFormReducer';
import roster from './roster';
import ClassReducer from './ClassReducer';
import RidesReducer from './RidesReducer';
import HomeReducer from './HomeReducer';

const firstAction = AppNavigator.router.getActionForPathAndParams('Auth');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
  tempNavState
);

const nav = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const appReducer = combineReducers({
  nav,
  AuthReducer,
  ClassReducer,
  RidesReducer,
  roster,
  events: EventsReducer,
  EventsFormReducer,
  HomeReducer,
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
