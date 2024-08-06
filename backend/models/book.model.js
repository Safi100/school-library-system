const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book title is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    publication_year: {
        type: Number,
        required: [true, 'Publication year is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    pages : {
        type: Number,
        required: [true, 'Number of pages is required'],
        min: [1, 'Number of pages must be at least 1']
    },
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
    }],
}, { timestamps: true })

module.exports = mongoose.model('Book', bookSchema)