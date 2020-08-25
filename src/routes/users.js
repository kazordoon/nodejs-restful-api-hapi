const usersHandler = require('./handlers/usersHandler')
const userSchema = require('./schemas/userSchema')

module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: usersHandler.register,
    options: {
      validate: {
        payload: userSchema
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: usersHandler.login,
    options: {
      auth: false
    }

  }
]
