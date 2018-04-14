import { db } from './firebase';


/*****Functions for writing to the database******/

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  }).then(() => {
      console.log('here')
  });

export const doCreateList = (listID, name, uid, email) => 
  db.ref(`lists/${listID}`).set({
    name,
  }).then(()=>{
    doAddListMember(listID, uid, email);
  });

export const doAddListMember = (listID, uid, email) => {
  db.ref(`lists/${listID}/members`).set({
    [uid]: email,
  });


  //Get the list's name to store under the user for easier access later
  db.ref(`lists/${listID}/name`).once('value').then((snapshot) => {
    const listName = snapshot.val();
    //Not sure why I have to call update here but ok
    db.ref(`users/${uid}/lists/`).update({
      [listID]: listName,
    });

  });

}


/******Functions for reading from the database******/

//returns all users
export const onceGetUsers = () =>
  db.ref('users').once('value');


//Get all of a user's lists
export const onceGetLists = (uid) =>
  db.ref(`users/${uid}/lists`).once('value');

export const continuousGetList = (uid, func) =>
  db.ref(`users/${uid}/lists`).on('value', function(snapshot){
    func(snapshot)
  });

// Other Entity APIs ...