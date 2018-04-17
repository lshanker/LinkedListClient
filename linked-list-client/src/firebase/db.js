import { db } from './firebase';
import * as urls from '../constants/urls'

/*****Functions for writing to the database******/

function httpGet(queryString, callback)
{
    var theUrl = urls.SERVER + queryString;  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function subscribe(list, email, callback){
  var retVal = httpGet("sub?list=" + list + "&email=" + email, callback);
  return retVal;
}

function email(list, msg, subj, callback){
  //list=anotherlist&message=hi&subj=test
  var retVal = httpGet("email?list=" + list + "&message=" + msg + "&subj=" + subj, callback);
  return retVal;
}


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

export const doStoreEmail = (subject, message, listID, email) => {
  const dateTime = Date.now();
  const timestamp = Math.floor(dateTime / 1000);

  db.ref(`emails/${listID}/${timestamp}`).update({
    subject,
    message,
    listID,
    email,
  })
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