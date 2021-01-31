const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

const parseToken = (authHeader) => {
    if (authHeader.includes('Bearer')){
      return authHeader.split(' ')[1]
    }
    return authHeader
}

module.exports = (req, res, next) => {
  const token = parseToken(req.headers.authorization)
//   console.log('should be token ', auth.headers.authorization)
  if (!token) {
    res.status(401).json('token required')
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('token invalid')
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  }
}
