import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import store from 'react-native-simple-store';
import moment from 'moment';
import {
  CREATE_ACCOUNT,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  USER_LOGIN,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  GET_USER_INFO,
  GOT_USER,
  UPDATE_USER_INFO,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_LOAD,
  RESET_USER_PASSWORD,
  RESET_USER_PASSWORD_LOAD,
  USER_LOGOUT,
} from './types';

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

  firebase.database()
    .ref('users')
    .orderByChild('email')
    .equalTo(email)
    .once('value', (snapshot) => {
      const existingUser = snapshot.val();
      if (existingUser) {
        alert('An account with this email has already been created');
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
              alert('This email has not been invited to create an account');
              createUserFail(dispatch);
            }
          });
      }
    });
};

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
    discussions: 0,
    events: 0,
    courses: 0,
    testperm: 0,
    rides: 0,
  };

  const image = 'image URL';

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((User) => {
      const users = {};
      birthday = moment(birthday, 'MM/DD/YYYY').unix(),
      users[`/users/${User.uid}`] = {
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
      };
      firebase.database().ref().update(users)
        .then(() => {
          store
            .save('user', {
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
              uid: User.uid,
            });
        })
        .then(() => {
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: user,
          });
        });
    });
  alert('Account created successfully!');
  dispatch(NavigationActions.navigate({ routeName: 'Main' }));
};

export const userLogin = ({ Email, Password }) => (dispatch) => {
  dispatch({ type: USER_LOGIN });
  console.log(Email);
  firebase.auth().signInWithEmailAndPassword(Email, Password)
    .then((user) => {
      firebase.database().ref('users').child(user.uid).once('value')
        .then((snapshot) => {
          store
            .save('user', {
              email: snapshot.val().email,
              firstName: snapshot.val().firstName,
              lastName: snapshot.val().lastName,
              phoneNumber: snapshot.val().phoneNumber,
              birthday: snapshot.val().birthday,
              homeChurch: snapshot.val().homeChurch,
              grad: snapshot.val().grad,
              major: snapshot.val().major,
              address: snapshot.val().address,
              permissions: snapshot.val().permissions,
              image: snapshot.val().image,
              uid: user.uid,
            });
        });
    })
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch, error));
};

export const getUser = () => {
  console.log('getting user');
  return (dispatch) => {
    store.get('user').then((usr) => {
      dispatch(gotUser(usr));
    });
  };
};

function gotUser(user) {
  return {
    type: GOT_USER,
    payload: user,
  };
}

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

// ---------------------------------------- SETTINGS ACTIONS ----------------------------------------

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
  birthday = moment(birthday, 'MM/DD/YYYY').unix();
  const users = {};
  users[`/users/${uid}`] = {
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
  };

  firebase.database().ref().update(users)
    .then(() => {
      dispatch({
        type: UPDATE_USER_INFO,
        payload: {},
      });
    });
};

export const changeUserPassword = (oldPassword, newPassword) => {
  const { currentUser } = firebase.auth()
  const email = currentUser.email

  return (dispatch) => {
    dispatch({ type: CHANGE_USER_PASSWORD })
    firebase.auth().signInWithEmailAndPassword(email, oldPassword)
    .then(() => {
      firebase.auth().currentUser.updatePassword(newPassword).then(function () {
        alert('Password change successful')
        dispatch(NavigationActions.navigate({ routeName: 'Settings' }))
        ChangeUserPasswordLoad(dispatch)
      }, function (error) {
        alert('Password change failed');
        ChangeUserPasswordLoad(dispatch);
      })
    }).catch(() => {
      alert('Old password incorrect');
      ChangeUserPasswordLoad(dispatch);
    })
  }
}

const ChangeUserPasswordLoad = (dispatch) => {
  dispatch({ type: CHANGE_USER_PASSWORD_LOAD })
}


export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  firebase.auth().signOut().then(() => {
    console.log('Logout successful');
    dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
  }, (error) => {
    console.log('Logout failed');
  });
};

// ---------------------------------------- FORGOT PASSWORD ACTION ----------------------------------------

export const resetUserPassword = Email => (dispatch) => {
  dispatch({ type: RESET_USER_PASSWORD });
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(Email).then(() => {
    alert('Password reset email has been sent');
    resetUserPasswordLoad(dispatch);
  }).catch((error) => {
    alert('Password reset failed');
    resetUserPasswordLoad(dispatch);
  });
};

const resetUserPasswordLoad = (dispatch) => {
  dispatch({ type: RESET_USER_PASSWORD_LOAD })
}
