import React, { Component } from "react";
import app from "../../firebase/firebase";
import "./MatchesList.css";
import * as PropTypes from 'prop-types';


class MatchesList extends Component {
  state = {
    matchedUsersProfiles: [],
    loading: true,
    currentPeerUser: null,
    authenticated: false,
    user: null,
    resfreshPage: false,
    selectedChatId: null
  };

  constructor(props) {
    super(props);
    this.state.resfreshPage = props.resfreshPage;
  }
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  static propTypes = {
    onSelect: PropTypes.func.isRequired
  };

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

    if (app.auth().currentUser) {
      const UserChats = (
        await app
          .firestore()
          .collection("user_chats")
          .where("UserId", "==", app.auth().currentUser.uid)
          .where("blockedByPeerUser", "==", false)
          .get()
      ).docs.map((doc) => ({ ...doc.data(), profile: doc.data().PeerUserProfile, id: doc.id }));

      const peerUserChars = (
        await app
          .firestore()
          .collection("user_chats")
          .where("PeerUserId", "==", app.auth().currentUser.uid)
          .where("blockedByPeerUser", "==", false)
          .get()
      ).docs.map((doc) => ({ ...doc.data(), profile: doc.data().UserProfile, id: doc.id }));


      const matchedUsers = UserChats.concat(peerUserChars);
      matchedUsers.sort((a, b) => (a.profile.username > b.profile.username) ? 1 : -1);
      var firstChatId = null;
      if (matchedUsers.length > 0) {
        firstChatId = matchedUsers[0].ChatId
      }
      this.props.onSelect(matchedUsers[0]);
      if (this.props.chatId) {
        firstChatId = this.props.chatId
      }
      this.setState({
        matchedUsersProfiles: matchedUsers,
        selectedChatId: firstChatId,
        loading: false,
      });

    }
  }

  onParterClik(user) {

    this.setState({
      selectedChatId: user.ChatId
    });

    this.props.onClick(user);

  }


  render() {
    if (this.state.loading)
      return (
        <div>
          Loading ...
        </div>
      );
    else {
      var matchedUserList = this.state.matchedUsersProfiles.map((user) =>
        <div className="matchedlistuserwhiterectangle"
          style={{ backgroud: (user.ChatId === this.state.selectedChatId) ? ("blue") : ("") }}
          onClick={e => this.onParterClik(user)} >
          <div style={{ width: "100px" }} >
            <div className="photoList">
              <img src={user.profile.profile_pic} alt="profile" className="profilePicList" />
            </div>
          </div>
          <span className="green-circle"></span>
          <div style={{ alignSelf: "center", width: "50%" }} >
            <div>
              {user.profile.First_Name} {user.profile.Last_Name}
            </div>
            <div> {user.lastMessage} </div>
          </div>

          {(user.ChatId === this.state.selectedChatId) ? (
            <span style={{ alignSelf: "justify-content-end", marginRight: "10px" }} className="blue-circle">X</span>
          ) : (<span style={{ alignSelf: "justify-content-end", marginRight: "10px" }} className="blue-circle"></span>)}
        </div >
      )

      return (
        <div className="matchedlistuserbluerectangle">
          {matchedUserList}
        </div>
      );
    }
  }
}

export default MatchesList;
