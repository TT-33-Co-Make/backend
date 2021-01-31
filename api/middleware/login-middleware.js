const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')

const loginInput = (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    if((!!username && !!email) || (!username && !email)) {
      res.status(401).json({ message: 'username or email required for login' })
    } else if (!req.body.password) {
      res.status(401).json({ message: 'password required for login' })
    } else {
      next()
    }
}

const validateUser = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    try {
      const data = await Users.getBy(email ? { email } : { username })
      if (!data.length) {
        res.status(401).json({ message: 'invalid user credentials' })
      } else {
        req.userData = data[0]
        next()
      }
    } catch (err) {
      res.status(500).json({ message:err.message })
    }
}

const validatePassword = (req, res, next) => {
    try {    
      const validate = bcrypt.compareSync(req.body.password, req.userData.password)
      if (validate) {
        next()
      } else {
        res.status(401).json({ message: 'invalid password' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}


  
module.exports = { loginInput, validateUser, validatePassword }
  