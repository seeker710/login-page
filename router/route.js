const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../database/connect');

const statusCode = {
    'success': 200,
    'invalid-credentials': 401,
    'not-found': 404,
    'user-exist': 409,
    'empty-field': 422,
    'server-fail': 500
}

// signin page
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(statusCode['empty-field']).json({error: "Please fill out required feilds"});
    }
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if(!regexExp.test(email)) {
        return res.status(statusCode['invalid-credentials']).json({error: "Please enter valid email"});
    }
    try {
        const userExit = await User.findOne({email: email});
        if(userExit) {
            return res.status(statusCode['user-exist']).json({error: "User email exists"});
        }
        const hashedPassword = passwordHash.generate(password);
        const user = new User({name: name, email: email, password: hashedPassword});
        const userRegistered = await user.save();
        if(userRegistered) {
            return res.status(statusCode.success).json({message: "New user registered successfully"});
        } else {
            return res.status(statusCode['server-fail']).json({error: "Failed to register"});
        }

    } catch (error) {
        console.log(error);
    }
})

// login page
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(statusCode['empty-field']).json({error: "Please fill out required feilds"});
    }

    try {
        const userExit = await User.findOne({email: email});
        if(userExit) {
            if(passwordHash.verify(password, userExit.password)) {
                const token = await userExit.generateAuthToken();
                // console.log(token);
                res.cookie('rememberme', token, {
                    expires: new Date(Date.now() + 604800000),
                    httpOnly: true,
                });
                // console.log(req.cookies.rememberme);
                return res.status(statusCode.success).json({message: "User login successfully"});
            } else {
                return res.status(statusCode['invalid-credentials']).json({error: "Invalid credentials"})
            }
        } else {
            return res.status(statusCode['not-found']).json({error: "No such user exists"});
        }
    } catch (error) {
        console.log(error);
    }
})

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.rememberme;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = User.findOne({_id: verifyToken._id, "tokens.token": token})
        if(!user)
            throw new Error("Invalid token");
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized access");
    }
}

router.get('/homepage', authenticate, (req, res) => {
    // console.log("Inside homepage");
    res.sendStatus(statusCode.success);
})

router.post('/homepage', (req, res) => {
    // console.log(req.body);
    const { clear } = req.body;
    if(clear) {
        res.clearCookie('rememberme', {path: '/'});
        res.status(statusCode.success).json({message: "Cookies cleared"});
    }
    else {
        res.status(statusCode['not-found']).json({error: "Cookie not cleared"});
    }
})

module.exports = router;