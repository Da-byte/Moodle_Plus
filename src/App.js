import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import app from "./firebase/firebase";
import PrivateRoute from "./hoc/PrivateRoute";
import home_page from "./Pages/HomePage/home_page";
import login from './Pages/Login/login';
import CreateProfileContainer from './Pages/Profile/CreateProfile/CreateProfileContainer';
import Messages from "./Pages/Messages/Messages";
import Events from "./Pages/Events/Events";
import Conference from "./Pages/Conference/Conference";
import Calendar from "./Pages/Calendar/Calendar";
import Assessments from "./Pages/Assessments/Assessments";
import Report from "./Pages/Report/Report";
import MessagesChat from "./Pages/MessagesChat/MessagesChat";
import Tutorial from "./Pages/Tutorial/Tutorial"


class App extends Component {
  state = { authenticated: false, user: null, loading: true };

  componentDidMount = async () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        });
      }
    });
  }
  render() {
    if (this.state.loading) return (<div>Loading...</div>)
    else
      return (
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={login} />
              <PrivateRoute exact path="/profile" component={CreateProfileContainer} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/home" component={home_page} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/messages" component={Messages} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/events" component={Events} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/conference" component={Conference} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/calendar" component={Calendar} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/assessments" component={Assessments} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/report" component={Report} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/chats" component={MessagesChat} authenticated={this.state.authenticated} />
              <PrivateRoute exact path="/tutorial" component={Tutorial} authenticated={this.state.authenticated} />
            </Switch>
          </Router>
        </div>
      );
  }

}

export default App;
