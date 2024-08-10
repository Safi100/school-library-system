const express = require('express')
const { pay_fees } = require('../controllers/subscription_fees.controller')
const router = express.Router({mergeParams: true})

const {isLoggedIn} = require('../middleware')

router.post('/pay/:studentId', isLoggedIn, pay_fees)

module.exports = router