import firebase from 'firebase';
import moment from 'moment';
import {
  NEW_POST,
  POST_FETCH
} from './types'

export const newPost = ( Post ) => {
  data = {
    Post: Post,
    Time: moment().unix(),
  };
  return dispatch => {
    const announcement = firebase.database().ref('posts');
    announcement.push(data);
      dispatch({
        type: NEW_POST,
        payload: Post,
      })
  };
}

export const postFetch = () => {
  return dispatch => {
    const data = [];
    firebase.database().ref('posts').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var post = childSnapshot.val().Post;
        var time = moment.unix(childSnapshot.val().Time).format('h:mm a');
        var date = moment.unix(childSnapshot.val().Time).format('MMMM Do YYYY');
        const toAppend = { post, time, date };
        console.log(toAppend);
        data.push(toAppend);
      });
      dispatch({
        type: POST_FETCH,
        payload: data.reverse()
      });
    });
  };
};
