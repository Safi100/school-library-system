const express = require('express')
const { newCategory, getCategories } = require('../controllers/category.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.get('/', isLoggedIn, getCategories)
router.post('/add-category', isLoggedIn, newCategory)
module.exports = router