import React, { Component } from 'react';
import { db } from '../firebase';

import './SideList.css'
import MailingListCard from './MailingListCard';


class SideList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: null,
        };
    }

    componentDidMount(){
        db.onceGetLists(this.props.uid).then(snapshot => {
            this.setState(() => ({ lists: snapshot.val() }))
        }
        );

        db.continuousGetList(this.props.uid, this.onMyListsChange);

        
    }

    onMyListsChange = (snapshot) => {
        this.setState({lists: snapshot.val()})
    }

    render(){
        return(
            <div id="sideList-root">
                <p className="h4 text-center py-4">My Lists</p>
                {!!this.state.lists && <CardList mailingListCards={this.state.lists}/>}
            </div>
        )
    }

}


const CardList = ({ mailingListCards }) => 
    <div>
        {Object.keys(mailingListCards).map(key =>
        <MailingListCard 
            key={key}
            name = {key}
            tag = {mailingListCards[key]}
            />
         )}
    </div>

export default SideList;