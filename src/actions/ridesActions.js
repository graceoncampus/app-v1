import firebase from 'firebase';
import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH
} from './types';

export const ridesFetch = () => {
  return dispatch => {
    const data = [];
    firebase.database().ref('rides/cars').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const driver = childSnapshot.key;
        let riders = [];
        if (typeof childSnapshot.val().riders !== 'undefined') {
          riders = childSnapshot.val().riders;
        }
        const toAppend = { driver, riders };
        data.push(toAppend);
      });
      dispatch({
        type: RIDES_FETCH,
        payload: data
      });
    });
  };
};

export const singleRideFetch = () => {
  return dispatch => {
    const data = [];
    // const user = firebase.auth().currentUser;
    // const myUid = user.uid;
    const myUid = 'HaH2jdlJ7WZxU5tUrIz3cYPTW522';
    firebase.database().ref('rides/cars').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const driver = childSnapshot.key;
        if (typeof childSnapshot.val().riders !== 'undefined') {
          const riders = childSnapshot.val().riders;
          const uids = childSnapshot.val().uids;
          if (uids.includes(myUid)) {
            const toAppend = { driver, riders };
            data.push(toAppend);
            dispatch({
              type: SINGLE_RIDE_FETCH,
              payload: data
            });
          }
        }
      });
      const driver = 'Driver unavailable';
      const riders = [];
      const toAppend = { driver, riders };
      data.push(toAppend);
      dispatch({
        type: SINGLE_RIDE_FETCH,
        payload: data
      });
    });
  };
};
