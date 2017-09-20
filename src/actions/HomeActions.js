import firebase from 'firebase';
import moment from 'moment';
import {
  AsyncStorage,
} from 'react-native';
import {
  NEW_POST,
  POST_FETCH,
  GET_USER_PERMISSIONS,
} from './types';

export const newPost = (Post) => {
  const data = {
    Post,
    Time: moment().unix(),
  };
  return (dispatch) => {
    const announcement = firebase.database().ref('posts');
    announcement.push(data);
    dispatch({
      type: NEW_POST,
      payload: Post,
    });
  };
};

export const getUserPerm = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  return (dispatch) => {
    const userData = firebase.database().ref(`/users/${uid}/permissions`);
    userData.on('value', (snapshot) => {
      dispatch({
        type: GET_USER_PERMISSIONS,
        payload: snapshot.val(),
      });
    });
  };
};

export const setReadList = (list) => {
  AsyncStorage.setItem('read', JSON.stringify(list));
  return (dispatch) => {
    dispatch({
      type: 'setRead',
    });
  };
};

export const postFetch = () => (dispatch) => {
  const data = [];
  firebase.database().ref('posts').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const post = childSnapshot.val().Post;
      const time = moment.unix(childSnapshot.val().Time).fromNow();
      const date = moment.unix(childSnapshot.val().Time).format('MMMM Do YYYY');
      const toAppend = { post, time, date, key };
      data.push(toAppend);
    });
    dispatch({
      type: POST_FETCH,
      payload: data.reverse(),
    });
  });
};
