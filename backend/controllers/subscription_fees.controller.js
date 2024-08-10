const SubscriptionFees = require('../models/subscription_fees.model');
const Student = require('../models/student.model');
const HandleError = require('../utils/handleError');

module.exports.pay_fees = async (req, res, next) => {
    try{
        const {studentId} = req.params;
        const { amount } = req.body;
        
        const student = await Student.findById(studentId).populate('subscription_fees');
        if(!student) throw new HandleError('Student not found', 404);

        const lastPayment = student.subscription_fees.length > 0
        ? student.subscription_fees[student.subscription_fees.length - 1] : null;

        if (lastPayment) {
            const lastPaymentDate = new Date(lastPayment.payment_date);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - lastPaymentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 30) {
                throw new HandleError(`Cannot pay fees until 30 days have passed since the last payment for ${student.name}`, 400);
            }
        }
        

        const NewSubscriptionFees = new SubscriptionFees({ amount, student: student._id });
        await NewSubscriptionFees.save();
        student.subscription_fees.push(NewSubscriptionFees._id);
        await student.save();
        res.status(201).send("Fees paid successfully");
    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports.get_payments_fees = async (req, res, next) => {
    try{
        const payments = await Payment.find();
        res.status(200).send(payments);
    }catch(error){
        console.log(error);
        next(error);
    }
}