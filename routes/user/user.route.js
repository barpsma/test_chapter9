const router = require('express').Router()
const { SignUp, Verify } = require('../../controllers/user.controller')

router.post('/register', SignUp)
router.get('/verify', Verify)


module.exports = router