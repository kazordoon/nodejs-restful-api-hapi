const boom = require('@hapi/boom')

const Product = require('../models/Product')
const convertToJsonSpec = require('../utils/convertToJsonSpec')
const cache = require('../redis')

module.exports = {
  async getAll (request, h) {
    try {
      const products = await Product.find()

      const data = products.map(convertToJsonSpec)
      const response = {
        data
      }

      return response
    } catch (err) {
      const errorMessage = 'Could not list all existing products'
      return boom.internal(errorMessage)
    }
  },
  async getOne (request, h) {
    try {
      const { idProduct } = request.params

      let data
      let response

      const isTheProductInCache = Boolean(
        await cache.get(`product:${idProduct}`)
      )
      if (isTheProductInCache) {
        const productInCache = await cache.get(`product:${idProduct}`)
        data = convertToJsonSpec(productInCache)
        response = {
          data
        }

        return response
      }

      const product = await Product.findById(idProduct)

      if (!product) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      await cache.set(`product:${idProduct}`, product)

      data = convertToJsonSpec(product)
      response = {
        data
      }

      return response
    } catch (err) {
      const errorMessage = 'Could not list this product'
      return boom.badRequest(errorMessage)
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

      const data = convertToJsonSpec(product)
      const response = {
        data
      }

      return h.response(response).code(201)
    } catch (err) {
      const errorMessage = 'Could not create a new product'
      return boom.forbidden(errorMessage)
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

      const data = convertToJsonSpec(product)
      const response = {
        data
      }

      return h.response(response)
    } catch (err) {
      const errorMessage = 'Could not update this product'
      return boom.forbidden(errorMessage)
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
      return boom.forbidden(errorMessage)
    }
  }
}
