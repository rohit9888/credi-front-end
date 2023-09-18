import React, { useState,useEffect } from 'react'
import UserHeader from './UserHeader'
import { BsArrowLeft } from 'react-icons/bs';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserEdit } from 'react-icons/fa'
import { BsCameraFill } from 'react-icons/bs'
function UserProfile() {
    const navigate = useNavigate();
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    let userToken = JSON.parse(sessionStorage.getItem("userInfo"));
    let firstName = userToken.data.first_name;
    let lastName = userToken.data.last_name;
    let userId = userToken.data._id;

   
    const edit_Profile = () => {
        setIsEdit(true)
        //  setIsEdit(isEdit => !isEdit)
        setFirstName(firstName)
        setLastName(lastName)
    }

    const update_Profile = () => {
        console.log("user profile id", userId)
        let data = {firstname, lastname}
        console.log(data);
        // navigate("/chat");
    }
   
    
    return (
        <>
            <UserHeader />

            <div className="profile">
                <Container>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                            {isEdit ?
                                <div className="edit_profile">
                                    <h5 className='text-center'>Edit Profile</h5>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="4">
                                            <div className="edit_profile_img">
                                                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="profile_pic" className='img-fluid' />
                                                <div class="wrapper">
                                                    <div class="file-upload">
                                                        <input type="file" />
                                                        <BsCameraFill />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control 
                                                    type="text" 
                                                    placeholder="First Name" 
                                                    className='mt-4'
                                                    value = {firstname}
                                                    onChange={(e)=>setFirstName(e.target.value)}
                                                    name="first_name"
                                                    required
                                                     />

                                            <Form.Control 
                                                    type="text" 
                                                    placeholder="Last Name" 
                                                    className='mt-3'
                                                    value = {lastname}
                                                    onChange = {(e)=>setLastName(e.target.value)}
                                                    name="last_name"
                                                    required
                                                     />

                                            <div className="update_btn">
                                                <Button variant="success" className='mt-3' onClick={update_Profile}>Update Profile</Button>
                                            </div>
                                        </Col>
                                    </Form.Group>

                                </div>
                                :
                                <div className="user_profile">
                                    <div className="icons">
                                        <div className="back_arrow">
                                            <Link to="/chat"><BsArrowLeft /></Link>
                                        </div>
                                        <div className="profile_title d-none">
                                            <h5>My Profile</h5>
                                        </div>
                                        <div className="edit">

                                            {['top'].map((placement) => (
                                                <OverlayTrigger
                                                    key={placement}
                                                    placement={placement}
                                                    overlay={
                                                        <Tooltip id={`tooltip-${placement}`}>
                                                            Edit Profile
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button onClick={edit_Profile}><FaUserEdit /></Button>
                                                </OverlayTrigger>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="profile_img">
                                        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="profile_pic" className='img-fluid' />
                                    </div>
                                    <div className="profile_name">
                                        <h4>{firstName} {lastName}</h4>
                                    </div>
                                </div>

                            }
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default UserProfile