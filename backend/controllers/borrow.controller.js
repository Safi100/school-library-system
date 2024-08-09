const Book = require('../models/book.model');
const Student = require('../models/student.model');
const HandleError = require('../utils/handleError');

module.exports.lendBook = async (req, res, next) => {
    try{
        const { book_id, student_id } = req.params;
        const book = await Book.findById(book_id).populate('borrowed_by');
        if(!book) throw new HandleError('Book not found', 404);
        const student = await Student.findById(student_id);
        if(!student) throw new HandleError('Student not found', 404);
        if(book.borrowed_by) throw new HandleError(`Book already borrowed by student: ${book.borrowed_by.name}`, 400);
        book.borrowed_by = student._id;
        student.borrowed_books.push(book._id);
        await book.save();
        await student.save();
        res.status(200).send("Book lent successfully");
    }catch(error){
        console.log(error);
        next(error);
    }
}