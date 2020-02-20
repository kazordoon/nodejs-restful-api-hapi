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
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: usersHandlers.login,
    options: {
      auth: false
    }

  },
  /** products **/
  {
    method: 'GET',
    path: '/products',
    handler: productsHandlers.getAll,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/products/{idProduct}',
    handler: productsHandlers.getOne,
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/products',
    handler: productsHandlers.create,
    options: {
      validate: {
        payload: productSchemaRequired
      },
      auth: 'jwt'
    }
  },
  {
    method: 'PATCH',
    path: '/products/{idProduct}',
    handler: productsHandlers.update,
    options: {
      validate: {
        payload: productSchema
      },
      auth: 'jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/products/{idProduct}',
    handler: productsHandlers.delete,
    options: {
      auth: 'jwt'
    }
  }
]
