const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscription_feesSchema = new Schema({
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
});

module.exports = mongoose.model('SubscriptionFees', subscription_feesSchema);
