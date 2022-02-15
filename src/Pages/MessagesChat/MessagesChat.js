import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import Button from "react-bootstrap/Button";
import app from "../../firebase/firebase";
import "./MessagesChat.css";
import CollapsedNavbar from "../../Components/Navbar/CollapsedNavbar";

import MatchesList from "./MatchesList"

export default class MessagesChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: app.auth().currentUser,
            chats: [],
            content: "",
            readError: null,
            writeError: null,
            loadingChats: false,
            modalShow: null,
            documentModalShow: null,
            modalReportShow: null,
            modalConfirmationShow: false,
            loading: true,
            confirmationMessage: null,
            confirmationMessage_header: null,
            blockConfirmation: null,
            chatId: null, // real time DB chat ID
            blockedByPeerUser: false,
            currentChat: null,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleprofile = this.handleprofile.bind(this);
        this.onMatchesListCallback = this.onMatchesListCallback.bind(this);
        this.currentPhotoFile = null;
        this.myRef = React.createRef();
    }


    handleClose = () => this.setState({ modalShow: false });
    handleShow = () => this.setState({ modalShow: true });

    documentHandleClose = () => this.setState({ documentModalShow: false });
    documentHandleShow = () => this.setState({ documentModalShow: true });

    handleReportShow = () => this.setState({ modalReportShow: true });
    handleReportClose = () => this.setState({ modalReportShow: false });

    handleConfirmationShow = () => this.setState({ modalConfirmationShow: true });
    handleConfirmationClose = () => this.setState({ modalConfirmationShow: false });


    getChatByGroupChatId = async (groupChatId) => {

        const UserChat = (
            await app
                .firestore()
                .collection("user_chats")
                .where("ChatId", "==", groupChatId)
                .get()
        ).docs.map((doc) => ({ ...doc.data(), profile: doc.data().PeerUserProfile, id: doc.id }));

        this.setState({ currentChat: UserChat[0] })
    }


    saveChat = async (currentUserId, currentPeerUserId, groupChatId, CurrentPeerProfileId, PeerUserProfile,
        CurrentUserProfileId, UserProfile) => {
        if (currentPeerUserId) {
            try {
                await app.firestore().collection("user_chats").add({
                    ChatId: groupChatId,
                    blockedByUser: false,
                    blockedByPeerUser: false,
                    PeerUserId: currentPeerUserId,
                    PeerProfileId: CurrentPeerProfileId,
                    PeerUserProfile,
                    UserId: currentUserId,
                    UserProfileId: CurrentUserProfileId,
                    UserProfile,
                    lastMessage: ""
                }).then((doc) => {
                    this.getChatByGroupChatId(groupChatId)
                });
            } catch (error) {
                alert("Save chat error: " + error);
            }
        }
    }

    updateChatPeerProfile = async (chatId, UserProfile) => {
        if (chatId) {
            try {
                await app.firestore().collection("user_chats").doc(chatId).update({
                    PeerUserProfile: UserProfile
                }).then(() => {
                });
            } catch (error) {
                alert("update profile chat error : " + error);
            }
        }
    }
    updateChatLastMessage = async (chatId, message) => {
        if (chatId) {
            try {
                await app.firestore().collection("user_chats").doc(chatId).update({
                    lastMessage: message
                }).then((doc) => {

                });
            } catch (error) {
                alert("update profile chat error : " + error);
            }
        }
    }

    loadChat = async (currentUserId, currentPeerUserId) => {

        this.setState({ readError: null, loadingChats: true });

        if (
            this.hashString(currentUserId) <= this.hashString(currentPeerUserId)
        ) {
            this.groupChatId = `${currentUserId}-${currentPeerUserId}`;
        } else {
            this.groupChatId = `${currentPeerUserId}-${currentUserId}`;
        }
        this.setState({
            chatId: this.groupChatId
        })

        const matchedChat = (
            await app
                .firestore()
                .collection("user_chats")
                .where("ChatId", "==", this.groupChatId)
                .get()
        ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        var blockedChat = false;

        if (matchedChat.length > 0) {
            blockedChat = matchedChat[0].blockedByPeerUser;
            this.setState({ currentChat: matchedChat[0] })
            // check if this chat wa initiated by partner and switch IDs
            if (matchedChat[0].UserId !== currentUserId) {
                var temp = currentUserId;
                currentUserId = currentPeerUserId;
                currentPeerUserId = temp;
            }
        }

        this.setState({ blockedByPeerUser: blockedChat })

        //if (blockedChat == true) { return } // no need to continue as long as the chat is blocked

        const UserProfile = (
            await app
                .firestore()
                .collection("user_profiles")
                .where("uid", "==", currentUserId)
                .get()
        ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        this.setState({ UserProfile: UserProfile[0] });

        const PeerUserProfile = (
            await app
                .firestore()
                .collection("user_profiles")
                .where("uid", "==", currentPeerUserId)
                .get()
        ).docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if (PeerUserProfile.length > 0) {

            if (matchedChat.length === 0) {

                await this.saveChat(currentUserId, currentPeerUserId, this.groupChatId,
                    PeerUserProfile[0].id, PeerUserProfile["0"],
                    UserProfile[0].id, UserProfile["0"],
                ).then(() => {
                });
            } else {
                await this.updateChatPeerProfile(matchedChat[0].id, PeerUserProfile["0"]).then(() => {
                });
            }
        }

        this.setState({ loading: false });

        const chatArea = this.myRef.current;

        if (chatArea) {
            try {
                db.ref("chats")
                    .child(this.groupChatId)
                    .on("value", (snapshot) => {
                        let chats = [];
                        snapshot.forEach((snap) => {
                            chats.push(snap.val());
                        });

                        chats.sort(function (a, b) {
                            return a.timestamp - b.timestamp;
                        });

                        this.setState({ chats });

                        chatArea.scrollBy(0, chatArea.scrollHeight);
                        this.setState({ loadingChats: false });
                    });
            } catch (error) {
                console.log("error on loa chats")
                this.setState({ readError: error.message, loadingChats: false, });
            }
        }
    }
    componentDidMount = async () => {
        
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    user: user,
                    partnerChatId: null
                });
                this.currentUserId = user.uid;
                try {
                    this.loadChat(user.uid, localStorage.getItem("currentPeerUser")).then(() => {
                        localStorage.removeItem("currentPeerUser");
                    });
                } catch (error) {
                    this.setState({
                        loading: false
                    });
                    localStorage.removeItem("currentPeerUser");
                }

            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                });
                this.currentUserId = null;
            }
        });

    }

    hashString = (str) => {
        let hash = 0;
        for (let i = 0; str && i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    handleChange(event) {
        this.setState({
            content: event.target.value,
        });
    }

    async handleSubmit(event) {
        if (this.state.content === "") return;
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await db.ref("chats").child(this.groupChatId).push({
                content: this.state.content,
                isImg: "false",
                isAudio: "false",
                isVideo: "false",
                isDoc: "false",
                timestamp: Date.now(),
                uid: this.currentUserId,
            });
            this.updateChatLastMessage(this.ChatId, this.state.content);
            this.setState({ content: "" });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }

    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${d.getMonth() + 1
            }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    handleprofile(uid) {
        localStorage.setItem("currentPeerProfileUserId", uid);
        this.props.history.push("/profileview");
    }

    onPartnerSelect = async (user) => {
        if (!user) return;
        try {
            await this.loadChat(user.UserId, user.PeerUserId).then(() => {
            });
        } catch (error) {
            console.log("load chat messages error onClick: " + error);
        }
    }


    onMatchesListCallback = async (user) => {
        if (this.state.currentChat) return;
        if (!user) return;
        await this.onPartnerSelect(user)
    }

    renderChatProfile = ({ Chat, ...props }) => {
        var firstname = null;
        var lastname = null;
        var profile = null;

        if (Chat) {
 
            var PartnerProfileId = null;
            var PartnerUserId = null;
            var PartnerProfile = null;

            var UserProfileId = null;
            var UserProfile = null;
            var UserId = null;

            if (this.currentUserId === Chat.UserId) {
                PartnerProfileId = Chat.PeerProfileId;
                PartnerUserId = Chat.PeerUserId;
                PartnerProfile = Chat.PeerUserProfile;
                UserProfileId = Chat.UserProfileId;
                UserProfile = Chat.UserProfile;
                UserId = Chat.UserId;
                profile = PartnerProfile

            } else {
                PartnerProfileId = Chat.UserProfileId;
                PartnerUserId = Chat.UserId;
                PartnerProfile = Chat.UserProfile;
                UserProfileId = Chat.PeerProfileId;
                UserProfile = Chat.PeerUserProfile;
                UserId = Chat.PeerUserId;
                profile = PartnerProfile
            }
            firstname = profile.First_Name;
            lastname = profile.Last_Name;
        } else {
            firstname = "First name";
            lastname = "Last name";
        }
        return (
            <div style={{ width: "100%" }} className="topChatPartnerDetails">
                <div style={{ width: "95%" }}>
                    <div> {firstname} {lastname} </div> <br></br>
                    <div className="circle"></div>
                </div>
            </div>
        )
    };

    renderChat = ({ ref, ...props }) => {
        return (
            <div className="chat-area" ref={this.myRef}>
                {/* loading indicator */}
                {this.state.loadingChats ? (
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    ""
                )}
                {/* chat area */}
                {this.state.chats.map((chat) => {
                    return (
                        <p
                            key={chat.timestamp}
                            className={
                                "chat-bubble " +
                                (this.currentUserId === chat.uid ? "current-user" : "")
                            }
                        >
                            {chat.isImg === "true" && (
                                <img src={chat.content} alt="imgPic" />
                            )}
                            {chat.isAudio === "true" && (
                                <>
                                    <Button onClick={this.playAudio}>Play Audio</Button>
                                    <audio className="audio-element">
                                        <source src={chat.content}></source>
                                    </audio>
                                </>
                            )}
                            {chat.isVideo === "true" && (
                                <>
                                    <Button onClick={this.playVideo}>Play Video</Button>
                                    <video className="video-element">
                                        <source src={chat.content} type="video/mp4" />
                                    </video>
                                </>
                            )}

                            {chat.isDoc === "true" && <source src={chat.content}></source>}
                            <p>
                                {chat.isImg === "false" &&
                                    chat.isAudio === "false" &&
                                    chat.isVideo === "false" &&
                                    chat.isDoc === "false" &&
                                    chat.content}
                            </p>
                            <br />
                            <span className="chat-time float-right">
                                {this.formatTime(chat.timestamp)}
                            </span>
                        </p>
                    );
                })}
            </div>
        )
    };
    renderChatActions = ({ ...props }) => {
        return (
            <div className="chatActionsArea" >
                {this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                ) : null}
                <div style={{ width: "95%", padding: "10px 10px 10px 10px", alignSelf: "center" }} >
                    <textarea
                        className="form-control"
                        name="content"
                        onChange={this.handleChange}
                        value={this.state.content}
                        rows={3}
                        placeholder="Send message"
                        style={{ borderRadius: "10px", width: "100%" }}

                    ></textarea>
                </div>
                {((this.state.currentChat)) ? (
                    <div style={{ alignSelf: "center", paddingRight: "10px" }} className="arrow-right" type="submit" onClick={this.handleSubmit}>
                    </div>
                ) : ("")}
            </div>
        )
    };

    render() {
        const ChatPartnerProfile = this.renderChatProfile;
        const ChatArea = this.renderChat;
        const ChatActions = this.renderChatActions;

        if (this.state.loading)
            return (
                <div>
                    loading ....
                </div>
            );
        else
            return (
                <div className="defaultPage">
                    <div style={{ height: "90px", width: "100%", minHeight: "10%" }} className="chatBase">
                        <div className="pageHeader">
                            <span className="headerText">Messages</span>
                            <CollapsedNavbar />
                        </div>
                    </div>
                    <div style={{ height: "90%" }} className="chatBase">
                        <div style={{ height: "100%", width: "30%" }}>
                            <MatchesList
                                onClick={this.onPartnerSelect}
                                onSelect={this.onMatchesListCallback}
                                chatId={this.state.chatId}
                                partnerChatId={this.state.partnerChatId}
                                onChatId={this.setChatId} />
                        </div>
                        {(true) ? (
                            <div className="chatZone">
                                <div >
                                    <ChatPartnerProfile
                                        Chat={this.state.currentChat}
                                    />
                                </div>
                                <div style={{ height: "80%" }}>
                                    < ChatArea />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <ChatActions />
                                </div>
                            </div>
                        ) : ("The partner blocked you!")}
                    </div>
                </div>
            );
    }
}
