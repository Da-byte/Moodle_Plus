import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./home_page.css";
import Button from "react-bootstrap/Button";
import { IoMdArrowRoundForward } from 'react-icons/io';
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import JoinMeeting from '../Conference/JoinMeeting';

import app from "../../firebase/firebase";

class home_page extends Component {

    state = {
        authenticated: false,
        user: null,
        loading: true,
        profile: null,
        profileId: null,
        JoinMeetingShow: false,
    }

    loadProfile = async (userId) => {
        try {
            const profileData = (
                await app
                    .firestore()
                    .collection("user_profiles")
                    .where("uid", "==", userId)
                    .get()
            ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (profileData && profileData.length > 0) {
                let profile = profileData[0];
                this.setState({
                    profile: profile,
                    loading: false,
                    profileId: profileData[0].id
                });
            } else {
                this.props.history.push("./profile");
            }
        } catch (error) {
            console.log(error)
        }

    }
    componentDidMount = async () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    user: user,
                });
                this.currentUserId = user.uid;
                this.loadProfile(user.uid);

            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                });
                this.currentUserId = null;
            }
        });
    }
    redirectTo(url) {
        this.props.history.push(url)
    }
    render() {
        if (this.state.loading)
            return (
                <div>
                    Loading....
                </div>
            )
        else
            return (
                <div className="homepageBackground" style={{width:"100%", minHeight:"100vh"}}>
                    <JoinMeeting
                        show={this.state.JoinMeetingShow}
                        onHide={() => {
                            this.setState({
                                JoinMeetingShow: false,
                            })
                        }}
                        onJoin={() => {
                            this.setState({
                                JoinMeetingShow: false,
                            });
                            this.redirectTo("./conference");
                        }}
                    />
                    <Container style={{ position: "relative" }}>
                        <CollapsedNavbar />
                        <br />
                        <div className="welcome_text_box">
                            Welcome back, {this.state.profile.First_Name + " " + this.state.profile.Last_Name}!
                    </div>
                        <br />
                        <div className="container_div" >
                            <div className="itemRow">
                                <div className="meetingImgBackgroud">
                                    <div className="text_box" onClick={() => this.props.history.push("./conference")}>
                                        New Meeting <IoMdArrowRoundForward />
                                    </div>
                                </div>
                                <div className="joinImgBackgroud">
                                    <div className="text_box" onClick={() => this.setState({JoinMeetingShow:true})}>
                                        Join <IoMdArrowRoundForward />
                                    </div>
                                </div>
                                <div className="calendarImgBackgroud">
                                    <div className="text_box" onClick={() => this.props.history.push("./calendar")}>
                                        Calendar <IoMdArrowRoundForward />
                                    </div>
                                </div>
                                <div className="assesmentImgBackgroud">
                                    <div className="text_box" onClick={() => this.props.history.push("./assessments")}>
                                        Assessments <IoMdArrowRoundForward />
                                    </div>
                                </div>
                                <div className="reportImgBackgroud">
                                    <div className="text_box" onClick={() => this.props.history.push("./report")}>
                                        Report <IoMdArrowRoundForward />
                                    </div>
                                </div>
                                <div className="profileImgBackgroud">
                                    <a onClick={() => this.props.history.push("/profile")}>
                                        <div className="text_box" >
                                            Profile <IoMdArrowRoundForward />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="itemRow">
                                <div className="events_button">
                                    <Button className="border_radius_extended" variant="info" onClick={() => this.props.history.push("./events")}>
                                        Upcomming Events
                                </Button>
                                </div>
                                <div className="messages_button">
                                    <Button className="border_radius" variant="info" onClick={() => this.props.history.push("./messages")}>
                                        Messages
                                </Button>
                                </div>
                            </div>
                        </div>
                    </Container >
                </div >
            );
    }
}

export default home_page;
