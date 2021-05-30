const subjectGradeControl = require ("../controllers/subjectGradeControl")
const router = require('express').Router()

router.post('/all', subjectGradeControl.getSubjectGrade)
router.post('/create', subjectGradeControl.createsubjectGrade)
router.patch('/update/:id', subjectGradeControl.updateGradeSubject)

module.exports = router