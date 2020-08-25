const productsHandler = require('./handlers/productsHandler')
const {
  productSchema,
  productSchemaRequired
} = require('./schemas/productSchema')

module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: productsHandler.index,
    options: {
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/products/{idProduct}',
    handler: productsHandler.show,
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/products',
    handler: productsHandler.store,
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
    handler: productsHandler.update,
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
    handler: productsHandler.destroy,
    options: {
      auth: 'jwt'
    }
  }
]
