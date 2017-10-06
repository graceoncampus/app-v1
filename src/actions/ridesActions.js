import firebase from 'firebase';
import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
} from './types';

export const ridesFetch = () => (dispatch) => {
  const data = [];
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
    const allCars = snapshot.val();
     allCars.forEach((car) => {
       console.log(car);
      // const driverName = car.driver.name;
      // let riderNames = [];
      //   car.val().riders().forEach((rider) => {
      //   riderNames.push(rider.name)
      //   const toAppend = { driverName, riderNames };
      // });
      // data.push(toAppend);
     });
    dispatch({
      type: RIDES_FETCH,
      payload: data,
    });
  });
};

export const singleRideFetch = () => (dispatch) => {
  const data = [];
  const user = firebase.auth().currentUser;
  const myUid = user.uid;
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      //const driver = childSnapshot.val().driver.name;
      if (typeof childSnapshot.val().riders !== 'undefined') {
        const riders = childSnapshot.val().riders;
        const uids = childSnapshot.val().uids;
        if (uids.includes(myUid)) {
          const toAppend = { driver, riders };
          data.push(toAppend);
          dispatch({
            type: SINGLE_RIDE_FETCH,
            payload: data,
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
      payload: data,
    });
  });
};
