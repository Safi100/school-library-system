const express = require('express')
const { newCategory } = require('../controllers/category.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.post('/add-category', isLoggedIn, newCategory)

module.exports = router