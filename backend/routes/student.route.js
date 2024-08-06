const express = require('express')
const { getStudents, addStudent } = require('../controllers/student.controller')
const router = express.Router({mergeParams: true})

const {isLoggedIn} = require('../middleware')

router.get('/', isLoggedIn, getStudents)
router.post('/', isLoggedIn, addStudent)

module.exports = router