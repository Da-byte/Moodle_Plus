import React from 'react';

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FaBars } from 'react-icons/fa'
import {  withRouter } from 'react-router-dom'

import app from "../../firebase/firebase";


//function CollapsedNavbar(props) {
class CollapsedNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this)
    }
    handleRedirect = (e) => {
        //if (e.target.name==="home")
           this.props.history.push(e.target.name);
    }

    render() {
        return (
            <Nav className="justify-content-end">
                <NavDropdown title={<FaBars size={24} />} id="nav-dropdown">
                    <NavDropdown.Item name="./home" onClick={this.handleRedirect} eventKey="3.1">Home</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item name="./conference" onClick={this.handleRedirect}  eventKey="4.1">New Meeting</NavDropdown.Item>
                    <NavDropdown.Item name="./calendar" onClick={this.handleRedirect}  eventKey="4.3">Calendar</NavDropdown.Item>
                    <NavDropdown.Item name="./assessments" onClick={this.handleRedirect}  eventKey="4.4">Assessments</NavDropdown.Item>
                    <NavDropdown.Item name="./report" onClick={this.handleRedirect}  eventKey="4.5">Report</NavDropdown.Item>
                    <NavDropdown.Item name="./profile" onClick={this.handleRedirect}  eventKey="4.6">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item name="./events" onClick={this.handleRedirect}  eventKey="5.1">Upcomming Events</NavDropdown.Item>
                    <NavDropdown.Item name="./messages" onClick={this.handleRedirect}  eventKey="5.2">Messages</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item name="./tutorial" onClick={this.handleRedirect}  eventKey="6.1">Tutorial</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => app.auth().signOut()}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }
}

export default withRouter(CollapsedNavbar);