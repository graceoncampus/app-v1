import * as firebase from 'firebase';

const lookupByUID = async (uid) => {
  const user = await firebase.database().ref(`users/${uid}`).once('value');
  return `${user.val().firstName} ${user.val().lastName}`;
};

export { lookupByUID };
