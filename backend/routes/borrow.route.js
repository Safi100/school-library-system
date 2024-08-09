const express = require('express')
const { lendBook } = require('../controllers/borrow.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.post('/lend-book/:book_id/:student_id', isLoggedIn, lendBook)


module.exports = router