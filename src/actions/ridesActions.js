import firebase from 'firebase';
import _ from 'lodash';
import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
  RIDES_FETCH_SUCCESS,
  SINGLE_RIDE_FETCH_SUCCESS,
  RIDE_SIGNUP_CHECK,
} from './types';

export const ridesFetch = () => (dispatch) => {
  dispatch({ type: RIDES_FETCH });
  const data = [];
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
    if(snapshot.val() !== null) {
    const thisKey = Object.keys(snapshot.val())[0];
    const allCars = snapshot.val()[thisKey].cars;
    for (var key in allCars) {
      if(allCars.hasOwnProperty(key)) {
        var driver = allCars[key].driver.name;
        const ridersObj = allCars[key].riders
        let riders = [];
        for (var riderKey in ridersObj) {
          riders.push(ridersObj[riderKey].name);
        }
        const toAppend = { driver, riders };
        data.push(toAppend);
      }
    }
    ridesFetchSuccess(dispatch, data);
  }
  else {
    const data = null;
    ridesFetchSuccess(dispatch, data);
}
});
}

const ridesFetchSuccess = (dispatch, data) => {
  dispatch({
    type: RIDES_FETCH_SUCCESS,
    payload: data,
  });
};


export const singleRideFetch = () => (dispatch) => {
  dispatch({ type: SINGLE_RIDE_FETCH });
  const user = firebase.auth().currentUser;
  const myUid = user.uid;
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
    if(snapshot.val()) {
    const thisKey = Object.keys(snapshot.val())[0];
    const allCars = snapshot.val()[thisKey].cars;
    const data = _.filter(allCars, car => (car.driver.uid===myUid || _.filter(car.riders, rider => (rider.uid===myUid)).length > 0));
      let carUIDs = [];
      let userList = [];
      let riders = [];
      const driver = data[0].driver.name;
      carUIDs.push(data[0].driver.uid);
      for (var riderKey in data[0].riders) {
        riders.push(data[0].riders[riderKey].name);
        carUIDs.push(data[0].riders[riderKey].uid);
      }
      const users = firebase.database().ref('users');
      users.once('value').then((snapshot) => {
        for (var j = 0; j < carUIDs.length; j++) {
          for (var key in snapshot.val()) {
            if(carUIDs[j] == '') {
              userList.push('');
              break;
            }
            if(key === carUIDs[j]) {
              userList.push(snapshot.val()[key]);
              break;
            }
          }
        }
        const toAppend = { driver, riders, userList };
        singleRideFetchSuccess(dispatch, toAppend);
      });
  }
  else {
    const data = null;
  singleRideFetchSuccess(dispatch, data);
}
  });
};

const singleRideFetchSuccess = (dispatch, data) => {
  dispatch({
    type: SINGLE_RIDE_FETCH_SUCCESS,
    payload: data,
  });
};

export const rideSignupCheck = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const myEmail = user.email;
    firebase.database().ref('ridesSignup').once('value').then((snapshot) => {
      if(snapshot.val()) {
        const isSignedUp = _.filter(snapshot.val(), check => (check.email===myEmail ));
        dispatch({
          type: RIDE_SIGNUP_CHECK,
        });
      }
    });
  };
}
