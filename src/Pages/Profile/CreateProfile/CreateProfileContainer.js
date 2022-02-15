import React, { Component } from 'react';
import app from "../../../firebase/firebase";
import CreateProfileView from './CreateProfileView'

import "./CreateProfile.css";
import { withRouter } from "react-router";

class CreateProfileContainer extends Component {

  state = {
    enabled: false,
    termsLink: null,
    picture_file: null,
    authenticated: false,
    old_picture_file: null,
    pictureLink: null,
    usrId: null,
    universities: null,
    loading: true,
    viewMode: false,
    updatedProfile: false,
    profileId: null,
    title: "",
    message: "",
    ModalShow: false,
    profile: {
      First_Name: "",
      Last_Name: "",
      Course: "",
      Year_of_Study: 0,
      Departament: "",
      Email: "",
      Tel: "",
      Bio: "",
      Hobbies: "",
      DOB: null,
      linkedin: "",
      profile_pic: null,
    }
  }


  constructor(props) {
    super(props);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  switchToEdit() {
    this.setState({
      viewMode: false
    })
  }
  changeState(newstate, value) {
    if (newstate === "title") {
      this.setState({
        title: value
      })
    }
    if (newstate === "message") {
      this.setState({
        message: value
      })
    }    if (newstate === "ModalShow") {
      this.setState({
        ModalShow: value
      })
    }    
  }
  onChangeProfile(evt) {
    var profile = this.state.profile;
    if (evt.target.name === "first_name") {
      profile.First_Name = evt.target.value
    }
    if (evt.target.name === "last_name") {
      profile.Last_Name = evt.target.value
    }
    if (evt.target.name === "course") {
      profile.Course = evt.target.value
    }
    if (evt.target.name === "year") {
      profile.Year_of_Study = evt.target.value
    }
    if (evt.target.name === "department") {
      profile.Departament = evt.target.value
    }
    if (evt.target.name === "email") {
      profile.Email = evt.target.value
    }
    if (evt.target.name === "tel") {
      profile.Tel = evt.target.value
    }
    if (evt.target.name === "linkedin") {
      profile.linkedin = evt.target.value
    }
    if (evt.target.name === "bio") {
      profile.Bio = evt.target.value
    }
    if (evt.target.name === "hobbies") {
      profile.Hobbies = evt.target.value
    }
    if (evt.target.name === "dob") {
      profile.DOB = evt.target.value
    }
    this.setState({
      profile: profile
    })
  }

  async updateUserPicture(url) {
    var user = this.state.user;
    user.updateProfile({
      photoURL: url
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
      alert(error)
    });
  }

  handleCreateProfile = async event => {
    try {
      var profile = this.state.profile;
      if (this.state.updatedProfile) {
        await app.firestore().collection("user_profiles").doc(this.state.profileId).update(profile);

      } else {
        if (!profile.uid) profile.uid = this.state.user.uid;
        await app.firestore().collection("user_profiles").add(profile).then(res => {
          profile = this.state.profile;
          profile.id = res.id;
          this.setState({
            profile : profile,
            profileId : res.id,
          })
        })
        .catch(err => {
          console.error("DB error: ", err);
        });;
      }
      this.setState({
        viewMode: event,
        updatedProfile : true,
      })
    } catch (error) {
      alert(error);
    }
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
          profileId: profileData[0].id,
          viewMode: true,
          updatedProfile: true
        });
      } else {
        this.setState({
          loading: false,
          viewMode: false,
          updatedProfile: false
        });
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

        this.currentUserId = this.state.user.uid;

        this.loadProfile(user.uid);

      } else {
        this.setState({
          authenticated: false,
          user: null,
          loading: false
        });
        this.currentUserId = null;
      }
    });
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
        <div className="createProfile_background">
          <CreateProfileView
            props={this.props}
            onSubmit={this.handleCreateProfile}
            enabled={this.state.enabled}
            profile={this.state.profile}
            storageRef={app.storage().ref("picture_files")}
            handleUploadStart={(s) => this.setState({ AllowClose: null })}
            handleUploadSuccess={async (s) => app.storage().ref(`picture_files/${s}`).getDownloadURL()
              .then(url => {
                var profile = this.state.profile;
                profile.profile_pic = url;
                this.setState({
                  profile: profile,
                })
                this.updateUserPicture(url);
                this.handleCreateProfile(false);
              }
              )
            }
            handleUpload={this.handleProgress}
            handleUploadError={() => this.setState({ enabled: false })}
            viewMode={this.state.viewMode}
            onChangeProfile={this.onChangeProfile}
            switchToEdit={this.switchToEdit}
            states={this.state}
            onSetStates={this.changeState}
          />
        </div>
      )
  }
}

export default withRouter(CreateProfileContainer);
