import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import "./AddEvent.css";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import app from "../../firebase/firebase";
import DateAndTimePickers from "../../Components/DateAndTimePickers";

class AddEvent extends Component {

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
            <div className="addEventBackground"  style={{width:"100%", minHeight:"100vh"}}>
                <Container style={{ position: "relative" }}>
                    <div className="pageHeader">
                        <span className="headerText" style={{height : "5em"}}>
                            Update or add new events. This is for app admins only - to get access make sure to be marked as an admin in the user data source.
                       </span>
                    </div>
                    <div className="container_div" style={{ height: "auto !important" }}>

                        <Form.Label>Event name*</Form.Label>
                        <Form.Control placeholder="Enter event name" name="eventname" ></Form.Control>
                        <Form.Label>Start Date</Form.Label>
                        <DateAndTimePickers
                            id="DOB"
                            name="dob"
                            type="date"
                        />
                        <Form.Label>End date (only fill in for multi day events)</Form.Label><br />
                        <DateAndTimePickers
                            id="DOB"
                            name="dob"
                            type="date"
                        />
                        <Form.Label>Start time</Form.Label><br />
                        <DateAndTimePickers
                            id="DOB"
                            label="Start Data"
                            name="dob"
                            type="time"
                        />
                        <Form.Label>End time</Form.Label><br />
                        <DateAndTimePickers
                            id="DOB"
                            label="Start Data"
                            name="dob"
                            type="time"
                        />
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter Addres" name="address" ></Form.Control>
                        <Form.Label>Link to Google maps</Form.Label>
                        <Form.Control name="googleMapsLink" ></Form.Control>
                        <Form.Label>Event description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Enter Addres" name="address" ></Form.Control>
                        <Form.Label>Attach image?</Form.Label><br/>
                        <Button className="border_radius_extended" variant="info" style={{width : "15em"}}>
                            Choose Image
                        </Button><br/>
                        <Form.Label>Event URL</Form.Label>
                        <Form.Control name="eventURL" ></Form.Control>
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" ></Form.Control>
                        <Form.Label>Key contact Email Address</Form.Label>
                        <Form.Control name="contactAddress" ></Form.Control>


                    </div>
                </Container>
            </div>
        );
    }
}

export default AddEvent;
