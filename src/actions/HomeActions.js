import firebase from 'firebase';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';
import {
  AsyncStorage,
} from 'react-native';
import {
  NEW_POST,
  POST_FETCH,
  GET_USER_PERMISSIONS,
  EDIT_CURRENT_POST,
  DELETE_CURRENT_POST
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

export const editCurrentPost = (Post, title, Time, role, key) => {
  return (dispatch) => {
    const posts = {};
    posts[`/posts/${key}`] = {
      Post,
      title,
      Time,
      role,
    };
    firebase.database().ref().update(posts)
    .then(() => {
      dispatch(NavigationActions.navigate({ routeName: 'Home' }));
      dispatch({
        type: EDIT_CURRENT_POST,
        payload: {},
      });
    });
  }
}

export const deleteCurrentPost = (key) => {
  return (dispatch) => {
    const post = firebase.database().ref(`/posts/${key}`);
    post.once('value').then(snapshot => {
      snapshot.ref.remove()
      .then(() => {
        dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        dispatch({
          type: DELETE_CURRENT_POST,
          payload: {},
        });
      });
    })
  }
}

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
      const unixTime = childSnapshot.val().Time;
      const date = moment.unix(childSnapshot.val().Time).format('MMMM Do YYYY');
      const role = childSnapshot.val().role || 'A-Team';
      const title = childSnapshot.val().title || 'Announcement';
      const toAppend = { post, time, unixTime, date, key, role, title };
      data.push(toAppend);
    });
    dispatch({
      type: POST_FETCH,
      payload: data.reverse(),
    });
  });
};
