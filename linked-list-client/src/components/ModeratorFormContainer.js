import React, { Component } from 'react';
import { db } from '../firebase';
import ModeratorForm from './ModeratorForm';

class ModeratorFormContainer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          emails : null,
          currentEmail : null
        }
    }

    selectEmail = (i) => {
        var list = this.state.emails;
        var counter = 0;
        for(var emailId in list){
            if(counter == i){
                this.setState({currentEmail : list[emailId]})
            }
            counter++;
        }
    }
    
    componentDidMount(){
        db.continuousGetEmails(this.props.listId, (snapshot) => {
            console.log(snapshot.val());
            this.setState({emails : snapshot.val()});
            this.selectEmail(0);         
        });
    }
    
    render(){
        return(
            <div id="moderatorFormContainer-root">
                <ModeratorForm  email = {this.state.currentEmail}/>
            </div>
        )
    }
}

export default ModeratorFormContainer;