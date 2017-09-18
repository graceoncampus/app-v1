import firebase from 'firebase';
import moment from 'moment';
import {
  NEW_POST
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
