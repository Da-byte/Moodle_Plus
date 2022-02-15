import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./Messages.css";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import defaultProfilePic from "../../images/default_profile_pic.png";

import app from "../../firebase/firebase";


class Messages extends Component {

    state = {
        authenticated: false,
        loading: true,
        user: null,
        unfilteredProfile: [],
        profiles: [],
        searchBy: "",
    }
    constructor(props) {
        super(props);
        this.loadAllProfileByName = this.loadAllProfileByName.bind(this);
        this.loadAllProfile = this.loadAllProfile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    loadAllProfile = async (userId) => {
        this.setState({
            loading: true
        });
        try {
            const profileData = (
                await app
                    .firestore()
                    .collection("user_profiles")
                    .where("uid", "!=", userId)
                    .get()
            ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (profileData.length > 0) {
                this.setState({ unfilteredProfile: profileData });
                this.setState({
                    profiles: profileData,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false
            });
        }
    }

    loadAllProfileByName = async (filerCriteria) => {
        this.setState({
            loading: true
        });
        try {
            const profileData = (
                await app
                    .firestore()
                    .collection("user_profiles")
                    //.where("uid", "!=", this.currentUserId)
                    //                    .where("First_Name", "==", filerCriteria)
                    //'name', '>=', queryText).where('name', '<=', queryText+ '\uf8ff'
                    .where("First_Name", ">=", filerCriteria)
                    .where("First_Name", "<=", filerCriteria + '\uf8ff')
                    .get()
            ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (profileData.length > 0) {
                this.setState({ unfilteredProfile: profileData });
                let filteredProfile = []; 
                while (profileData.length > 0) {
                    var tmp = profileData.pop();
                    if ((tmp.uid != this.currentUserId)) {
                        filteredProfile.push(tmp);
                    }
                }
  
                this.setState({
                    profiles: filteredProfile,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false
            });
        }

    }
    onChange(evt) {
        this.setState({
            searchBy: evt.target.value
        })
    }

    onSearch() {
        if (this.state.searchBy === "")
            this.loadAllProfile(this.currentUserId)
        else
            this.loadAllProfileByName(this.state.searchBy)
    }
    componentDidMount = async () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    user: user,
                });
                this.currentUserId = user.uid;
                this.loadAllProfile(user.uid);
            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                });
                this.currentUserId = null;
            }
        });
    }

    handleChat(profile) {
        localStorage.setItem("currentPeerUser", profile.uid);
        this.props.history.push("/chats")
    }

    renderProfile = ({ profile, ...props }) => {
        return (
            <div className="itemRow" >
                <div style={{ paddingTop: "1em" }}>
                    {profile.profile_pic && (<img src={profile.profile_pic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />)}
                    {!profile.profile_pic && (<img src={defaultProfilePic} alt="profile" className="profilePic" style={{ width: "6em", height: "6em" }} />)}
                </div>
                <div className="headerText" style={{ backgroundColor: "#f0d497", margin: "10px", width: "85%", textAlign: "justify", height: "7em" }}>
                    <div className="itemRow" style={{ justifyContent: "flex-start", alignItems: "stretch" }}>
                        <div style={{ alignSelf: "flex-start", width: "95%", maxHeight: "6em" }}>
                            <div className="itemCol" style={{ padding: "0" }}>
                                <div>
                                    {profile.First_Name} {profile.Last_Name}
                                </div>
                                <div>
                                    {profile.Course} {profile.Year_of_Study}
                                </div>
                            </div>
                        </div>
                        <div className="bookmarkImgBackgroud" style={{ alignSelf: "flex-end", width: "5%", height: "2em" }} onClick={() => this.handleChat(profile)}>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const Profile = this.renderProfile;
        return (
            <div className="homepageBackground" style={{ width: "100%", minHeight: "100vh" }}>
                <Container style={{ position: "relative" }}>
                    <div className="pageHeader">
                        <span className="headerText">Messages</span>
                        <CollapsedNavbar />
                    </div>
                    <div className="container_div" >
                        <div className="pageHeader">
                            <span className="headerText" style={{ height: "5em" }}>
                                Directory screen with all your organization's people.
                                To replace this sample data with your own, click on the list of people belowm and then click the button "Edit list data"
                                on the right side of the screen.
                            </span>
                        </div>
                        <div className="itemRow" style={{ height: "2.5em" }} >
                            <div className="chatImg" style={{ width: "10%", height: "2em" }}>
                            </div>
                            <div style={{ width: "87%", textAlign: "justify" }}>
                                Start chatting with colleagues
                            </div>
                            <a href="/chats">
                                <div style={{ width: "3%", fontWeight: "bold", fontSize: "x-large" }} onClick={() => this.props.history.push("/chats")}>
                                    {">"}
                                </div>
                            </a>
                        </div>
                        <div className="pageHeader" style={{ height: "2.5.em" }}>
                            <span className="headerText" style={{ textAlign: "justify", height: "2.5em", paddingTop: "0.5em" }}>
                                People
                            </span>
                        </div>
                        <div className="itemRow" style={{ flexWrap: "nowrap" }}>
                            <div style={{ width: "95%" }}>
                                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                    Search
                           </Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>O</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="inlineFormInputGroup" placeholder="Search by First name" onChange={this.onChange} />
                                </InputGroup>
                            </div>

                            <div className="bookmarkImgBackgroud" style={{ width: "5%", height: "2.5em" }} onClick={this.onSearch}>

                            </div>

                        </div>
                        {!this.state.loading && (<div style={{ width: "100", maxHeight: "50vh", overflow: "auto" }}>

                            {this.state.profiles && this.state.profiles.map((profile) => (

                                <Profile profile={profile} key={profile.id} />
                            ))}
                        </div>)}

                    </div>
                </Container>
            </div>
        );
    }
}

export default Messages;
