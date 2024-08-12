const express = require('express')
const { login, register, sendVerificationEmail, Logout, verifyEmail } = require('../controllers/auth.controller')
const router = express.Router({mergeParams: true})
const {isLoggedIn} = require('../middleware')

router.post('/login', login)
router.post('/register', register)
router.post('/send-verification-email', isLoggedIn, sendVerificationEmail)
router.post('/logout', Logout)
router.post('/verify-email/:id/:token', verifyEmail)

module.exports = router