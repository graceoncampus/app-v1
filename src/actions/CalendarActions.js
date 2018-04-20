import firebase from 'firebase';
import {
  CALENDAR_FETCH,
} from './types';


export const calendarFetch = () => async (dispatch) => {
  const calendar = firebase.database().ref('/calendar');
  console.log(calendar)
    const snapshot = await calendar.once('value')
      dispatch({
        type: CALENDAR_FETCH,
        payload: snapshot.val(),
      });
};
