const express = require('express')
const { profile } = require('../controllers/user.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')
router.get('/profile', isLoggedIn, profile)

module.exports = router