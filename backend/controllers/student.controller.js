const Student = require('../models/student.model');
const HandleError = require('../utils/HandleError');

module.exports.addStudent = async (req, res, next) => {
    try{
        const {name, phone_number, gender, email} = req.body;
        // validation
        const name_pattern = /^[A-Za-z\s]+$/u
        if (!name_pattern.test(name)) throw new HandleError(`Only characters are allowed in name.`, 400);
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailPattern.test(email)) throw new HandleError(`Invalid email address.`, 400);
        // New student
        const student = new Student({
            name: name.trim(),
            gender: gender.trim(),
            email: email.toLowerCase().trim(),
            phone_number: phone_number.trim()
        });
        await student.save();
        res.status(200).send('Student added successfully');
    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.getStudents = async (req, res, next) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);
    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.getStudentsName = async (req, res, next) => {
    try{
        const students = await Student.find().select('name');
        res.status(200).json(students);
    }catch(err){
        console.log(err);
        next(err);
        
    }
}