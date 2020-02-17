module.exports = [
  /** users **/
  {
    method: 'POST',
    path: '/register',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  /** products **/
  {
    method: 'GET',
    path: '/products',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  {
    method: 'GET',
    path: '/products/{idProduct}',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  {
    method: 'POST',
    path: '/products',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  {
    method: 'PATCH',
    path: '/products/{idProduct}',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  },
  {
    method: 'DELETE',
    path: '/products/{idProduct}',
    handler: (request, h) => {
      const { path, method } = request
      return { path, method }
    }
  }
]
