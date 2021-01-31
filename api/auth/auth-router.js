const router = require('express').Router()

const Users = require('../users/users-model')

const { validateRegInputs, uniqueEmail, uniqueUsername, hashPassword } = require('../middleware/register-middleware')
const { loginInput, validateUser, validatePassword } = require('../middleware/login-middleware')
const createToken = require('../middleware/createToken')



router.post('/register', validateRegInputs, uniqueEmail, uniqueUsername, hashPassword, async (req, res) => {
    try {
        const newUser = await Users.add(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', loginInput, validateUser, validatePassword, (req, res) => {

    const token = createToken(req.userData)
    res.status(201).json({ message: `Hello, ${req.username}`, token })
})



module.exports = router
