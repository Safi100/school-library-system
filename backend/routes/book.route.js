const express = require('express')
const { getBooksByCategory, addBook } = require('../controllers/book.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.post('/add-book', isLoggedIn, addBook)
router.get('/:category', isLoggedIn, getBooksByCategory)

module.exports = router