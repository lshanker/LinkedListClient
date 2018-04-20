import React, { Component } from 'react';
import { db } from '../firebase';
import ModeratorForm from './ModeratorForm';

class ModeratorFormContainer extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          email : null,
          currentEmail : null
        }
    }
    selectEmail(idx){
        var list = this.state.email;
        var counter = 0;
        for(var emailId in list){
            if(counter == idx){
                this.setState({currentEmail : list[emailId]})    
                console.log(emailId + " " + list[emailId])
                console.log(list[emailId].email)
            }
            counter++;
 
        }
    }
    componentDidMount(){
        db.continuousGetEmails(this.props.listId, (snapshot) => {
            console.log(snapshot.val());
            this.setState({email : snapshot.val()});
            this.selectEmail(0);         
        });
    }
    
    render(){
        return(
            <div id="moderatorFormContainer-root">
                <ModeratorForm currentEmail={this.state.currentEmail} />
            </div>
        )
    }
}

export default ModeratorFormContainer;