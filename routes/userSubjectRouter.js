const userSubjectControl = require ("../controllers/userSubjectControl")
const router = require('express').Router()

router.get('/all/:year', userSubjectControl.findUserSubject)
router.get('/all/:year/:user', userSubjectControl.findUserSubject)
router.post('/create', userSubjectControl.createUserSubject)
//router.post('/create/grade', userSubjectControl.createGrade)
router.delete('/delete/:id', userSubjectControl.deleteUserSubject)
router.patch('/update', userSubjectControl.updateUserSubject)

//router.patch('/update/grade', userSubjectControl.updateGradeSubject)

module.exports = router