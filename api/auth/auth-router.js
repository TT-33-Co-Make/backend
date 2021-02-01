const router = require('express').Router()

const Users = require('../users/users-model')

const { validateRegInputs, uniqueEmail, uniqueUsername, hashPassword } = require('../middleware/register-middleware')
const { loginInput, validateUser, validatePassword } = require('../middleware/login-middleware')
const createToken = require('../middleware/createToken')

router.get('/', (req, res) => {
    Users.get()
    .then((user) => {
        res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.post('/login', loginInput, validateUser, validatePassword, (req, res) => {

    const token = createToken(req.userData)
    res.status(201).json({ message: `Hello, ${req.userData.username}`, token })
})

router.post('/register', validateRegInputs, uniqueEmail, uniqueUsername, hashPassword, (req, res) => {
    Users.add(req.body)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(err => res.status(500).json({ message: err }))
})

module.exports = router
