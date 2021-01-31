const router = require('express').Router()
const { loginInput, validatePassword, validateUser } = require('../middleware/login-middleware')
const { hashPassword, uniqueEmail, uniqueUsername, validateRegInputs } = require('../middleware/register-middleware')
const generateToken = require('../middleware/createToken')
const Users = require('./users-model')
const bcrpyt = require("bcryptjs")
const { jwtSecret } = require('../../config/secrets')

router.get('/', (req, res) => {
    Users.get()
    .then((user) => {
        res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.post('/register', validateRegInputs, uniqueEmail, uniqueUsername, hashPassword, (req, res) => {
    Users.add(req.body)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.post('/login', validateUser, validatePassword, loginInput, (req, res) => {
    const { username, password } = req.body
    Users.getBy({ username: username })
    .then(([user]) => {
        if(user && bcrpyt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({user, message: 'successfully logged in', token: token})
        } else {
            res.status(401).json({ message: 'invalid credentials' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

module.exports = router