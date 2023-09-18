import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom";
import { FaBell } from 'react-icons/fa';

function UserHeader() {
    const navigate = useNavigate();


    let userToken = JSON.parse(sessionStorage.getItem("userInfo"));
    userToken = userToken?.first_name;
    // console.log("user token of header component", userToken)

    // ========user logout function========
    const logout = () => {
        let delete_token = sessionStorage.removeItem("userInfo");
        console.log("delete_token", delete_token)
        navigate("/");
    }


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg={12} className="px-0">
                        <div className="Userheader">
                            <Navbar collapseOnSelect expand="lg">
                                <Container fluid>
                                    <Navbar.Brand href="#home">Credi<b>Block</b></Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">

                                        </Nav>
                                        <Nav>
                                        <Nav.Link href="#"><span className='notification'><FaBell /></span></Nav.Link>
                                        <div className='d-flex'>
                                            <div className="user_profile_img">
                                                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                                            </div>
                                           
                                            <NavDropdown title={userToken} id="collasible-nav-dropdown">
                                            <NavDropdown.Item><Link to="/userProfile">My Profile</Link></NavDropdown.Item>
                                            {/* <NavDropdown.Item href='/userProfile'>My Profile</NavDropdown.Item> */}
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={logout}><Button className='logout_btn' >Logout</Button></NavDropdown.Item>
                                            </NavDropdown>
                                            </div>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserHeader