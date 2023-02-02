import React, { useState } from "react";
// material icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// components
import { BgBox, Container } from "../styles/Box";
import InputBox from "./InputBox";
import ButtonBox from "./ButtonBox";
// react router
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState(
        {email:"", password:""}
    )
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserLogin({...userLogin, [name]: value});
    }


    const postData = async (e) => {
        e.preventDefault();
        const {email, password} = userLogin;
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password
            })
        });

        switch(res.status) {
            case 200:
                window.alert("You successfully logged in");
                navigate('/homepage');
                break;
            case 401:
                window.alert("Invalid credentials");
                break;
            case 404:
                window.alert("No such user exists");
                navigate('/');
                break;
            case 422:
                window.alert("Please fill empty fields");
                break;
            default:
                window.alert("Some unknown error occured");
                break;
        }
    }


    return (
        <BgBox>
            <Container>
                <form method="post">
                    <div className="head">
                        <h1 className="login">Login</h1>
                        <p className="login-text">Welcome back, please put your login credentials below to start using the app</p>
                    </div>

                    <InputBox label="Email" name="email" type="text" placeholder="Enter your email" icon={<AlternateEmailIcon />} callback={handleInput} />
                    <InputBox label="Password" name="password" type="password" placeholder="Enter your password" icon={<LockOutlinedIcon />} callback={handleInput} />

                    <div className="wrapper">
                        <ButtonBox text="login" callback={postData} />
                        <p>Don't have an account? <Link to="/">Sign up!</Link></p>
                    </div>
                </form>
            </Container>
        </BgBox>
    );
}

export default Login;