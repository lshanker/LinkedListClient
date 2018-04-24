import React, { Component } from 'react';
import { db } from '../firebase';
import ModeratorForm from './ModeratorForm';

class ModeratorFormContainer extends Component {
    

    constructor(props){
        super(props);

        console.log("in constructor")

        this.state = {
          emails : null,
          currentEmail : null,
          currentEmailId: null,
          currentEmailIndex: 0,
          numEmails: 0,
        }

    }
  
//   onSubmit = (event) => {
//         event.preventDefault();
//         console.log(this.props.listId);
//         db.doDeleteList(this.props.listId);

//     }

    selectEmailNoList = (i) => {
        console.log('in select email' + i);
        var list = this.state.emails;
        var counter = 0;
        for(var emailId in list){
            console.log(emailId);
            if(counter == i){
                console.log('here1');
                this.setState({currentEmail : list[emailId]})
                this.setState({currentEmailId : emailId})
            }
            counter++;
        }
    }

    selectEmail = (list, i) => {
        console.log('in select email with list');
        var counter = 0;
        for(var emailId in list){
            console.log(emailId);
            if(counter == i){
                console.log('here1');
                this.setState({currentEmail : list[emailId]})
                this.setState({currentEmailId : emailId})
            }
            counter++;
        }

        this.setState({numEmails : counter})
    }
    
    componentWillMount(){

        console.log("in componentWillMount")

        this.setState({
            emails: null,
            currentEmail: null,
        })

        db.continuousGetModEmails(this.props.listId, (snapshot) => {
            console.log(snapshot.val());
            this.setState({emails : snapshot.val()});
            console.log("emails: " + this.state.emails);
            this.selectEmail(snapshot.val(), 0);         
        });
    }

    getNextEmail = () => {
        if(this.state.currentEmailIndex >= this.state.numEmails - 1){
            return;
        }
        this.selectEmailNoList(this.state.currentEmailIndex + 1);
        this.setState({currentEmailIndex : this.state.currentEmailIndex + 1});
    }

    getPreviousEmail = () => {
        if(this.state.currentEmailIndex <= 0){
            return;
        }
        this.selectEmailNoList(this.state.currentEmailIndex - 1);
        this.setState({currentEmailIndex : this.state.currentEmailIndex - 1});
    }

    removeCurrentEmail = () => {
        console.log('in remove email ' + this.state.currentEmailIndex);
        var list = this.state.emails;
        delete list[this.state.currentEmailId];
        if(!!this.state.emails){
            //No emails left in queue
            this.setState({currentEmail : null});
            this.setState({currentEmailId : null});
            this.setState({currentEmailIndex : 0});
        }else{

            if(this.state.currentEmailIndex === this.state.numEmails - 1){
                var newIndex = this.state.currentEmailIndex - 1;
                this.setState({currentEmailIndex : newIndex});
            }
    
            this.selectEmailNoList(this.state.currentEmailIndex);
        }

        this.getPreviousEmail();
    }

    render(){

        return(
            <div id="moderatorFormContainer-root">
                {/* <form onSubmit={this.onSubmit}>
                    <button className="btn #4a148c red darken-4">Delete Current List</button>
                </form> */}

                <ModeratorForm  
                    listId = {this.props.listId} 
                    email = {this.state.currentEmail} 
                    emailId = {this.state.currentEmailId}
                    removeEmail = {this.removeCurrentEmail.bind(this)}/>
                <button 
                    className = "btn btn-outline-primary"
                    disabled = {this.state.currentEmailIndex === 0 || this.state.numEmails == 0}
                    onClick = {() => {this.getPreviousEmail()}}>
                    <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                </button>
                <button 
                    className = "btn btn-outline-primary"
                    disabled = {this.state.currentEmailIndex === (this.state.numEmails - 1) || this.state.numEmails == 0}
                    onClick = {() => {this.getNextEmail()}}>
                    <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </button>
                {this.state.numEmails == 0 && <p>This list has no pending emails</p>}
            </div>
        )
    }
}

export default ModeratorFormContainer;