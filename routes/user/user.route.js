const router = require('express').Router()
const { SignUp, Verify } = require('../../controllers/user.controller')

router.post('/register', SignUp)
router.get('/verify/:token', Verify)


module.exports = router