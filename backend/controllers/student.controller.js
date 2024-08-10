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
        let students = await Student.find().populate({path: 'subscription_fees', select: ['amount', 'payment_date'] });
        students = students.map(student => {
            const lastPaidDate = new Date(student.subscription_fees[student.subscription_fees.length - 1]?.payment_date);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - lastPaidDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const delayDays = diffDays > 30 ? diffDays - 30 : null;
            return {
                ...student._doc,
                warning: diffDays > 30,
                delay_days: delayDays
            };
        })
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