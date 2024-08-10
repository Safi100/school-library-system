const express = require('express')
const { lendBook, students_books } = require('../controllers/borrow.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.get('/students_and_books', isLoggedIn, students_books)
router.post('/lend-book/:book_id/:student_id', isLoggedIn, lendBook)


module.exports = router