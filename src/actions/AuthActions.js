import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import {
  CREATE_ACCOUNT,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  USER_LOGIN,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_LOAD,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_LOAD,
  USER_LOGOUT,
} from './types';


const createUserFail = (dispatch) => {
  dispatch({ type: CREATE_USER_FAIL });
};

const createUserSuccess = (
  dispatch,
  user,
  password,
  firstName,
  lastName,
  email,
  phoneNumber,
  birthday,
  grad,
  major,
  homeChurch,
  address,
) => {
  const permissions = {
    admin: 0,
    carousel: 0,
    sermons: 0,
    events: 0,
    classes: 0,
    rides: 0,
  };

  const image = 'image URL';

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((User) => {
      const users = {};
      const bday = moment(birthday, 'MM/DD/YYYY').unix();
      users[`/users/${User.uid}`] = {
        email,
        firstName,
        lastName,
        phoneNumber,
        birthday: bday,
        homeChurch,
        grad,
        major,
        address,
        permissions,
        image,
      };
      firebase.database().ref().update(users)

        .then(() => {
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: user,
          });
        });
    });
  dispatch(NavigationActions.navigate({ routeName: 'Main' }));
};
export const createAccount = (
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  birthday,
  grad,
  major,
  homeChurch,
  address) => (dispatch) => {
  dispatch({ type: CREATE_ACCOUNT });
  const eml = email.toLowerCase();
  firebase.database()
    .ref('users')
    .orderByChild('email')
    .equalTo(eml)
    .once('value', (snapshot) => {
      const existingUser = snapshot.val();
      if (existingUser) {
        createUserFail(dispatch);
      } else {
        firebase.database()
          .ref('invitedUsers')
          .orderByChild('email')
          .equalTo(email)
          .once('value', (snapshot2) => {
            const emailCheck = snapshot2.val();
            if (emailCheck) {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => createUserSuccess(
                  dispatch,
                  user,
                  password,
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  birthday,
                  grad,
                  major,
                  homeChurch,
                  address))
                .catch(() => createUserFail(dispatch));
              firebase.database()
                .ref('invitedUsers')
                .orderByChild('email')
                .equalTo(email)
                .on('child_added', (snapshot3) => {
                  snapshot3.ref.remove();
                });
            } else {
              createUserFail(dispatch);
            }
          });
      }
    });
};


const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  dispatch(NavigationActions.navigate({ routeName: 'Main' }));
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    error,
  });
};

export const userLogin = ({ Email, Password }) => (dispatch) => {
  dispatch({ type: USER_LOGIN });
  firebase.auth().signInWithEmailAndPassword(Email, Password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch, error));
};

export const getUserInfo = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  return (dispatch) => {
    const userData = firebase.database().ref(`/users/${uid}`);
    userData.on('value', (snapshot) => {
      dispatch({
        type: GET_USER_INFO,
        payload: snapshot.val(),
      });
    });
  };
};

export const updateUserInfo = (
  email,
  firstName,
  lastName,
  phoneNumber,
  birthday,
  homeChurch,
  grad,
  major,
  address,
  permissions,
  image,
) => (dispatch) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const bday = moment(birthday, 'MM/DD/YYYY').unix();
  const users = {};
  users[`/users/${uid}`] = {
    email,
    firstName,
    lastName,
    phoneNumber,
    birthday: bday,
    homeChurch,
    grad,
    major,
    address,
    permissions,
    image,
  };

  firebase.database().ref().update(users)
    .then(() => {
      dispatch({
        type: UPDATE_USER_INFO,
        payload: {},
      });
    });
};


const ChangeUserPasswordLoad = (dispatch) => {
  dispatch({ type: CHANGE_USER_PASSWORD_LOAD });
};

export const changeUserPassword = (oldPassword, newPassword) => {
  const { currentUser } = firebase.auth();
  const email = currentUser.email;

  return (dispatch) => {
    dispatch({ type: CHANGE_USER_PASSWORD });
    firebase.auth().signInWithEmailAndPassword(email, oldPassword)
      .then(() => {
        firebase.auth().currentUser.updatePassword(newPassword).then(() => {
          dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
          ChangeUserPasswordLoad(dispatch);
        }, () => {
          ChangeUserPasswordLoad(dispatch);
        });
      }).catch(() => {
        ChangeUserPasswordLoad(dispatch);
      });
  };
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  firebase.auth().signOut().then(() => {
    dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
  });
};

const resetUserPasswordLoad = (dispatch) => {
  dispatch({ type: RESET_USER_PASSWORD_LOAD });
};

export const resetUserPassword = Email => (dispatch) => {
  dispatch({ type: RESET_USER_PASSWORD });
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(Email).then(() => {
    resetUserPasswordLoad(dispatch);
  }).catch(() => {
    resetUserPasswordLoad(dispatch);
  });
};
