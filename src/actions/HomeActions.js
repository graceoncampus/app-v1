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


export const newPost = (Post, title, role) => {
  const data = {
    Post,
    title,
    Time: moment().unix(),
    role,
  };
  return (dispatch) => {
    const announcement = firebase.database().ref('posts');
    const details = {
      token: 'GOC2017!',
      post: Post,
    };
    let formBody = [];
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join('&');
    fetch('https://graceoncampus.org/notifications', {
      method: 'post',
      body: formBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    announcement.push(data).then(() => {
      dispatch({
        type: NEW_POST,
        payload: Post,
      });
    });
  };
};

export const getUserPerm = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  return (dispatch) => {
    const userData = firebase.database().ref(`/users/${uid}/permissions`);
    userData.once('value').then((snapshot) => {
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
      const role = childSnapshot.val().role || 'A-Team';
      const title = childSnapshot.val().title || 'Announcement';
      const toAppend = { post, time, date, key, role, title };
      data.push(toAppend);
    });
    dispatch({
      type: POST_FETCH,
      payload: data.reverse(),
    });
  });
};
