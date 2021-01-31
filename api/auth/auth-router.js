const router = require('express').Router();

const { validateRegInputs, uniqueEmail, uniqueUsername, hashPassword } = require('../middleware/register-middleware')
const createToken = require('../middleware/createToken');

router.post('/register', validateRegInputs, uniqueEmail, uniqueUsername, hashPassword, async (req, res) => {
    try {
        const newUser = await Users.add(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', (req, res) => {

  const { username, password } = req.body;

  if (validUser(req.body)) {
    Users.findBy({ username: username })
    .then(data => {
      if(!data.length){
        return res.status(401).json({ message: 'invalid credentials'})
      }
      const [user] = data
      if ([user] && bcrypt.compareSync(password, user.password)){
        const token = createToken(user)
        res.status(200).json({ message: `welcome, ${user.username}`, token})
      } else {
        res.status(401).json({ message: 'invalid credentials '})
      }
    }) .catch(err => {
      res.status(500).json({ message: 'error' })
    })
  } else {
    res.status(400).json({ message: 'username and password required'})
  }
});



module.exports = router;
