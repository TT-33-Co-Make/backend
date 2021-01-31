const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    };
    const options = {
      expiresIn: '3h',
    };
    return jwt.sign(payload, jwtSecret, options);
}
  
