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
          currentEmailIndex: 0,
          numEmails: 0,
        }

    }

    selectEmailNoList = (i) => {
        console.log('in select email' + i);
        var list = this.state.emails;
        var counter = 0;
        for(var emailId in list){
            console.log(emailId);
            if(counter == i){
                console.log('here1');
                this.setState({currentEmail : list[emailId]})
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

        db.continuousGetEmails(this.props.listId, (snapshot) => {
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

    render(){

        return(
            <div id="moderatorFormContainer-root">
                <ModeratorForm  email = {this.state.currentEmail}/>
                <button 
                    className = "btn btn-outline-primary"
                    disabled = {this.state.currentEmailIndex === 0}
                    onClick = {() => {this.getPreviousEmail()}}>
                    <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                </button>
                <button 
                    className = "btn btn-outline-primary"
                    disabled = {this.state.currentEmailIndex === (this.state.numEmails - 1)}
                    onClick = {() => {this.getNextEmail()}}>
                    <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </button>
            </div>
        )
    }
}

export default ModeratorFormContainer;