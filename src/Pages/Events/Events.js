import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./Events.css";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";
import AddEventModal from "./AddEventModal";

class Events extends Component {

    state = {
        authenticated: false,
        user: null,
        AddEventShow: false,
        ModalShow: false,
        message: "Not implemented!",
        title: "Assesment option",
        optype: ""
    }
    constructor(props) {
        super(props);
        this.onNotImplemented = this.onNotImplemented.bind(this);
        this.onAddEvent = this.onAddEvent.bind(this);
    }
    onAddEvent(ops) {
        this.setState({
            optype : ops
        })
        this.setState({
            AddEventShow: true
        })
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
            <div className="homepageBackground" style={{ width: "100%", minHeight: "100vh" }}>
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
                <AddEventModal
                    show={this.state.AddEventShow}
                    opsType= {this.state.optype}
                    onHide={() => {
                        this.setState({
                            AddEventShow: false
                        })
                    }}
                    onAdd={() => {
                        this.setState({
                            AddEventShow: false
                        })
                    }}
                />

                <Container style={{ position: "relative" }}>
                    <div className="pageHeader">
                        <span className="headerText">Upcoming events - prototype</span>
                        <CollapsedNavbar />
                    </div>
                    <div className="container_div" style={{ height: "auto !important" }}>
                        <span className="pageHeader">
                            {"This lists all your assessments in date order. Users can search, filter, and bookmark assessments."} <br />
                            {"Note: this doesn't automatically remove past assessments. For this functionality, get in touch with support@moodle+.com"}<br />
                        </span>
                        <div className="itemRow" style={{ flexWrap: "nowrap" }}>
                            <div style={{ width: "90%" }}>
                                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                    Search
                           </Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>O</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="inlineFormInputGroup" placeholder="Search" />
                                </InputGroup>
                            </div>
                            <div className="bookmarkImgBackgroud" style={{ width: "5%", height: "2.5em" }} onClick={() => this.onAddEvent("Add")}>
                            </div>
                            <div className="settingsImgBackgroud" style={{ width: "5%", height: "2.5em" }} onClick={this.onNotImplemented}>
                            </div>
                        </div>
                        <div className="itemRow">
                            <div className="headerText" style={{ backgroundColor: "#f0d497", margin: "10px", textAlign: "justify", height: "6em" }}>
                                <div className="itemRow" style={{ justifyContent: "flex-start" }}>
                                    <div style={{ alignSelf: "flex-start", width: "95%" }}>
                                        23-Mar-2021
                                        </div>
                                    <div className="bookmarkImgBackgroud" style={{ alignSelf: "flex-end", width: "5%", height: "2.5em" }} onClick={() => this.onAddEvent("Edit")}>
                                    </div>
                                </div>
                            </div>
                            <div className="headerText" style={{ backgroundColor: "#f0d497", margin: "10px", textAlign: "justify", height: "6em" }}>
                                <div className="itemRow" style={{ justifyContent: "flex-start" }}>
                                    <div style={{ alignSelf: "flex-start", width: "95%" }}>
                                        23-Mar-2021
                                        </div>
                                    <div className="bookmarkImgBackgroud" style={{ alignSelf: "flex-end", width: "5%", height: "2.5em" }} onClick={() => this.onAddEvent("Edit")}>
                                    </div>
                                </div>
                            </div>
                            <div className="headerText" style={{ backgroundColor: "#f0d497", margin: "10px", textAlign: "justify", height: "6em" }}>
                                <div className="itemRow" style={{ justifyContent: "flex-start" }}>
                                    <div style={{ alignSelf: "flex-start", width: "95%" }}>
                                        23-Mar-2021
                                        </div>
                                    <div className="bookmarkImgBackgroud" style={{ alignSelf: "flex-end", width: "5%", height: "2.5em" }} onClick={() => this.onAddEvent("Edit")}>
                                    </div>
                                </div>
                            </div>
                            <div className="headerText" style={{ backgroundColor: "#f0d497", margin: "10px", textAlign: "justify", height: "6em" }}>
                                <div className="itemRow" style={{ justifyContent: "flex-start" }}>
                                    <div style={{ alignSelf: "flex-start", width: "95%" }}>
                                        23-Mar-2021
                                        </div>
                                    <div className="bookmarkImgBackgroud" style={{ alignSelf: "flex-end", width: "5%", height: "2.5em" }} onClick={() => this.onAddEvent("Edit")}>
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

export default Events;
