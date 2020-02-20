const boom = require('@hapi/boom')

const Product = require('../models/Product')

module.exports = {
  async getAll (request, h) {
    try {
      const products = await Product.find()
      return h.response(products)
    } catch (err) {
      const errorMessage = 'Could not list all existing products'
      return boom.internal(errorMessage)
    }
  },
  async getOne (request, h) {
    const errorMessage = 'This product does not exists'
    try {
      const { idProduct } = request.params

      const product = await Product.findById(idProduct)

      if (!product) {
        return boom.notFound(errorMessage)
      }

      return h.response(product)
    } catch (err) {
      return boom.notFound(errorMessage)
    }
  },
  async create (request, h) {
    try {
      const productExists = await Product.findOne({ name: request.payload.name })

      if (productExists) {
        const errorMessage = 'This product already exists'
        return boom.conflict(errorMessage)
      }

      const product = await Product.create(request.payload)
      return h.response(product).code(201)
    } catch (err) {
      const errorMessage = 'Could not create a new product'
      return boom.notAcceptable(errorMessage)
    }
  },
  async update (request, h) {
    try {
      const { idProduct } = request.params
      const options = { new: true }

      const productDoesNotExists = !(await Product.findById(idProduct))

      if (productDoesNotExists) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      const product = await Product.findByIdAndUpdate(idProduct, request.payload, options)
      return h.response(product).code(201)
    } catch (err) {
      const errorMessage = 'Could not update this product'
      return boom.notAcceptable(errorMessage)
    }
  },
  async delete (request, h) {
    try {
      const { idProduct } = request.params

      const productDoesNotExists = !(await Product.findById(idProduct))

      if (productDoesNotExists) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      await Product.findByIdAndDelete(idProduct)

      return h.response().code(204)
    } catch (err) {
      const errorMessage = 'Could not delete this product'
      return boom.notAcceptable(errorMessage)
    }
  }
}
