import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";
import "./ChatModal.css";
import Chats from "../Chats/Chats"

function ChatModal(props) {
    return (
        <Modal
            {...props}
            id="main-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            keyboard={false}
            dialogClassName="modal-100w"
        >
            <Modal.Header closeButton >
                Meeting chat
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Chats />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default withRouter(ChatModal);