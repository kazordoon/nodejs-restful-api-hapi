const App = require('./app')
const Cluster = require('./utils/Cluster')

const server = new App()
const cluster = new Cluster()

if (cluster.isMaster) {
  cluster.fork()
  cluster.logger()
} else {
  server.loadSettingsAndStartServer()
}
