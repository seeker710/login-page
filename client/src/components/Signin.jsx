import React, { useState } from "react";
// material icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// components
import { BgBox, Container } from "../styles/Box";
import InputBox from "./InputBox";
import ButtonBox from "./ButtonBox";
// react router
import { Link, useNavigate } from "react-router-dom";

const style1 = {
    marginBottom: '1em',
}
const style2 = {
    margin: '5px',
}
const style3 = {
    marginTop: '2em',
}


const Signin = () => {

    const navigate = useNavigate();
    const [userSignin, setUserSignin] = useState(
        {name: "", email: "", password: ""}
    )
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log(`${name} ${value}`);
        setUserSignin({...userSignin, [name]: value});
    }


    const postData = async (e) => {
        e.preventDefault();
        const {name, email, password} = userSignin;
        const res = await fetch('/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name, email: email, password: password
            })
        });

        switch(res.status) {
            case 200:
                window.alert("You successfully signed up");
                navigate('/login');
                break;
            case 401:
                window.alert("Enter valid email");
                break;
            case 409:
                window.alert("User already exists");
                navigate('/login')
                break;
            case 422:
                window.alert("Please fill empty fields");
                break;
            case 500:
                window.alert("Server failed");
                break;
            default:
                window.alert("Some unknown error occured");
                break;
        }
    }
    

    return (
        <BgBox>
            <Container style={{padding: '1.5em'}}>
                <form method="post">
                    <div className="head" style={style1}>
                        <h1 className="login" style={style2}>Create an account</h1>
                        <p className="login-text" style={style2}>Let's create a new account for free!</p>
                    </div>

                    <InputBox label="Name" name="name" type="text" placeholder="Enter your name" icon={<PersonOutlineOutlinedIcon />} callback={handleInput} />
                    <InputBox label="Email" name="email" type="text" placeholder="Enter your email" icon={<AlternateEmailIcon />} callback={handleInput} />
                    <InputBox label="Password" name="password" type="password" placeholder="Enter your password" icon={<LockOutlinedIcon />} callback={handleInput} />

                    <div className="wrapper" style={style3}>
                        <ButtonBox text="Create account" callback={postData} />
                        <p>Already have an account? <Link to="/login">Sign in!</Link></p>
                    </div>
                </form>
            </Container>
        </BgBox>
    );
}

export default Signin;