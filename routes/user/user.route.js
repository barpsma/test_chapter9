const router = require('express').Router()
const { SignUp } = require('../../controllers/user.controller')

router.post('/register', SignUp)


module.exports = router