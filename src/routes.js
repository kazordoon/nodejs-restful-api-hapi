const productsHandlers = require('./handlers/productsHandlers')
const usersHandlers = require('./handlers/usersHandlers')

const userSchema = require('./schemas/userSchema')
const {
  productSchema,
  productSchemaRequired
} = require('./schemas/productSchema')

module.exports = [
  /** users **/
  {
    method: 'POST',
    path: '/register',
    handler: usersHandlers.register,
    options: {
      validate: {
        payload: userSchema
      }
    }
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
    handler: productsHandlers.create,
    options: {
      validate: {
        payload: productSchemaRequired
      }
    }
  },
  {
    method: 'PATCH',
    path: '/products/{idProduct}',
    handler: productsHandlers.update,
    options: {
      validate: {
        payload: productSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/products/{idProduct}',
    handler: productsHandlers.delete
  }
]
