const Student = require('../models/student.model');

module.exports.addStudent = async (req, res, next) => {
    try{
        const {name, phone_number, gender, email} = req.body;
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