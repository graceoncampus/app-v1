import firebase from 'firebase';
import {
  GET_ALL_USERS,
} from './types';

export const getAllUsers = () => ((dispatch) => {
  const users = firebase.database().ref('users').orderByChild('lastName');
  const userList = [];
  users.once('value').then((snapshot) => {
    snapshot.forEach((user) => {
      userList.push(user.val());
    });
    dispatch({
      type: GET_ALL_USERS,
      payload: userList,
    });
  });
});
