module.exports = (product) => {
  const { _id, name, description, price } = product
  const response = {
    type: 'products',
    _id,
    attributes: {
      name,
      description,
      price
    },
    links: {
      self: `/products/${_id}`
    }
  }

  return response
}
