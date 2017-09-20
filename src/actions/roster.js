import firebase from 'firebase';
import {
  GET_ALL_USERS,
} from './types';

export const getAllUsers = () => ((dispatch) => {
  const users = firebase.database().ref('users');
  users.on('value', (snapshot) => {
    dispatch({
      type: GET_ALL_USERS,
      payload: snapshot.val(),
    });
  });
});
