const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user.model');
const HandleError = require('../utils/HandleError');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../utils/SendEmail');
const EmailToken = require('../models/emailToken.model');

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
        // send email to verify email
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(verifyToken, 10)
        await new EmailToken({
            userId: user._id,
            token: hashedToken,
        }).save();
        const url = `${process.env.BASE_URL}/verify-email/${user.id}/${verifyToken}`;
        await sendEmail(user.email, "Verify Your Email Address", `
            <p>Dear User,</p>
            <p>Thank you for registering. To complete your registration and activate your account, please verify your email address by clicking the link below:</p>
            <p><a href="${url}">Verify Your Email</a></p>
            <p><i>Note: This link will expire in 1 hour.</i></p>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:gamingplatform2002@gmail.com">gamingplatform2002@gmail.com</a>.</p>
            <p>Best regards,<br>Library Team</p>
        `);
        res.send({message: 'Registration successful. Please check your email for verification, check spam folder also.' });
    }catch(e){
        console.log(e);
        next(e);
    }
}
module.exports.sendVerificationEmail = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user) throw new HandleError('User not found.', 404);
        if(user.isVerified) throw new HandleError('Email already verified.', 400);
        // send email to verify email
        let token = await EmailToken.findOne({ userId: user._id });
        // generate new token 
        if(token) await EmailToken.deleteMany({ userId: user._id});
        
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(verifyToken, 10)
        await new EmailToken({
            userId: user._id,
            token: hashedToken,
        }).save();
        const url = `${process.env.BASE_URL}/verify-email/${user.id}/${verifyToken}`;
        await sendEmail(user.email, "Verify Your Email Address", `
            <p>Dear User,</p>
            <p>Thank you for registering. To complete your registration and activate your account, please verify your email address by clicking the link below:</p>
            <p><a href="${url}">Verify Your Email</a></p>
            <p><i>Note: This link will expire in 1 hour.</i></p>
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:gamingplatform2002@gmail.com">gamingplatform2002@gmail.com</a>.</p>
            <p>Best regards,<br>Library Team</p>
        `);
        res.send({message: 'Verification email sent successfully.' });
    }catch(e){
        console.log(e);
        next(e);
    }
}
module.exports.verifyEmail = async (req, res, next) => {
    try {
        const { id, token } = req.params;
        console.log(req.params);
        
        if(!mongoose.Types.ObjectId.isValid(id)) throw new HandleError(`Invalid link`, 400);
        // handle error if user already verified and token is not valid
        const user = await User.findById(id);
        if (!user || user.isVerified) throw new HandleError(user ? `Email already verified` : `Invalid link`, 400);
        const EmailVerifyToken = await EmailToken.findOne({ userId: id });
        if (!EmailVerifyToken) throw new HandleError(`Invalid link`, 400);
        const match = await bcrypt.compare(token, EmailVerifyToken.token);
        if(!match) throw new HandleError(`Invalid link`, 400);
        // set user to verified
        await User.updateOne({ _id: user._id }, { isVerified: true });
        // delete email verification token after use it
        await EmailToken.deleteOne({ userId: id });
        res.status(200).send({ message: 'Email verified successfully.' });
    } catch (e) {
        next(e);
    }
};
module.exports.Logout = async (req, res, next) => {
    try{
        await res.clearCookie('access_token');
        await res.clearCookie('c_user');
        res.status(200).send({success: true})
    }catch (e) {
        next(e);
    }
}