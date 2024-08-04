const express = require('express')
const { profile } = require('../controllers/user.controller')
const router = express.Router({mergeParams: true})

router.get('/profile/:id', profile)

module.exports = router