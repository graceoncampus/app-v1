import firebase from 'firebase';
import {
  CLASS_FETCH,
  CLASS_ENROLL,
  CLASS_ENROLL_FAIL,
  CLASS_UNENROLL,
  CLASS_ADD,
  GET_CLASS_PERMISSIONS,
  CLASS_USERS_FETCH,
  GET_STUDENTS_INFO,
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

export const getClassPerm = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  return (dispatch) => {
    const userData = firebase.database().ref(`/users/${uid}/permissions`);
    userData.once('value').then((snapshot) => {
      dispatch({
        type: GET_CLASS_PERMISSIONS,
        payload: snapshot.val(),
      });
    });
  };
};

export const classUsersFetch = () => (dispatch) => {
  const classesData = firebase.database().ref('/users/');
  classesData.on('value', (snapshot) => {
    dispatch({
      type: CLASS_USERS_FETCH,
      payload: snapshot.val(),
    });
  });
};

export const studentsInfoFetch = async (uid) => {
    const user = await firebase.database().ref(`users/${uid}`).once('value');
    return `${user.val().firstName} ${user.val().lastName}:    ${user.val().email}`;
  };
