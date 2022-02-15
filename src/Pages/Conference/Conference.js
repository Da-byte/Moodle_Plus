import React, { Component } from 'react';

import "./Conference.css";
import Button from "react-bootstrap/Button";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import defaultProfilePic from "../../images/default_profile_pic.png";

import app from "../../firebase/firebase";
import ModalMessage from "../ModalMessage/ModalMessage";
import ChatModal from "./ChatModal"

class Conference extends Component {

    state = {
        authenticated: false,
        user: null,
        ModalShow: false,
        ChatShow :false,
        message: "Not implemented!",
        title: "Meeting option"
    }
    constructor(props) {
        super(props);
        this.onNotImplemented = this.onNotImplemented.bind(this);
        this.onChatModaulShow = this.onChatModaulShow.bind(this);
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
    onChatModaulShow (){
        this.setState({
            ChatShow: true
        })
    }
    onNotImplemented(state) {
        this.setState({
            ModalShow: true
        })

        if (state === "settings") {
            this.setState({
                settingsShow: true
            })
        }
        if (state === "reaction") {
            this.setState({
                reactionShow: true
            })
        }
    }
    render() {
        return (
            <div className="homepageBackground" style={{ position: "relative", height: "100vh" }}>
                <ModalMessage
                    title={this.state.title}
                    message={this.state.message}
                    show={this.state.ModalShow}
                    setting={this.state.settingsShow}
                    reaction={this.state.reactionShow}
                    onHide={() => {
                        this.setState({
                            ModalShow: false,
                            reactionShow: false,
                            settingsShow :false
                        })
                    }}
                />

                <ChatModal
                    show={this.state.ChatShow}
                    onHide={() => {
                        this.setState({
                            ChatShow: false,
                        })
                    }}
                />
               
                <div className="pageHeader">
                    <span className="headerText">Conference - prototype</span>
                    <CollapsedNavbar />
                </div>
                <div className="container_div" style={{ height: "88%" }}>
                    <div className="itemRow" >
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                    </div>
                    <div style={{ backgroundColor: "white", height: "82%" }}>
                        video
                    </div>
                    <div className="text_box" style={{ height: "4em" }}>
                        <div className="itemRow" style={{ position: "absolute", bottom: "0px" }} >
                            <Button className="chatBtn" onClick={this.onNotImplemented}>
                                Mute
                           </Button>
                            <Button className="chatBtn" onClick={this.onNotImplemented}>
                                Start video
                           </Button>
                            <Button className="chatBtn" onClick={()=> this.onNotImplemented("settings")}>
                                Settings
                           </Button>
                            <Button className="chatBtn" onClick={this.onNotImplemented}>
                                Share screen
                           </Button>
                            <Button className="chatBtn" style={{ backgroundColor: "red" }} onClick={this.onNotImplemented}>
                                End meeting
                           </Button>
                            <Button className="chatBtn" onClick={this.onNotImplemented}>
                                Record
                           </Button>
                            <Button className="chatBtn" onClick={() => this.onNotImplemented("reaction")}>
                                Reaction+
                           </Button>
                            <Button className="chatBtn" onClick={this.onNotImplemented}>
                                Br-Rooms
                           </Button>
                            <Button className="chatBtn" onClick={this.onChatModaulShow}>
                                Chat
                           </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Conference;
