import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imageZoom from "../../images/Zoom.png"
import Image from "react-bootstrap/Image";
import "./ModalMessage.css";

function ModalMessage(props) {
    return (
        <Modal
            {...props}
            id="main-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={'static'}
            keyboard={false}
            dialogClassName="modal-90w"
        >
            <Modal.Header closeButton >
                {props.title}
            </Modal.Header>
            <Modal.Body>
                {props.message}
                <div>
                    {props.setting && (<Image src={imageZoom} fluid></Image>)}
                </div>
                {props.reaction && (<div className="reactionImgBackgroud">
                </div>)}
            </Modal.Body>
            <Modal.Footer>
                <Button className="border_radius_extended" style={{width : "15em"}}  onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(ModalMessage);