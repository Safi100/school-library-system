const Book = require('../models/book.model')
const Category = require('../models/category.model');
const HandleError = require('../utils/HandleError');

module.exports.getBooksByCategory = async (req, res, next) => {
    try{
        const {category} = req.params;
        const cat = await Category.findOne({ name: category }).select('_id');
        if(!cat) throw new HandleError('Category not found', 404);
        const books = await Book.find({ categories: { $in: [cat._id] } }).populate('categories');
        res.status(200).json(books);
    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports.addBook = async (req, res, next) => {
    try{
        const { title, author, publication_year, description, language, pages, categories } = req.body;
        if(categories.length === 0) throw new HandleError('At least one category is required', 400);
        // Create a new book
        const newBook = new Book({
            title,
            author,
            publication_year,
            description,
            language,
            pages,
            categories
        });
        const savedBook = await newBook.save();
        res.status(201).send("Book added successfully");
    }catch(error){
        console.log(error);
        next(error);
    }
}