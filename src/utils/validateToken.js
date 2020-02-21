const User = require('../models/User')

module.exports = async (decoded, request, h) => {
  if (!await User.findById(decoded.id)) {
    return { isValid: false }
  }

  return { isValid: true }
}
