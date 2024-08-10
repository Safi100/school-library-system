const Book = require('../models/book.model');
const Student = require('../models/student.model');
const BorrowBooks = require('../models/borrowRecord.model');
const HandleError = require('../utils/handleError');

module.exports.lendBook = async (req, res, next) => {
    try{
        const { book_id, student_id } = req.params;
        // validate
        if (book_id === 'null' || book_id === null || student_id === 'null' || student_id === null) {
            throw new HandleError('Book ID and Student ID are required', 400);
        }
        const book = await Book.findById(book_id).populate('borrowed_by');
        if(!book) throw new HandleError('Book not found', 404);
        const student = await Student.findById(student_id);
        if(!student) throw new HandleError('Student not found', 404);
        if(book.borrowed_by) throw new HandleError(`Book already borrowed by student: ${book.borrowed_by.name}`, 400);
        book.borrowed_by = student._id;
        student.borrowed_books.push(book._id);
        const newBorrowRecord = new BorrowBooks({
            bookId: book._id, 
            borrower: student._id
        });
        await book.save();
        await student.save();
        await newBorrowRecord.save();
        res.status(200).send({message: "Book lent successfully", bookID: book._id});
    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports.students_books = async (req, res, next) => {
    try{
        const students = await Student.find().select('name');
        const books = await Book.find({borrowed_by: {$eq: null}}).select('title');
        res.status(200).json({students, books});
    }catch(error){
        console.log(error);
        next(error);   
    }
}

module.exports.borrowed_books = async (req, res, next) => {
    try{
        let borrowBooks = await BorrowBooks.find()
        .populate({path: 'book', populate: 'categories' })
        .populate({ path: 'borrower', select: ['name', 'email', 'phone_number'] });
        // Add warning to each book is over one week
        borrowBooks = borrowBooks.map(book => {
            const borrowDate = new Date(book.borrowDate);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - borrowDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return {
                ...book._doc,
                warning: diffDays > 7
            };
        });
        res.status(200).json(borrowBooks);
    }catch(error){
        console.log(error);
        next(error);   
    }
}