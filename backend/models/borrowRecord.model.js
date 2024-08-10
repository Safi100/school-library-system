const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BorrowRecordSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book ID is required']
    },
    borrower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Borrower ID is required']
    },
    borrowDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema)