require('dotenv-safe').config()
const Hapi = require('@hapi/hapi')
const hapiRouter = require('hapi-router')

// Database connection
require('./config/database')(process.env.MONGODB_URL)

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT
  })

  await server.register({
    plugin: hapiRouter,
    options: {
      routes: 'src/routes.js'
    }
  })

  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
