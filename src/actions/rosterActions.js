import firebase from 'firebase';
import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
} from './types';

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: GET_ALL_USERS });
  const users = firebase.database().ref('users').orderByChild('lastName');
  const userList = [];
  users.once('value').then((snapshot) => {
    snapshot.forEach((user) => {
      userList.push(user.val());
    });
    getAllUsersSuccess(dispatch, userList);
    // dispatch({
    //   type: GET_ALL_USERS,
    //   payload: userList,
    // });
  });
};

const getAllUsersSuccess = (dispatch, data) => {
  dispatch({
    type:GET_ALL_USERS_SUCCESS,
    payload: data,
  });
};
