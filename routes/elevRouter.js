const elevControl = require ("../controllers/elevControl")
const router = require('express').Router()

router.post('/elev', elevControl.getElevInfo)

module.exports = router