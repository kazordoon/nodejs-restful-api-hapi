require('dotenv-safe').config()
const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => ({
      online: true
    })
  })

  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
