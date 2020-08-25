const usersRoute = require('./users')
const productsRoute = require('./products')

module.exports = [
  ...usersRoute,
  ...productsRoute
]
