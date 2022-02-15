
import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./Assessments.css";
import Button from "react-bootstrap/Button";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";

class Assessments extends Component {

    state = {
        authenticated: false,
        user: null,
        ModalShow: false,
        message: "Not implemented!",
        title: "Assesment option"
    }

    constructor(props) {
        super(props);
        this.onNotImplemented = this.onNotImplemented.bind(this);
    }

    onNotImplemented() {
        this.setState({
            ModalShow: true
        })
    }
    componentDidMount = async () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    user: user,
                });
                this.currentUserId = user.uid;
            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                });
                this.currentUserId = null;
            }
        });
    }

    render() {
        return (
            <div className="homepageBackground"  style={{width:"100%", minHeight:"100vh"}}>

                <ModalMessage
                    title={this.state.title}
                    message={this.state.message}
                    show={this.state.ModalShow}
                    onHide={() => {
                        this.setState({
                            ModalShow: false
                        })
                    }}
                />
                <Container style={{ position: "relative" }}>
                    <div className="pageHeader">
                        <span className="headerText">Assessments</span>
                        <CollapsedNavbar props={this.props}/>
                    </div>
                    <div className="container_div" >
                        <div className="itemRow">
                            <div className="events_button">
                                <Button className="border_radius_extended" variant="info" onClick={this.onNotImplemented}>
                                    {"Add more+"}
                                </Button>
                            </div>
                            <div className="messages_button">
                                <Button className="border_radius_extended" variant="info" onClick={() => this.props.history.push("./home")}>
                                    Home
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Accordion defaultActiveKey="-1">
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                SE Individual Article
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>due on 12th March at 17:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                BR Team Journal Artical
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>due on 15th March at 15:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                STB Timed Essay
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>due on 26th March at 15:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                SE Group Project
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>due on 26th March at 17:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                                SE Individual Report
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body>due on 26th March at 17:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                                BR Individual Research Proposal
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="5">
                                            <Card.Body>due on 26th March at 15:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                                <div className="itemRow">
                                    <div style={{ width: "7%", backgroundColor: "#00abd2", height: "auto !important" }}>
                                    </div>
                                    <Card style={{ width: "90%" }}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                                DB Coursework
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="6">
                                            <Card.Body>due on 29th March at 17:00</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Assessments;
