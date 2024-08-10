const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BorrowRecordSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book ID is required']
    },
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Borrower ID is required']
    },
    borrowDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema)