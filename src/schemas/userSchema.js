const Joi = require('@hapi/joi')

module.exports = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(50).required()
})
