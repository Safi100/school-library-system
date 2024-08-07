const Category = require('../models/category.model')

// Helper function to capitalize a string
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

module.exports.newCategory = async (req, res, next) => {
    try{
        const categoryName = req.body.categoryName.trim();
        const category = new Category({
            name: capitalize(categoryName)
        });
        await category.save();
        res.status(201).json(category);
    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports.getCategories = async (req, res, next) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(err){
        console.log(err);
        next(err);
    }
}