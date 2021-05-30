const subjectControl = require ("../controllers/subjectControl")
const router = require('express').Router()

router.get('/all', subjectControl.getSubjects)
router.post('/create', subjectControl.createSubject)

module.exports = router