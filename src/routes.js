const productsHandlers = require('./handlers/productsHandlers')
const usersHandlers = require('./handlers/usersHandlers')

module.exports = [
  /** users **/
  {
    method: 'POST',
    path: '/register',
    handler: usersHandlers.register
  },
  {
    method: 'POST',
    path: '/login',
    handler: usersHandlers.login
  },
  /** products **/
  {
    method: 'GET',
    path: '/products',
    handler: productsHandlers.getAll
  },
  {
    method: 'GET',
    path: '/products/{idProduct}',
    handler: productsHandlers.getOne
  },
  {
    method: 'POST',
    path: '/products',
    handler: productsHandlers.create
  },
  {
    method: 'PATCH',
    path: '/products/{idProduct}',
    handler: productsHandlers.update
  },
  {
    method: 'DELETE',
    path: '/products/{idProduct}',
    handler: productsHandlers.delete
  }
]
