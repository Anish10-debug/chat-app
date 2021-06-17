/*eslint-disable*/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAyioSsXr5GIYabo3r6q6y4xBJW0F938XE',
  authDomain: 'chat-web-app-7994f.firebaseapp.com',
  databaseURL: 'https://chat-web-app-7994f-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-7994f',
  storageBucket: 'chat-web-app-7994f.appspot.com',
  messagingSenderId: '651747166220',
  appId: '1:651747166220:web:8c972b9f95e55af0f98629',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
