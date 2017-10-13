import firebase from 'firebase';
import {
  RIDES_FETCH,
  SINGLE_RIDE_FETCH,
} from './types';

export const ridesFetch = () => (dispatch) => {
  const data = [];
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
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
    dispatch({
      type: RIDES_FETCH,
      payload: data,
    });
  });
};

export const singleRideFetch = () => (dispatch) => {
  const user = firebase.auth().currentUser;
  const myUid = user.uid;
  firebase.database().ref('rides').orderByKey().limitToFirst(1).once('value').then((snapshot) => {
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
            dispatch({
              type: SINGLE_RIDE_FETCH,
              payload: toAppend,
            });
          })
        }
      }
    }
  });
};
