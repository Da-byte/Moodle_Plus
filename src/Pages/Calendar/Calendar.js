import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import "./Calendar.css";
import Button from "react-bootstrap/Button";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";

import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";

class Calendar extends Component {

    state = {
        authenticated: false,
        user: null,
        ModalShow: false,
        message: "Not implemented!",
        title: "Calendar option"
    }

    constructor(props) {
        super(props);
        this.onNotImplemented = this.onNotImplemented.bind(this);
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

    onNotImplemented() {
        this.setState({
            ModalShow: true
        })
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
                        <span className="headerText">Calendar -  prototype</span>
                        <CollapsedNavbar />
                    </div>
                    <div className="container_div" >
                        <div className="itemRow">
                            <div className="events_button">
                                <Button className="border_radius_extended" variant="info" onClick={this.onNotImplemented}>
                                    {"< Previous Week"}
                                </Button>
                            </div>
                            <div className="messages_button">
                                <Button className="border_radius" variant="info" onClick={this.onNotImplemented}>
                                    {"Next Week >"}
                                </Button>
                            </div>
                        </div>
                        <div className="itemRow">
                            <div className="mondayImgBackgroud">
                                <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }} onClick={this.onNotImplemented}>
                                    <label>1st March</label><br />
                                    <label>Transition Meeting at 09:30</label><br />
                                    <label> Meeting with Mark at 15:00</label><br />
                                    <label>BR Team Meeting at 17:30</label><br />
                                    <label> SU Event at 18:00</label>
                                </div>
                            </div>
                            <div className="tuesdayImgBackgroud">
                                <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }} onClick={this.onNotImplemented}>
                                    <label>2st March</label><br />
                                    <label>BR Seminar at 12:00</label><br />
                                    <label>Aiesec Team Meeting at 13:00</label>
                                </div>
                            </div>
                            <div className="wednesdayImgBackgroud">
                                <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }} onClick={this.onNotImplemented}>
                                    <label>3st March</label><br />
                                    <label>IMB No Detriment Policy Meeting at 09:00</label><br />
                                    <label>Transition Project Meeting at 13:00</label><br />
                                    <label> SU Event at 18:00</label>
                                </div>
                            </div>
                            <div className="thursdayImgBackgroud">
                                <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }} onClick={this.onNotImplemented}>
                                    <label>4st March</label><br />
                                    <label>DB Lab at 11:00</label><br />
                                    <label>STB Seminar at 15:30</label>
                                </div>
                            </div>
                            <div className="fridayImgBackgroud">
                                <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }} onClick={this.onNotImplemented}>
                                    <label>5st March</label><br />
                                    <label>No commitments yet!</label>
                                </div>
                            </div>
                            <div className="saturdayImgBackgroud">
                                <a onClick={this.onNotImplemented}>
                                    <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }}>
                                        <label>6st March</label><br />
                                        <label>No commitments yet!</label>
                                    </div>
                                </a>
                            </div>
                            <div className="sundayImgBackgroud">
                                <a onClick={this.onNotImplemented}>
                                    <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }}>
                                        <label>7st March</label><br />
                                        <label>No commitments yet!</label>
                                    </div>
                                </a>
                            </div>
                            <div className="plusImgBackgroud">
                                <a onClick={this.onNotImplemented}>
                                    <div className="text_box" style={{ fontSize: "xx-small", textAlign: "justify" }}>
                                        <label>Add more!</label>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                </Container>
            </div>
        );
    }
}

export default Calendar;
