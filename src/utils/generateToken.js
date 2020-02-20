const jwt = require('jsonwebtoken')

module.exports = ({ id, username }) => {
  const options = { expiresIn: '1h' }
  const payload = { id, username }
  const token = jwt.sign(payload, process.env.JWT_KEY, options)

  return token
}
