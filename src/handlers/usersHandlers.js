const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')

const User = require('../models/User')

const generateToken = require('../utils/generateToken')

module.exports = {
  async register (request, h) {
    try {
      const { username } = request.payload

      const userExists = await User.findOne({ username })

      if (userExists) {
        const errorMessage = 'This user already exists, try other username'
        return boom.conflict(errorMessage)
      }

      const user = await User.create(request.payload)

      const token = generateToken(user)

      const response = h.response({ success: true, token })
      response.header('Authorization', request.headers.authorization)

      return response.code(201)
    } catch (err) {
      const errorMessage = 'Could not create a new account'
      return boom.badRequest(errorMessage)
    }
  },
  async login (request, h) {
    const errorMessage = 'Authentication failed'
    try {
      const { username, password } = request.payload

      const user = await User.findOne({ username })

      if (!user) {
        return boom.unauthorized(errorMessage)
      }

      const incorrectPassword = !(await bcrypt.compare(password, user.password))
      if (incorrectPassword) {
        return boom.unauthorized(errorMessage)
      }

      const token = generateToken(user)

      const response = h.response({ success: true, token })
      response.header('Authorization', request.headers.authorization)

      return response
    } catch (err) {
      return boom.unauthorized(errorMessage)
    }
  }
}
