import firebase from 'firebase';
import {
  CLASS_FETCH,
  CLASS_ENROLL,
  CLASS_ENROLL_FAIL,
  CLASS_UNENROLL,
  CLASS_ADD,
} from './types';

export const classFetch = () => (dispatch) => {
  const classesData = firebase.database().ref('/classes');
  classesData.on('value', (snapshot) => {
    dispatch({
      type: CLASS_FETCH,
      payload: snapshot.val(),
    });
  });
};

export const classAdd = (data) => {
  const mutableData = data;
  return (dispatch) => {
    const email = data.instructorUID.toLowerCase();
    firebase.database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value', (snapshot) => {
        const key = Object.keys(snapshot.val())[0];
        mutableData.instructorUID = key;
        const signup = firebase.database().ref('classes');
        signup.push(mutableData);
        classFetch();
        dispatch({
          type: CLASS_ADD,
          payload: data,
        });
      });
  };
};

export const classEnroll = (classKey, numSpots) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const newOpenSpots = numSpots - 1;
  return (dispatch) => {
    if (numSpots > 0) {
      firebase.database().ref(`classes/${classKey}/students`)
        .push({ uid })
        .then(() => {
          firebase.database().ref(`classes/${classKey}/openSpots`)
            .set(newOpenSpots)
            .then(() => {
              classFetch();
              dispatch({ type: CLASS_ENROLL });
            });
        });
    } else {
      dispatch({ type: CLASS_ENROLL_FAIL });
    }
  };
};

export const classUnenroll = (classKey, numSpots) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const newOpenSpots = numSpots + 1;
  return (dispatch) => {
    firebase.database()
      .ref(`classes/${classKey}/students`)
      .orderByChild('uid')
      .equalTo(uid)
      .once('child_added', (snapshot) => {
        snapshot.ref.remove();
      });
    firebase.database().ref(`classes/${classKey}/openSpots`)
      .set(newOpenSpots)
      .then(() => {
        classFetch();
        dispatch({ type: CLASS_UNENROLL });
      });
  };
};
