import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class SharePopup extends Component {
    

    render(){
        return(
            <div id="sharePopup-root">
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleForm}>
                <ModalBody>
                    <p>Link will go here</p>
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