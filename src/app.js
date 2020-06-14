require('dotenv-safe').config()
const hapiJwt = require('hapi-auth-jwt2')
const Hapi = require('@hapi/hapi')

require('./config/database')(process.env.MONGODB_URL)
const routes = require('./routes')
const validateToken = require('./utils/validateToken')

class App {
  constructor () {
    this.server = Hapi.server({
      host: process.env.HOST,
      port: process.env.PORT,
      routes: {
        cors: {
          origin: [process.env.CORS_ORIGIN]
        }
      }
    })
  }

  async loadSettingsAndStartServer () {
    await this.plugins()
    await this.routes()
    await this.start()
  }

  async plugins () {
    await this.server.register(hapiJwt)

    this.server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_KEY,
      validate: validateToken
    })
    this.server.auth.default('jwt')
  }

  async routes () {
    await this.server.route(routes)
  }

  async start () {
    await this.server.start()
    console.log(`Server running on ${this.server.info.uri}`)
  }
}

module.exports = App
