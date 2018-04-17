import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import * as urls from '../constants/urls'
import { link } from 'fs';

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
                    <p>{this.state.linkText}</p>
                    <CopyToClipboard 
                        text={this.state.linkText}
                        onCopy={ () => console.log('copied')}>
                        <button>Copy to clipboard</button>
                    </CopyToClipboard>
                    <br/>
                    <p>Or you can send them this code: {this.props.currentListId} </p>
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