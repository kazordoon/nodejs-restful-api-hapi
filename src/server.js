require('dotenv-safe').config()
const Hapi = require('@hapi/hapi')
const hapiJwt = require('hapi-auth-jwt2')

const routes = require('./routes')

const validateToken = require('./utils/validateToken')

// Database connection
require('./config/database')(process.env.MONGODB_URL)

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: [process.env.CORS_ORIGIN]
      }
    }
  })

  /** Register JWT authentication **/
  await server.register(hapiJwt)

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_KEY,
    validate: validateToken
  })

  server.auth.default('jwt')
  /** **/

  await server.route(routes)

  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

init()
