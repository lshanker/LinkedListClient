import { db } from './firebase';

// User API

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

export const doAddListMember = (listID, uid, email) =>
  db.ref(`lists/${listID}/members`).set({
    [uid]: email,
  })


//returns all users
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...