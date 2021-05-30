const userControl = require('../controllers/userControl')
const router = require('express').Router()
const auth = require ('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userControl.register)

router.post('/activation', userControl.activateEmail)

router.post('/create', userControl.createAccount)

router.post('/login', userControl.login)

router.post('/refresh_token', userControl.getAccessToken)

router.post('/forgot', userControl.forgotPassword)

router.post('/reset',auth, userControl.resetPassword)

router.get('/infor',auth, userControl.getUserInfor)

router.get('/all_infor',auth,  authAdmin, userControl.getUsersAllInfor)

router.get('/logout', userControl.logout)

router.patch('/update',auth, userControl.updateUser)

router.patch('/update_role/:id',auth, authAdmin, userControl.updateUserRole)

router.delete('/delete/:id',auth, authAdmin, userControl.deleteUser)

router.patch('/update_subject/:id', userControl.updateSubject)

// GOOGLE

router.post('/google_login', userControl.googleLogin)

module.exports = router