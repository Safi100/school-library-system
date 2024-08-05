const mongoose = require('mongoose');
const User = require('../models/user.model');
const HandleError = require('../utils/HandleError');

module.exports.profile = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user) throw new HandleError('User not found', 404);
        const {password, ...userData} = user._doc;
        res.status(200).json(userData);
    }catch(e){
        console.log(e);
        next(e);
    }
}