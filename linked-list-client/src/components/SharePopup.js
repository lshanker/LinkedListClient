import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import * as urls from '../constants/urls'
import { link } from 'fs';

import './SharePopup.css';

class SharePopup extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            linkText: '',
        }
    }

    componentDidMount(){
        this.setState({"linkText": urls.CLIENT + "subscribe?listId=" + this.props.currentListId})
    }

    render(){
        return(
            <div id="sharePopup-root">
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleForm}>
                <ModalBody>
                    <p>Share your list via this link:</p>
                    <div class="card mx-auto">
                        <div class="card-body">
                         <p>{this.state.linkText}</p>
                        </div>
                        <CopyToClipboard 
                        text={this.state.linkText}
                        onCopy={ () => console.log('copied')}>
                        <button type="button" class="btn btn-info"><i class="fa fa-clipboard"></i> Copy Link</button>
                    </CopyToClipboard>
                    </div>
                    <br/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => this.props.toggle()}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
    
        </div>
        
        )
    }

}

export default SharePopup;