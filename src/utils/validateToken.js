const User = require('../models/User')

module.exports = async (decoded, request, h) => {
  const userNotFound = !(await User.findById(decoded.id))
  if (userNotFound) {
    return { isValid: false }
  }

  return { isValid: true }
}
