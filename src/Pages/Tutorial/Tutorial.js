import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import "./Tutorial.css";
import Button from "react-bootstrap/Button";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import generalPic from "../../images/126472.png";
import profilePic from "../../images/default_profile_pic.png";
import meetingsPic from "../../images/directory.png";
import plusPic from "../../images/plus.jpg";
import calendarPic from "../../images/calendarHomepage.jpg";
import reportPic from "../../images/reportHomepage (2).png";
import assessmentPic from "../../images/assessmentsHomepage.png";
import messagePic from "../../images/round-btn-chat.png";


import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";

class Tutorial extends Component {

    state = {
        authenticated: false,
        user: null,
        ModalShow: false,
        message: "Not implemented!",
        title: "Tutorial option"
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
                        <span className="headerText">Tutorial - prototype</span>
                        <CollapsedNavbar />
                    </div>
                    <div className="container_div" >
                        <div className="itemCol"style={{  width : "100",  maxHeight : "84vh" , overflow : "auto"}}>
                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={generalPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >1. General</Form.Label> <br />
                                        <Form.Label >An overview of the app...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={profilePic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >2. Profile</Form.Label> <br />
                                        <Form.Label >Edit your profile as you see fit..</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={meetingsPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >3. Meetings</Form.Label> <br />
                                        <Form.Label >Customise your meetings...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={plusPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >4. Settings</Form.Label> <br />
                                        <Form.Label >Learn how apply different settings to your app...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={calendarPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >5. Calendar</Form.Label> <br />
                                        <Form.Label >Make the best use of your calendar...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={reportPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >6. Report</Form.Label> <br />
                                        <Form.Label >Learn how to manage your report card...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={assessmentPic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >7. Assessmentt</Form.Label> <br />
                                        <Form.Label >Understand how to use the assessment tab...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Start Now!
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="itemRow" style={{ alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <img src={messagePic} alt="pic" className="profilePic" />
                                </div>
                                <div style={{ width: "50%", height: "17.6em" }}>
                                    <dev style={{ width: "100%", height: "14em" }}>
                                        <Form.Label style={{ fontWeight: "bold" }} >8. Help us improve!</Form.Label> <br />
                                        <Form.Label >You can send your suggestions by clicking the button below...</Form.Label>
                                    </dev>
                                    <div style={{ width: "100%", height: "3.5em" }}>
                                        <Button className="border_radius" style={{ width: "10em" }} variant="info" onClick={() => this.setState({ ModalShow: true })}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Tutorial;
