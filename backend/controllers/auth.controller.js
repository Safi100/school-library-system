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