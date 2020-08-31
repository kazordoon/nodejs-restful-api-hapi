const boom = require('@hapi/boom')

const Product = require('../models/Product')
const JsonSpec = require('../utils/JsonSpec')
const getNotNullProperties = require('../utils/getNotNullProperties')
const cache = require('../redis')

module.exports = {
  async index (request, h) {
    try {
      const { page = 1, limit = 10 } = request.query

      const numericPage = Number(page)
      const numericLimit = Number(limit)

      const products = await Product.find()
        .limit(numericLimit)
        .skip((numericPage - 1) * limit)
        .exec()

      const productCount = await Product.countDocuments()
      const totalPages = Math.ceil(productCount / limit)

      const mappedProducts = products.map((product) => product._doc)

      const response = JsonSpec.convertMany('products', mappedProducts, {
        path: '/products',
        current: numericPage,
        total: totalPages
      })

      return response
    } catch (err) {
      const errorMessage = 'Could not list all existing products'
      return boom.internal(errorMessage)
    }
  },
  async show (request, h) {
    try {
      const { idProduct } = request.params

      const pagePath = `/products/${idProduct}`
      let response

      const isTheProductInCache = Boolean(
        await cache.get(`product:${idProduct}`)
      )
      if (isTheProductInCache) {
        const productInCache = JSON.parse(
          await cache.get(`product:${idProduct}`)
        )
        response = JsonSpec.convertOne('products', productInCache, pagePath)

        return response
      }

      const product = await Product.findById(idProduct)

      if (!product) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      await cache.set(`product:${idProduct}`, JSON.stringify(product._doc))

      response = JsonSpec.convertOne('products', product._doc, pagePath)

      return response
    } catch (err) {
      const errorMessage = 'Could not list this product'
      return boom.badRequest(errorMessage)
    }
  },
  async store (request, h) {
    try {
      const productExists = await Product.findOne({
        name: request.payload.name
      })

      if (productExists) {
        const errorMessage = 'This product already exists'
        return boom.conflict(errorMessage)
      }

      const product = await Product.create(request.payload)

      const pagePath = `/products/${product.id}`
      const response = JsonSpec.convertOne('products', product._doc, pagePath)

      return h.response(response).code(201)
    } catch (err) {
      console.log(err)
      const errorMessage = 'Could not create a new product'
      return boom.forbidden(errorMessage)
    }
  },
  async update (request, h) {
    try {
      const { idProduct } = request.params
      const { name = null, description = null, price = null } = request.payload

      const productDoesNotExist = !(await Product.findById(idProduct))

      if (productDoesNotExist) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      const payload = { name, description, price }
      const updatedFields = getNotNullProperties(payload)

      const product = await Product.findByIdAndUpdate(idProduct, updatedFields)
      await cache.del(`product:${idProduct}`)

      const pagePath = `/products/${product.id}`
      const response = JsonSpec.convertOne('producs', updatedFields, pagePath)

      return h.response(response)
    } catch (err) {
      console.log(err)
      const errorMessage = 'Could not update this product'
      return boom.forbidden(errorMessage)
    }
  },
  async destroy (request, h) {
    try {
      const { idProduct } = request.params

      const productDoesNotExist = !(await Product.findById(idProduct))

      if (productDoesNotExist) {
        const errorMessage = 'This product does not exists'
        return boom.notFound(errorMessage)
      }

      await Product.findByIdAndDelete(idProduct)
      await cache.del(`product:${idProduct}`)

      return h.response().code(204)
    } catch (err) {
      const errorMessage = 'Could not delete this product'
      return boom.forbidden(errorMessage)
    }
  }
}
