import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddEvent from "./AddEvent"

function AddEventModal(props) {
    return (
        <Modal
            {...props}
            id="main-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton >
                {props.opsType} Event - prototype
            </Modal.Header>
            <Modal.Body>
                <div style={{  maxHeight : "76vh" , overflow : "auto"}}>
                <AddEvent />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="border_radius_extended"  style={{width : "15em"}} onClick={props.onAdd}>Add</Button>
                <Button className="border_radius_extended"  style={{width : "15em"}} onClick={props.onHide}>Close</Button>
            </Modal.Footer>            
        </Modal>
    );
}

export default withRouter(AddEventModal);