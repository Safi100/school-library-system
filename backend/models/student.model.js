const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required'],
    },
    borrowed_books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    subscription_fees: [{
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionFees',
        required: true,
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);