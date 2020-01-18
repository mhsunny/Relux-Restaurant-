 import firebase from 'firebase';
 import firestore from 'firebase/firestore'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "",
    authDomain: "telux-restaurant.firebaseapp.com",
    databaseURL: "https://telux-restaurant.firebaseio.com",
    projectId: "telux-restaurant",
    storageBucket: "telux-restaurant.appspot.com",
    messagingSenderId: "884489817412",
    appId: ""
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({timestampsInSnapshots: true})
  //export firestore database
  export default firebaseApp.firestore();
