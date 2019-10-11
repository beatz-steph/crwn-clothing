import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB0QcEYMCzZ89kJicS1v7NNwDUFtfmzZHw',
  authDomain: 'crwn-db-6eba1.firebaseapp.com',
  databaseURL: 'https://crwn-db-6eba1.firebaseio.com',
  projectId: 'crwn-db-6eba1',
  storageBucket: 'crwn-db-6eba1.appspot.com',
  messagingSenderId: '172378795663',
  appId: '1:172378795663:web:660104ed5ed0df64fa0afa',
  measurementId: 'G-WJF6DM9LX1'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
