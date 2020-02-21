const Joi = require('@hapi/joi')

const productSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  description: Joi.string().min(20).max(200).optional(),
  price: Joi.number().min(0).max(10000).optional()
})

const productSchemaRequired = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(20).max(200).required(),
  price: Joi.number().min(0).max(10000).required()
})

module.exports = {
  productSchema,
  productSchemaRequired
}
