const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const HandleError = require('../utils/HandleError');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../utils/SendEmail');
module.exports.login = async (req, res, next) => {
    try{
        const email = req.body.email.toLowerCase().trim();
        const Password = req.body.password.trim();
        // validation
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailPattern.test(email)) throw new HandleError(`Invalid email address.`, 400);
        if(Password.length < 6) throw new HandleError(`Password must be at least 6 characters.`, 400);
        // Check user
        const user = await User.findOne({email});
        if(!user) throw new HandleError('Email/password is wrong', 404);
        const match = await bcrypt.compare(Password, user.password);
        if(!match) throw new HandleError('Email/password is wrong', 404);
        // login successful
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...userData } = user.toObject();
        // Create and set cookies
        res.cookie('c_user', user._id.toString());
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(userData);
    }catch(e){
        console.log(e);
        next(e);
    }
}
module.exports.register = async (req, res, next) => {
    try{
        const name = req.body.name.trim();
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password.trim();   
        const confirmPassword = req.body.confirmPassword.trim();   
        // validation
        const name_pattern = /^[A-Za-z\s]+$/u
        if (!name_pattern.test(name)) throw new HandleError(`Only characters are allowed in name.`, 400);
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailPattern.test(email)) throw new HandleError(`Invalid email address.`, 400);
        if(password.length < 6 || confirmPassword.length < 6) throw new HandleError(`Password must be at least 6 characters.`, 400);
        if(password != confirmPassword) throw new HandleError(`Password and confirm password don't match.`);
        // check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser) throw new HandleError('Email already exists.', 409);
        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPass
        })
        await user.save();
        // todo : send email to verify email
        // sendEmail(user.email, 'Verify your email', `
        //     <h1>Verify your email</h1>
        //     <p>Click the following link to verify your email:</p>
        //     <a href="http://localhost:3000/verify/${user._id}">Verify Email</a>
        // `)
        res.json(user);
    }catch(e){
        console.log(e);
        next(e);
    }
}