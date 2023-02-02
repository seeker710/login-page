import React, { useEffect } from "react";
// material icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import PinDropIcon from '@mui/icons-material/PinDrop';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoutIcon from '@mui/icons-material/Logout';
// components
import { HomeBg, HomeContainer, Line } from '../styles/Box';
// react router
import { Link, useNavigate } from "react-router-dom";
import { Error } from "@mui/icons-material";

// internal style
const style1 = {
    width: '1.2em',
    height: 'auto',
    marginRight: '6px',
}
const style2 = {
    width: '1.5em',
    height: 'auto',
}
const style3 = {
    color: '#d9a7c7',
    display: 'flex',
    alignItems: 'center',
    margin: '13px 0 0 0',
    width: 'fit-content',
}

const Homepage = () => {


    const navigate = useNavigate();
    const callHomePage = async () => {
        try {
            const res = await fetch('/homepage', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            // console.log(res.status);
            if(res.status !== 200) {
                throw new Error('Invalid access');
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])

    const clearCookie = async () => {
        let clear = true;
        const res = await fetch('/homepage', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clear: clear
            })
        });
        if(res.status === 200) {
            window.alert("You successfully logged out");
        }
    }


    return(
        <HomeBg>
            <HomeContainer>
                <div>
                    <h1 className="intro">Hello, I am Sagar.</h1>
                    <p className="descript">It's nice to meet you.</p>
                </div>
                <Line />
                <section>
                    <div className="flex-box">
                        <AccountBalanceIcon style={style1} />
                        <span className="info">Shri Ramdeobaba College of Engineering and Management (2024 batch)</span>
                    </div>
                    <div className="flex-box">
                        <SchoolIcon style={style1} />
                        <span className="info">Computer Science and Engineering</span>
                    </div>
                    <div className="flex-box">
                        <PinDropIcon style={style1} />
                        <span>Nagpur, Maharashtra</span>
                    </div>
                    <div className="flex-box">
                        <IntegrationInstructionsRoundedIcon style={style1} />
                        <span className="info">C, C++, HTML, CSS, SCSS, JavaScript, Python, Dart, Java</span>
                    </div>
                </section>
                <div className="homepage-footer">
                    <a href="https://www.instagram.com/sagar_m710/" target="_blank" rel="noreferrer"><InstagramIcon style={style2} /></a>
                    <a href="https://github.com/seeker710" target="_blank" rel="noreferrer"><GitHubIcon style={style2} /></a>
                    <a href="https://www.linkedin.com/in/sagar-mandal-388a8625a/" target="_blank" rel="noreferrer"><LinkedInIcon style={style2} /></a>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end',}}>
                    <Link to="/login" style={{textDecoration: 'none'}} replace onClick={clearCookie}><div style={style3}><LogoutIcon />Logout</div></Link>
                </div>
            </HomeContainer>
        </HomeBg>
    );
}

export default Homepage;