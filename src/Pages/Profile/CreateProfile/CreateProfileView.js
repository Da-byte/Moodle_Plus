import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { FormGroup } from "react-bootstrap";
import FileUploader from "react-firebase-file-uploader";
import Button from "react-bootstrap/Button";
import defaultProfilePic from "../../../images/default_profile_pic.png"
import CollapsedNavbar from "../../../Components/Navbar/CollapsedNavbar";
import "./CreateProfile.css";
import DateAndTimePickers from "../../../Components/DateAndTimePickers";
import ModalMessage from "../../ModalMessage/ModalMessage";


const CreateProfileView = ({
  props,
  onSubmit,
  profile,
  storageRef,
  handleUploadSuccess,
  handleUploadError,
  handleUploadStart,
  handleProgress,
  viewMode,
  onChangeProfile,
  switchToEdit,
  states,
  onSetStates
}) => {
  
  return (
    <div>
      <ModalMessage
        title={states.title}
        message={states.message}
        show={states.ModalShow}
        onHide={() => {
          onSetStates("ModalShow", false)
        }}
      />
      <Container >
        <div className="pageHeader">
          <span className="headerText">Profile</span>
          <CollapsedNavbar />
        </div>
        <div className="container_div" >
          <br/>
          <Form style={{ width: "90%", paddingLeft :"10%" }}>
            <FormGroup>
              <div className="picBackgroud">
                {!profile.profile_pic && (<img src={defaultProfilePic} alt="profile" className="profilePic" />)}
                {profile.profile_pic && (<img src={profile.profile_pic} alt="profile" className="profilePic" />)}
                {!viewMode && (<Form.Group>
                  <div>
                    <label>
                      <a className="uploadLink">Upload a profile picture</a>
                      <FileUploader
                        hidden
                        style={{ width: "100%" }}
                        accept="picture/png"
                        name="picture"
                        text="hello"
                        randomizeFilename
                        storageRef={storageRef}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                      />
                    </label>
                  </div>
                </Form.Group>)}
              </div>
              {viewMode && (<Form.Group className="fistName">
                <Form.Label>{profile.First_Name}</Form.Label><Form.Label style={{ paddingLeft: "10px" }}>{profile.Last_Name}</Form.Label><br />
                <Form.Label>{profile.Course}</Form.Label><Form.Label style={{ paddingLeft: "10px" }}>{profile.Year_of_Study}</Form.Label><br />
              </Form.Group>)}
              {!viewMode && (<div style={{ paddingLeft: "25%" }}>
                <div className="picBackgroud" style={{ width: "65%", textAlign: "justify", color: "white" }}>
                  <Form.Group style={{ textAlign: "justify", paddingLeft: "10%" }}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control style={{ width: "90%" }} name="first_name" onChange={onChangeProfile} value={profile.First_Name}></Form.Control>
                    <Form.Label >Last Name</Form.Label>
                    <Form.Control style={{ width: "90%" }} name="last_name" onChange={onChangeProfile} value={profile.Last_Name}></Form.Control>
                    <Form.Label>Course</Form.Label>
                    <Form.Control style={{ width: "90%" }} name="course" onChange={onChangeProfile} value={profile.Course}></Form.Control>
                    <Form.Label>Year</Form.Label>
                    <Form.Control name="year" as="select" style={{ width: "90%" }} value={profile.Year_of_Study} onChange={onChangeProfile} >
                      <option></option>
                      <option>Bsc 1</option>
                      <option>Bsc 2</option>
                      <option>Bsc 3</option>
                      <option>Bsc 4</option>
                      <option>M1</option>
                      <option>M2</option>
                    </Form.Control>

                    <br />
                  </Form.Group>
                </div>
              </div>)}
              {viewMode && (<div className="links">
                <div style={{ width: "40%" }}></div>
                <Form.Group className="links" style={{ width: "20em" }}>
                  <a onClick={() => {
                    onSetStates("title", "Phone call")
                    onSetStates("message", "Not yet implemented!")
                    onSetStates("ModalShow", true)
                  }}>
                    <div className="phone"> </div>
                  </a>
                  <a onClick={() => props.history.push("/messages")}> <div className="chat" > </div></a>
                  <a target="_blank" rel="noopener noreferrer" href={"mailto:" + profile.Email}>  <div className="email"> </div> </a>
                  <a target="_blank" rel="noopener noreferrer" href={profile.linkedin}> <div className="linkedln"> </div> </a>
                  <a onClick={switchToEdit}><div className="edit" > </div></a>
                </Form.Group>
                <div style={{ width: "40%" }}></div>
              </div>)}
              {viewMode && (<div style={{ paddingLeft: "25%" }}>
                <div className="picBackgroud" style={{ width: "65%", textAlign: "justify", color: "white" }}>
                  <Form.Group style={{ textAlign: "justify", paddingLeft: "10%" }}>
                    <Form.Label>DEPARTMENT</Form.Label><br />
                    <Form.Label>{profile.Departament}</Form.Label><br />
                    <Form.Label>EMAIL</Form.Label><br />
                    <Form.Label>{profile.Email}</Form.Label><br />
                    <Form.Label>TEL</Form.Label><br />
                    <Form.Label>{profile.Tel}</Form.Label><br />
                    <Form.Label>BIO</Form.Label><br />
                    <Form.Label>{profile.Bio}</Form.Label><br />
                    <Form.Label>HOBBIES</Form.Label><br />
                    <Form.Label>{profile.Hobbies}</Form.Label><br />
                    <Form.Label>Linkedin</Form.Label><br />
                    <Form.Label>{profile.linkedin}</Form.Label><br />
                    <Form.Label>D.O.B.</Form.Label><br />
                    <Form.Label>{profile.DOB}</Form.Label><br />
                  </Form.Group>
                </div>
              </div>)}
              {!viewMode && (<div style={{ paddingLeft: "25%" }}>
                <div className="picBackgroud" style={{ width: "65%", textAlign: "justify", color: "white" }}>
                  <Form.Group style={{ textAlign: "justify", paddingLeft: "10%" }}>
                    <Form.Label>DEPARTMENT</Form.Label><br />
                    <Form.Control name="department" as="select" style={{ width: "90%" }} value={profile.Departament} onChange={onChangeProfile}>
                      <option></option>
                      <option>School of Management</option>
                      <option>Engineering</option>
                    </Form.Control>
                    <Form.Label>EMAIL</Form.Label><br />
                    <Form.Control type="email" placeholder="Enter email" name="email" style={{ width: "90%" }} value={profile.Email} onChange={onChangeProfile} ></Form.Control>
                    <Form.Label>TEL</Form.Label><br />
                    <Form.Control name="tel" style={{ width: "90%" }} value={profile.Tel} onChange={onChangeProfile}></Form.Control>
                    <Form.Label>Linkedin</Form.Label><br />
                    <Form.Control name="linkedin" style={{ width: "90%" }} value={profile.linkedin} onChange={onChangeProfile}></Form.Control>
                    <Form.Label>BIO</Form.Label><br />
                    <Form.Control name="bio" as="textarea" rows={3} style={{ width: "90%" }} value={profile.Bio} onChange={onChangeProfile} ></Form.Control>
                    <Form.Label>HOBBIES</Form.Label><br />
                    <Form.Control name="hobbies" as="textarea" rows={3} style={{ width: "90%" }} value={profile.Hobbies} onChange={onChangeProfile} ></Form.Control>
                    <Form.Label>D.O.B.</Form.Label><br />
                    <DateAndTimePickers
                      id="DOB"
                      label="D.O.B"
                      name="dob"
                      Value={profile.DOB}
                      type="date"
                      //defaultValue
                      onChange={onChangeProfile}
                    />
                  </Form.Group><br />
                </div>
              </div>)}

            </FormGroup>

            <Form.Group>
            </Form.Group>
            <div className="bottomButton">
              {!viewMode && (<Button className="submit" onClick={() => onSubmit(true)}>
                Save profile
              </Button>)}

              {viewMode && (<Button className="submit" onClick={() => props.history.push("/home")}>
                Home
              </Button>)}
            </div>
          </Form>
          <br/>
        </div>
      </Container>
    </div >
  );
}

export default CreateProfileView;