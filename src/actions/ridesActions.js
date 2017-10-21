import firebase from 'firebase';
import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
  RIDES_FETCH_SUCCESS,
  SINGLE_RIDE_FETCH_SUCCESS,
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
    // dispatch({
    //   type: RIDES_FETCH,
    //   payload: data,
    // });
  }
  else {
    const data = null;
    ridesFetchSuccess(dispatch, data);
  //   dispatch({
  //     type: RIDES_FETCH,
  //     payload: null,
  // });
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
    for (var key in allCars) {
      let carUIDs = [];
      if(allCars.hasOwnProperty(key)) {
        const driver = allCars[key].driver.name;
        carUIDs.push(allCars[key].driver.uid);
        const ridersObj = allCars[key].riders
        let riders = [];
        for (var riderKey in ridersObj) {
          riders.push(ridersObj[riderKey].name);
          carUIDs.push(ridersObj[riderKey].uid);
        }
        if(carUIDs.includes(myUid)) {
          const users = firebase.database().ref('users');
          let userList = [];
          users.once('value').then((snapshot) => {
            for (var i = 0; i < carUIDs.length; i++) {
              for (var key in snapshot.val()) {
                if(carUIDs[i] == '') {
                  userList.push('');
                  break;
                }
                if(key === carUIDs[i]) {
                  userList.push(snapshot.val()[key]);
                  break;
                }
              }
            }
            const toAppend = { driver, riders, userList };
            // dispatch({
            //   type: SINGLE_RIDE_FETCH,
            //   payload: toAppend,
            // });
            singleRideFetchSuccess(dispatch, toAppend);
          })
        }
      }
    }
  }
  else {
    const data = null;
  //   dispatch({
  //     type: SINGLE_RIDE_FETCH,
  //     payload: null,
  // });
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
