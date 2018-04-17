from flask import Flask
from flask import request, session
import smtplib
import json
import pyrebase
import time
from email.mime.text import MIMEText

app = Flask(__name__)
config = {
    "apiKey": "AIzaSyCCkJ9iS47Kv54p8NXHNZS5KqBL0S1IkLk",
    "authDomain": "linkedlist-64b5a.firebaseapp.com",
    "databaseURL": "https://linkedlist-64b5a.firebaseio.com",
    "storageBucket": "linkedlist-64b5a.appspot.com",
}
isUndo = False
app.secret_key = '\rhj\xe5\x97\xeb\x17\xea\xb6p\xfd\x8b\x81n[\xba\xa7\\d\x0fu\x92\xe5\x85'
@app.route('/')
def hello_world():
    return 'Hello, World!'
@app.route('/mail', methods=['GET'])
def mail():
 #   session['undo'] = False
    #eStatic Auth stuff
    gmail_user = 'sorapwns12@gmail.com'  
    gmail_password = 'Dnangel12'
    #List name
    mailList = request.args.get('list')
    #Firebase auth and recipient generation
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
    res = db.child("lists").order_by_key().equal_to(mailList).get()
    vals = res.val()
    x = list(vals[mailList]['members'].items())
    recipients = list()
    for i in x:
        print(i[1])
        recipients.append(i[1])
    #TLS handshake with GMAIL
    s = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    s.ehlo()
    s.login(gmail_user, gmail_password)
    
    for pers in recipients:
       
        msg = MIMEText(request.args.get('message') + '\n<a href=\"http://10.186.97.108:5000/unsub?list=anotherlist&email='+ pers +'\">Unsubscribe from this list </a>', 'html')
        msg['Subject'] = request.args.get('subj')
        msg['From'] = "sorapwns12@gmail.com"
        msg['To'] = pers
        s.sendmail( "sorapwns12@gmail.com", pers, msg.as_string())
    
   
    s.close()
    
    return "gfdsg", 200

@app.route('/sub', methods=['GET'])
def add():
    mailList = request.args.get('list')
    email = request.args.get('email')
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
    data = json.dumps(email)
    db = firebase.database()
    res = db.child("lists").child(mailList).child("members").get()
    count = 0
    for i in res.each():
        if(i.val() == email):
            count = count + 1
    # print(count)
    if(count == 0):
        db.child("lists").child(mailList).child("members").push(email)

    
    return "gfdsg"
@app.route('/uniqueList', methods=['GET'])
def uniqCheck():
    listName = request.args.get('list')
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
    res = db.child("lists").order_by_key().equal_to(listName).get()
    count = 0
    for i in res.each():
        count = count + 1
    # print(count)
    if(count == 0):
        return "OK", 200
    else:
        return "NOT OK", 406
    # return rem
@app.route('/unsub', methods=['GET'])
def delete():
    mailList = request.args.get('list')
    email = request.args.get('email')
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password("hgsata@gmail.com", "testuser")
    db = firebase.database()
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
    app.run(host='0.0.0.0')
