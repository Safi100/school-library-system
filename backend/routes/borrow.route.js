const express = require('express')
const { lendBook, students_books, borrowed_books } = require('../controllers/borrow.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.get('/students_and_books', isLoggedIn, students_books)
router.post('/lend-book/:book_id/:student_id', isLoggedIn, lendBook)
router.get('/borrowed-books', isLoggedIn, borrowed_books)


module.exports = router