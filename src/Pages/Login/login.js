import React, { Component } from 'react';

import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { BsFillLockFill } from 'react-icons/bs';

import portico from "../../images/portico.jpg";
import app from "../../firebase/firebase";
import firebase from "firebase/app";
import "./login.css";

function ForgotPasswordModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Click on the link below to reset your password with UCL
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a href="https://myaccount.ucl.ac.uk/" target="_blank" rel="noopener noreferrer">Reset your password with UCL</a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      modalShow: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;


    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }

      //Password
      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "Cannot be empty";
      }
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSignIn = async () => {

    await app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((doc) => {
          this.props.history.push("./home")
        }).catch(error => {
          this.handleSignUp()
          this.props.history.push("./home")
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Sign in error " + errorCode + ",  " + errorMessage)
      });
  };

  handleSignUp = async () => {
    //if (email.value.includes("ucl.ac.uk") || email.value.includes("edu")) {
    try {
      await app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          app
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password).then((doc) => {
              this.props.history.push("./home");
            }
            ).catch(error => {
              alert(error)
            })
        })
    } catch (error) {
      alert(error);
    }
  };



  handleChange(e) {
    if (e.target.name === 'email') {
      this.setState({ email: e.target.value })
    }

    if (e.target.name === 'password') {
      this.setState({ password: e.target.value })
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
        this.props.history.push("./home");
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
      <div className="background">
        <Image src={portico} fluid />

        <center>
          <h1 className="title_margin_bottom">Welcome to Moodle+</h1>
          <h3 className="form_margin_top">Enter your access details below</h3>
          <Container>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Row>
                  <Col xs={0.5}>
                    <div className="envelope_margin">
                      <BsFillEnvelopeFill size={24} />
                    </div>
                  </Col>
                  <Col xs={11}>
                    <Form.Control name="email" refs="email" type="email" placeholder="Enter your university email" onChange={this.handleChange} value={this.state.email} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Row>
                  <Col xs={0.5}>
                    <div className="envelope_margin">
                      <BsFillLockFill size={24} />
                    </div>
                  </Col>
                  <Col xs={11}>
                    <Form.Control name="password" refs="password" type="password" placeholder="Enter your university password" onChange={this.handleChange} value={this.state.password} />
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="info" onClick={this.handleSignIn} className="submit_button_css">
                Log in
                        </Button>
            </Form>

            <div className="anchor_margin"><span className="fake-link" onClick={() => this.setState({ modalShow: true })}>Forgot your password?</span></div>

            <ForgotPasswordModal
              show={this.state.modalShow}
              onHide={() => this.setState({ modalShow: false })}
            />
          </Container>
        </center>
      </div>
    );
  }
}

export default login;