import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  }).then(() => {
      console.log('here')
  });

//returns all users
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...