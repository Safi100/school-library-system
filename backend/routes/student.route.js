const express = require('express')
const { getStudents, addStudent, getStudentsName } = require('../controllers/student.controller')
const router = express.Router({mergeParams: true})

const {isLoggedIn} = require('../middleware')

router.get('/', isLoggedIn, getStudents)
router.post('/', isLoggedIn, addStudent)
router.get('/name', isLoggedIn, getStudentsName)

module.exports = router