
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCCkJ9iS47Kv54p8NXHNZS5KqBL0S1IkLk",
    authDomain: "linkedlist-64b5a.firebaseapp.com",
    databaseURL: "https://linkedlist-64b5a.firebaseio.com",
    projectId: "linkedlist-64b5a",
    storageBucket: "linkedlist-64b5a.appspot.com",
    messagingSenderId: "711867618400"
  };


  if(!firebase.apps.length) {
      firebase.initializeApp(config);
  }

  const auth = firebase.auth();

  export {
      auth,
  };