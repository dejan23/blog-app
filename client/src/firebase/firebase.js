import * as firebase from 'firebase';


// Initialize Firebase
 const config = {
   apiKey: "AIzaSyC_1-IQ7GYeYMR3lvrKRKV4rtxtRsmV20w",
    authDomain: "track-expenses1.firebaseapp.com",
    databaseURL: "https://track-expenses1.firebaseio.com",
    projectId: "track-expenses1",
    storageBucket: "track-expenses1.appspot.com",
    messagingSenderId: "981308955139"
 };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
