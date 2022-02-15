import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./Report.css";
import Button from "react-bootstrap/Button";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";

class Report extends Component {

    state = {
        authenticated: false,
        user: null,
        ModalShow: false,
        message: "Not implemented!",
        title: "Report option"        
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
                        <span className="headerText">Report card -  protoype</span>
                        <CollapsedNavbar />
                    </div>
                    <div className="container_div" >
                        <div className="itemRow">
                            <div className="events_button">
                                <Button className="border_radius_extended" variant="info" onClick={this.onNotImplemented}>
                                    {"< 2019"}
                                </Button>
                            </div>
                            <div className="messages_button">
                                <Button className="border_radius" variant="info" onClick={this.onNotImplemented}>
                                    {"2021 >"}
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Accordion defaultActiveKey="-1">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                           Software Engineering
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>69%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Database Systems
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>72%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                        Accounting for Decision Makers
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>78%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                        Business Research Methods
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>67%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                        Society, Technology and Behaviour
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="4">
                                        <Card.Body>70%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                        Programming 2
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="5">
                                        <Card.Body>85%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                        Business in the Digital Age
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="6">
                                        <Card.Body>63%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                           Business Analytics
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="7">
                                        <Card.Body>80%</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Report;
