const yearControl = require ("../controllers/yearControl")
const router = require('express').Router()

router.get('/all', yearControl.getYears)
router.post('/create', yearControl.createYear)

module.exports = router