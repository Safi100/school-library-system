const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Payment amount is required'],
    },
    payment_date: {
        type: Date,
        default: new Date()
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
