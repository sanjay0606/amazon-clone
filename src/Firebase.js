import React from "react";
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAZAiyJ--Slu4xe3QLrHCGOoWtAKkNzeQ4",
    authDomain: "e-clone-81506.firebaseapp.com",
    projectId: "e-clone-81506",
    storageBucket: "e-clone-81506.appspot.com",
    messagingSenderId: "751443283355",
    appId: "1:751443283355:web:6638cfd25ccbdbb0fc653e",
    measurementId: "G-P965TNWLYY"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();

  const auth=firebase.auth();

  export {db,auth};