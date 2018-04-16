from flask import Flask
from flask import request
import smtplib
import json
import pyrebase
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
@app.route('/mail', methods=['GET'])
def mail():
    gmail_user = 'sorapwns12@gmail.com'  
    gmail_password = 'Dnangel12'
    mailList = request.args.get('list')
    print(mailList)
    msg = MIMEText(request.args.get('message'))
    print(msg)
    msg['Subject'] = request.args.get('subj')
    msg['From'] = "sorapwns12@gmail.com"
    recipients = list()
    config = {
    "apiKey": "AIzaSyCCkJ9iS47Kv54p8NXHNZS5KqBL0S1IkLk",
    "authDomain": "linkedlist-64b5a.firebaseapp.com",
    "databaseURL": "https://linkedlist-64b5a.firebaseio.com",
    "storageBucket": "linkedlist-64b5a.appspot.com",
    }
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
    res = db.child("lists").order_by_key().equal_to(mailList).get()
    vals = res.val()
    x = list(vals[mailList]['members'].items())
    
    for i in x:
        print(i[1])
        recipients.append(i[1])


    msg['To'] = ", ".join(recipients)
    s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    s.ehlo()
    s.login(gmail_user, gmail_password)
    s.sendmail( "sorapwns12@gmail.com", recipients, msg.as_string())
    s.close()
    return "gfdsg", 200

@app.route('/sub', methods=['GET'])
def add():
    mailList = request.args.get('list')
    email = request.args.get('email')
    config = {
    "apiKey": "AIzaSyCCkJ9iS47Kv54p8NXHNZS5KqBL0S1IkLk",
    "authDomain": "linkedlist-64b5a.firebaseapp.com",
    "databaseURL": "https://linkedlist-64b5a.firebaseio.com",
    "storageBucket": "linkedlist-64b5a.appspot.com",
    }
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
    data = json.dumps(email)
    db.child("lists").child(mailList).child("members").push(email)
    
    return "gfdsg"
@app.route('/unsub', methods=['GET'])
def delete():
    mailList = request.args.get('list')
    email = request.args.get('email')
    config = {
    "apiKey": "AIzaSyCCkJ9iS47Kv54p8NXHNZS5KqBL0S1IkLk",
    "authDomain": "linkedlist-64b5a.firebaseapp.com",
    "databaseURL": "https://linkedlist-64b5a.firebaseio.com",
    "storageBucket": "linkedlist-64b5a.appspot.com",
    }
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
#    res = db.child("lists").child(mailList).child("members").get()
    res = db.child("lists").order_by_key().equal_to(mailList).get()
    vals = res.val()
    x = list(vals[mailList]['members'].items())
    rem = ""
    for i in x:
        print(i[1]==email)
        if(i[1] == email):
            rem = i[0]
            break
    if(rem != ""):
        db.child("lists").child(mailList).child("members").child(rem).remove()
    
    return rem




if __name__ == "__main__":
    app.run(debug=True)