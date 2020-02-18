const bcrypt = require('bcrypt')

const User = require('../models/User')

module.exports = {
  async register (request, h) {
    try {
      const { username } = request.payload

      const userExists = await User.findOne({ username })

      if (userExists) {
        return h.response({ error: 'This user already exists, try other username' }).code(409)
      }

      await User.create(request.payload)

      return h.response({ success: true }).code(201)
    } catch (err) {
      return h.response({ error: 'Could not create a new account' }).code(400)
    }
  },
  async login (request, h) {
    try {
      const { username, password } = request.payload

      const user = await User.findOne({ username })

      if (!user) {
        return h.response({ error: 'Authentication failed' }).code(401)
      }

      if (!await bcrypt.compare(password, user.password)) {
        return h.response({ error: 'Authentication failed' }).code(401)
      }

      return h.response({ success: true })
    } catch (err) {
      return h.response({ error: 'Authentication failed' }).code(401)
    }
  }
}
