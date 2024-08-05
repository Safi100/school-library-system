const Category = require('../models/category.model')


module.exports.newCategory = async (req, res, next) => {
    try{
        const categoryName = req.body.categoryName.trim();
        const category = new Category({
            name: categoryName
        });
        await category.save();
        res.status(201).json(category);
    }catch(err){
        console.log(err);
        next(err);
    }
}