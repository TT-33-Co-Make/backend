const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')

const validateRegInputs = (req, res, next) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
       res.status(400).json({ message: 'email, username, and password are required' });
    } else {
      next();
    }
}

const uniqueEmail = async (req, res, next) => {
    try {
      const regEmail = await Users.getBy({ email: req.body.email })  
      if (!regEmail.length){
        next()
      } else {
        res.status(400).json({ message: 'a user with this email already exists' })
      }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const uniqueUsername = async (req, res, next) => {
    try {
      const regUsername = await Users.getBy({ username: req.body.username }) 
      if (!regUsername.length){
        next()
      } else {
        res.status(400).json({ message: 'username is already taken' })
      }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const hashPassword = (req, res, next) => {
    try {
        const credentials = req.body
        const rounds = process.env.BCRYPT_ROUNDS || 8
        const hash = bcrypt.hashSync(credentials.password, parseInt(rounds));
        credentials.password = hash;
        next()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}


module.exports = { validateRegInputs, uniqueEmail, uniqueUsername, hashPassword }
  