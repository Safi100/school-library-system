const mongoose = require('mongoose');

const Shcema = mongoose.Schema;

const studentSchema = new Shcema({
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
        unique: true,
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);