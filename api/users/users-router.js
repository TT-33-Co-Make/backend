const router = require('express').Router()
const Users = require('./users-model')

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

router.put('/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id
    console.log(id, changes)
    Users.update(id, changes)
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The user could not be found' });
        }
    })
    .catch(err => {res.status(500).json(err)
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
        console.log(user)
        res.status(200).json({ message: `account deleted` })
    })
    .catch(err => {res.status(500).json(err)
        console.log(err)
    })
})

module.exports = router