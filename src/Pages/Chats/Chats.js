
import React, { Component } from 'react';

import "./Chats.css";
import Button from "react-bootstrap/Button";
import defaultProfilePic from "../../images/default_profile_pic.png";
import Form from 'react-bootstrap/Form';

import app from "../../firebase/firebase";

class Chats extends Component {

    state = {
        authenticated: false,
        user: null,
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
            <div className="chatBackground" style={{ position: "relative", minHeight: "50%" }}>
                <div className="container_div" style={{ height: "100%" }}>
                    <div className="itemRow">

                        <div className="itemCol" style={{  alignSelf:"flex-start", maxHeight : "73vh", maxWidth : "10%", overflow : "auto"}}>
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                            <img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />
                        </div>

                        <div style={{ backgroundColor: "white", width : "90%",maxHeight : "73vh"}}>
                         <div className="itemCol">
                             <div style={{ backgroundColor: "white", width : "100%", height : "60vh" }}>
                               <Form.Control as="textarea" rows={1000} readOnly placeholder="Messages" name="messages" style={{paddingLeft:"10px", width: "100%", height : "60vh"}} ></Form.Control>  
                             </div>
                             <div className="itemRow" style={{ backgroundColor: "white", width : "100%",height : "11vh" }}>
                                  <Form.Control as="textarea" rows={3} placeholder="Enter message" name="address" style={{alignSelf : "flex-start", width: "90%"}} ></Form.Control>
                                  <Button className="border_radius_extended"  style={{width : "6em"}} >Send</Button>
                            </div>
                         </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chats;
