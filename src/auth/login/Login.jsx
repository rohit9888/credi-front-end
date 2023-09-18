import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../../common/Header';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { REACT_APP_LOGIN } = process.env

function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let History = useNavigate()

    useEffect(() => {
        $("#password1").hide()
        $("#password2").hide()
        $("#email1").hide()
        $("#emailcheck").hide();
    }, []);

    $(".validate").focus(function () {
        $("#email1").hide();
        $("#password1").hide();
        $("#password2").hide();
        $("#emailcheck").hide();
    })

    // var url_string = window.location.href;
    // const splitUrl = url_string.split('/')

    // var role = splitUrl[4]
    var url_string = window.location.href;
    const splitUrl = url_string.substr(url_string.lastIndexOf('?') + 1);
    var role = splitUrl.split("=")[1]


    const submitHander = async () => {

        if (!email) {
            $("#email1").show();
        }
        if (!password) {
            $("#password1").show();
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };


            const body = {
                email,
                password,
                role
            }
            console.log(body);

            const { data } = await axios.post(REACT_APP_LOGIN, body, config);

            console.log("data", data)
            // insession store login user data in userInfo key 
            if (data) {
                sessionStorage.setItem("userInfo", JSON.stringify(data));
            }

            if (data.statusCode === 401) {

                $("#emailcheck").show();
                $("#email1").hide();


            }
            if (data.statusCode === 402) {
                $("#password2").show();


            }
            if (data.statusCode === 403) {

                toast.error('Incorrect role ', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                setTimeout(() => {
                    History('/');
                }, 3000)


            }
            if (data.statusCode === 200) {
                console.log("lkdfjsd")
                // sessionStorage.setItem("userInfo", JSON.stringify(data));

                History('/chat');
            }
        } catch (error) {
            console.log("error", error)
        }


    }

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("userInfo"))
        console.log("user info", user)
        // if (user) {
        //     console.log("kdfhkdsfh")
        //     History("/chat")
        // }
    }, []);

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div className="login_form mt-5">
                            <div className="heading">
                                <h3>Login</h3>
                            </div>
                            <div className="login_inputs mt-3">
                                <Form.Group className="mb-3">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control className='validate' type="email" placeholder="Enter your email " onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <p className='error' id="email1">Enter Valid Email</p>
                                    <p className='error' id="emailcheck">Email does not exist </p>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className='validate' type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <p className='error' id="password1">Enter Password</p>
                                    <p className='error' id="password2">Password is not correct </p>

                                </Form.Group>
                                <Link to="/forgot_pwd"><p className='float-right'>Forgot Your Password?</p></Link>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" className='loginBtn' size="lg" onClick={submitHander} >
                                        Login
                                    </Button>
                                </div>


                                <Link to="/sign_up"><p className='signup_account'>Don't have an account? <span>Sign Up</span></p></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}

export default Login