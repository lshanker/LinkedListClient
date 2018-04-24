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

export const subscribe = (list, email, callback) => {
  var retVal = httpGet("sub?list=" + list + "&email=" + email, callback);
  return retVal;
}

function email(list, msg, subj, callback){
  //list=anotherlist&message=hi&subj=test
  var retVal = httpGet("email?list=" + list + "&message=" + msg + "&subj=" + subj, callback);
  return retVal;
}


export const doCreateUser = (id, username, email, isMod) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  }).then(() => {
      console.log('here')
  });

export const doCreateList = (listID, name, uid, email, isMod) => 
  db.ref(`lists/${listID}`).set({
    name,
    isMod,
  }).then(()=>{
    doAddListMember(listID, uid, email,isMod);
  });

export const doAddListMember = (listID, uid, email, isMod) => {
  db.ref(`lists/${listID}/members/${uid}`).set({
    email,
    isMod
    //[uid]: email,
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


export const doDeleteList = (listID) =>{

  console.log("helloworld");
  console.log(listID);

  const usersInList = db.ref(`lists/${listID}/members`);

  usersInList.on("value", function(snapshot) {
      console.log(snapshot.key);
      console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot) {
        var user = childSnapshot.key;
        db.ref(`users/${user}/lists/${listID}`).remove();
      })
        
        db.ref(`modemails/${listID}`).remove();
        db.ref(`emails/${listID}`).remove();
        db.ref(`lists/${listID}`).remove();
    });
}

/******Functions for reading from the database******/

//returns all users
export const onceGetUsers = () =>
  db.ref('users').once('value');

//Get all of a user's lists
export const onceGetLists = (uid) =>
  db.ref(`users/${uid}/lists`).once('value');

export const onceGetIsMod = (lid) => 
  db.ref(`lists/${lid}/isMod`).once('value');

export const continuousGetList = (uid, func) =>
  db.ref(`users/${uid}/lists`).on('value', function(snapshot){
    func(snapshot)
  });

  export const continuousGetEmails = (lid, func) =>
  db.ref(`emails/${lid}`).on('value', function(snapshot){
    func(snapshot)
  });
// Other Entity APIs ...