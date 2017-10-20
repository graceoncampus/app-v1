import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

const lookupByUID = async (uid) => {
  const user = await firebase.database().ref(`users/${uid}`).once('value');
  return `${user.val().firstName} ${user.val().lastName}`;
};

const getToken = async() => {
  const token = await AsyncStorage.getItem('token');
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  firebase.database().ref(`/users/${uid}`).once('value').then((snapshot) => {
    const hasToken = snapshot.val().token;
    if(hasToken == undefined) {
      firebase.database().ref(`/users/${uid}/token`).push(token);
      return;
    }
    for (var key in hasToken) {
      if(hasToken[key] == token) {
        return;
      }
  }
  firebase.database().ref(`/users/${uid}/token`).push(token);
  });
}


export { lookupByUID, getToken };
