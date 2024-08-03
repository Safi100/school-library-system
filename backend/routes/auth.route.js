const express = require('express')
const { login } = require('../controllers/auth.controller')
const router = express.Router({mergeParams: true})

router.post('/login', login)

module.exports = router