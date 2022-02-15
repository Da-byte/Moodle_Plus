import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import "./JoinMeeting.css";

function JoinMeeting(props) {
    return (
        <Modal
            {...props}
            id="main-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            keyboard={false}
            size="md"
        >
            <Modal.Header closeButton >
                Join a meeting
            </Modal.Header>
            <Modal.Body>

                <Form.Label>Enter meeting URL</Form.Label><br />
                <Form.Control type="email" placeholder="Enter conference URL" name="zoom" style={{ width: "90%" }} ></Form.Control>

            </Modal.Body>
            <Modal.Footer>
                <Button className="border_radius_extended" style={{width : "10em"}}  onClick={props.onJoin}>Join</Button>
                <Button className="border_radius_extended" style={{width : "10em"}}  onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(JoinMeeting);