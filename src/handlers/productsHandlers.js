const Product = require('../models/Product')

module.exports = {
  async getAll (request, h) {
    try {
      const products = await Product.find()
      return h.response(products)
    } catch (err) {
      return h.response({ error: 'Could not list all existing products' }).code(500)
    }
  },
  async getOne (request, h) {
    try {
      const { idProduct } = request.params

      const product = await Product.findById(idProduct)

      if (!product) {
        return h.response().code(404)
      }

      return h.response(product)
    } catch (err) {
      return h.response({ error: 'Could not list this product' }).code(400)
    }
  },
  async create (request, h) {
    try {
      const productExists = await Product.findOne({ name: request.payload.name })

      if (productExists) {
        return h.response({ error: 'This product already exists' }).code(409)
      }

      const product = await Product.create(request.payload)
      return h.response(product).code(201)
    } catch (err) {
      return h.response({ error: 'Could not create a new product' }).code(406)
    }
  },
  async update (request, h) {
    try {
      const { idProduct } = request.params
      const options = { new: true }

      const productDoesNotExists = !(await Product.findById(idProduct))

      if (productDoesNotExists) {
        return h.response().code(404)
      }

      const product = await Product.findByIdAndUpdate(idProduct, request.payload, options)
      return h.response(product).code(201)
    } catch (err) {
      return h.response({ error: 'Could not update this product' }).code(406)
    }
  },
  async delete (request, h) {
    try {
      const { idProduct } = request.params

      const productDoesNotExists = !(await Product.findById(idProduct))

      if (productDoesNotExists) {
        return h.response().code(404)
      }

      await Product.findByIdAndDelete(idProduct)

      return h.response().code(204)
    } catch (err) {
      return h.response({ error: 'Could not delete this product' }).code(400)
    }
  }
}
